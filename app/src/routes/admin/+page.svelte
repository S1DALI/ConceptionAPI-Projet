<script lang="ts">
	export let data;
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-7xl">
		<header class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Panneau d'administration</h1>
			<p class="mt-2 text-gray-600">Bienvenue, {data.user.firstname} !</p>
		</header>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<!-- Card: Gestion des utilisateurs -->
			<div class="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900">Utilisateurs</h3>
				<p class="mt-2 text-sm text-gray-500">Gérer les comptes utilisateurs, rôles et accès.</p>
				<a
					href="/admin/users"
					class="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
				>
					Gérer &rarr;
				</a>
			</div>

			<!-- Card: Gestion des diplômes -->
			<div class="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900">Diplômes</h3>
				<p class="mt-2 text-sm text-gray-500">Ajouter ou modifier les diplômes et cursus.</p>
				<a
					href="/admin/degrees"
					class="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
				>
					Gérer &rarr;
				</a>
			</div>
		</div>
	</div>
</div>
