import { redirect } from '@sveltejs/kit';
import { OAuth2Client, type Credentials } from 'google-auth-library';
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';

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
	console.log('response', response);

	if (!response.ok) {
		throw new Error(`Failed to fetch user data: ${response.statusText}`);
	}

	const data: UserData = await response.json();
	console.log('data', data);
	return data;
}

export const GET = async ({ url }: { url: URL }) => {
	const redirectURL: string = 'http://localhost:5173/v1/users/oauth';
	const code: string | null = url.searchParams.get('code');

	console.log('returned code', code);

	if (!code) {
		throw redirect(303, '/error?message=No authorization code provided');
	}

	try {
		const oAuth2Client: OAuth2Client = new OAuth2Client(
			SECRET_CLIENT_ID,
			SECRET_CLIENT_SECRET,
			redirectURL
		);

		const { tokens } = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(tokens);
		console.info('Tokens acquired.');

		const userCredentials: Credentials = oAuth2Client.credentials;
		console.log('credentials', userCredentials);

		const userData: UserData = await getUserData(userCredentials.access_token!);

		// TODO : Connect to DB

	} catch (err) {
		console.error('Error logging in with OAuth2 user', err);
		throw redirect(303, '/error?message=Authentication failed');
	}

	throw redirect(303, '/');
};
