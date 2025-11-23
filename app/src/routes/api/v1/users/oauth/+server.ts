import { redirect } from '@sveltejs/kit';
import { OAuth2Client, type Credentials } from 'google-auth-library';
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';
import { createOrUpdateUserFromGoogle } from '$lib/db';

interface UserData {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
  locale?: string;
  [key: string]: unknown;
}

async function getUserData(access_token: string): Promise<UserData> {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.statusText}`);
  }
  
  const data: UserData = await response.json();
  return data;
}

export const GET = async ({ url, cookies }: { url: URL; cookies: any }) => {
  const redirectURL = 'http://localhost:5173/api/v1/users/oauth';
  const code = url.searchParams.get('code');
  
  if (!code) {
    throw redirect(303, '/');
  }
  
  try {
    const oAuth2Client = new OAuth2Client(
      SECRET_CLIENT_ID,
      SECRET_CLIENT_SECRET,
      redirectURL
    );
    
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    console.info('Tokens acquired.');
    
    const userCredentials: Credentials = oAuth2Client.credentials;
    const userData: UserData = await getUserData(userCredentials.access_token!);
    
    console.log('User data:', userData);
    
    if (!userData.email) {
      throw new Error('Email not provided by Google');
    }
    
    const user = createOrUpdateUserFromGoogle({
      email: userData.email!,
      firstName: userData.given_name || userData.name || 'User',
      lastName: userData.family_name || '',
      googleId: userData.sub
    });
    
    console.log('User saved/updated:', user);
    
    // Stocker le token en cookie
    cookies.set('authToken', tokens.id_token || tokens.access_token, {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });
    
    console.log('Token stored in cookie');
    
    throw redirect(303, '/dashboard');
    
  } catch (err: any) {

	if (err?.status && err?.location) {
		throw err;
	}
		
	console.error("OAuth failed", err);
	throw redirect(303, "/");
  }

};