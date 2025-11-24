import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';
import type { Actions } from './$types';

export const actions: Actions = {
  OAuth2: async () => {
    const redirectURL = 'http://localhost:5173/api/v1/users/oauth';

    const oAuth2Client = new OAuth2Client(
      SECRET_CLIENT_ID,
      SECRET_CLIENT_SECRET,
      redirectURL
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'select_account',
			include_granted_scopes: false,

			scope: [
        'openid',
        'email',
        'profile',
      ],
    });

    throw redirect(302, authorizeUrl);
  }
};
