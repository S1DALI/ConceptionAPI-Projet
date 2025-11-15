// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface Degree {
			id: number;
			name: string;
		}

		interface Course {
			id: number;
			name: string;
			degreeId: number;
		}

		interface Class {
			id: number;
			name: string;
			link: string;
			courseId: number;
		}

		interface User {
			id: number;
			firstname: string;
			lastname: string;
			email: string;
			degreeId: number;
			role: 0 | 1 | 2 | 3;
		}
	}
}

export { };
