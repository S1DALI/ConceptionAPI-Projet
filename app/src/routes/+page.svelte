<script>
	import { mockUsers, mockDegrees, mockCourses, mockClasses } from '$lib/mockData';
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
	<div class="mx-auto max-w-6xl px-6 py-12">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="mb-4 text-5xl font-bold text-gray-900">MyClasses</h1>
			<p class="text-xl text-gray-600">Votre plateforme centralisée de gestion de cours</p>
		</div>

		<!-- Stats Grid -->
		<div class="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl font-bold text-indigo-600">{mockUsers.length}</div>
				<p class="text-gray-600">Utilisateurs actifs</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl font-bold text-blue-600">{mockDegrees.length}</div>
				<p class="text-gray-600">Diplômes</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl font-bold text-green-600">{mockCourses.length}</div>
				<p class="text-gray-600">Cours disponibles</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl font-bold text-purple-600">{mockClasses.length}</div>
				<p class="text-gray-600">Séances de classe</p>
			</div>
		</div>

		<!-- Quick Links -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			<!-- Users Card -->
			<a
				href="/users"
				class="rounded-lg bg-white p-8 shadow-lg transition hover:shadow-xl hover:scale-105"
			>
				<div class="mb-4 text-4xl">👥</div>
				<h2 class="mb-2 text-2xl font-bold text-gray-900">Utilisateurs</h2>
				<p class="mb-4 text-gray-600">Gérez et consultez tous les utilisateurs du système</p>
				<span class="inline-block rounded bg-indigo-600 px-4 py-2 text-white"
					>Voir la liste →</span
				>
			</a>

			<!-- Degrees Card -->
			<a
				href="/degrees"
				class="rounded-lg bg-white p-8 shadow-lg transition hover:shadow-xl hover:scale-105"
			>
				<div class="mb-4 text-4xl">🎓</div>
				<h2 class="mb-2 text-2xl font-bold text-gray-900">Diplômes</h2>
				<p class="mb-4 text-gray-600">Consultez les diplômes et parcours disponibles</p>
				<span class="inline-block rounded bg-blue-600 px-4 py-2 text-white">Voir la liste →</span>
			</a>

			<!-- Courses Card -->
			<a
				href="/courses"
				class="rounded-lg bg-white p-8 shadow-lg transition hover:shadow-xl hover:scale-105"
			>
				<div class="mb-4 text-4xl">📚</div>
				<h2 class="mb-2 text-2xl font-bold text-gray-900">Cours</h2>
				<p class="mb-4 text-gray-600">Explorez l'ensemble des cours et modules disponibles</p>
				<span class="inline-block rounded bg-green-600 px-4 py-2 text-white">Voir la liste →</span>
			</a>

			<!-- Classes Card -->
			<a
				href="/classes"
				class="rounded-lg bg-white p-8 shadow-lg transition hover:shadow-xl hover:scale-105"
			>
				<div class="mb-4 text-4xl">🏫</div>
				<h2 class="mb-2 text-2xl font-bold text-gray-900">Séances</h2>
				<p class="mb-4 text-gray-600">Retrouvez les séances de classe et ressources</p>
				<span class="inline-block rounded bg-purple-600 px-4 py-2 text-white">Voir la liste →</span>
			</a>
		</div>

		<!-- API Status -->
		<div class="mt-12 rounded-lg bg-white p-8 shadow-md">
			<h3 class="mb-4 text-xl font-bold text-gray-900">État de l'API</h3>
			<div class="flex items-center gap-3">
				<span class="inline-block h-4 w-4 rounded-full bg-green-500"></span>
				<span class="text-gray-600">
					Données fictives activées (API en développement)
				</span>
			</div>
		</div>
	</div>
</div>


