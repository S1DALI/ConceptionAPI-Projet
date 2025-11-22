import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';

export const actions: import('@sveltejs/kit').Actions = {
	OAuth2: async ({}: import('@sveltejs/kit').RequestEvent) => {
		const redirectURL: string = 'http://localhost:5173/v1/users/oauth';

		console.log('id', SECRET_CLIENT_ID);

		const oAuth2Client: OAuth2Client = new OAuth2Client(
			SECRET_CLIENT_ID,
			SECRET_CLIENT_SECRET,
			redirectURL
		);

		const authorizeUrl: string = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
			prompt: 'consent'
		});

		throw redirect(302, authorizeUrl);
	}
};
