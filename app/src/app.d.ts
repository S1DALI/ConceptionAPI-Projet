// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user?: {
				id: number;
				firstname: string;
				lastname: string;
				email: string;
				degreeId: number | null;
				role: number;
				googleId: string;
			};
		}
	}
}

export { };
