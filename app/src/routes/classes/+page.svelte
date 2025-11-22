<script>
	import { mockClasses, mockCourses } from '$lib/mockData';

	let classes = $state(mockClasses);
	let expandedClass = $state(null);

	function getCourseName(courseId) {
		const course = mockCourses.find(c => c.id === courseId);
		return course ? course.name : 'Cours inconnu';
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-gray-900">Séances de Classe</h1>
			<p class="mt-2 text-gray-600">Consultez les séances de classe et les ressources associées</p>
		</div>

		<!-- Classes List -->
		<div class="space-y-4">
			{#each classes as classItem (classItem.id)}
				<div
					class="rounded-lg bg-white shadow-md overflow-hidden hover:shadow-lg transition"
				>
					<!-- Class Header -->
					<button
						on:click={() =>
							(expandedClass =
								expandedClass === classItem.id ? null : classItem.id)}
						class="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition"
					>
						<div class="flex items-center gap-4">
							<span class="text-2xl">🏫</span>
							<div class="text-left">
								<h2 class="text-xl font-bold">{classItem.name}</h2>
								<p class="text-sm text-purple-100">
									{getCourseName(classItem.courseId)}
								</p>
							</div>
						</div>
						<span class="text-2xl">
							{expandedClass === classItem.id ? '▼' : '▶'}
						</span>
					</button>

					<!-- Expanded Content -->
					{#if expandedClass === classItem.id}
						<div class="px-6 py-6 bg-gray-50 space-y-4">
							<!-- Class Information -->
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<p class="text-sm font-semibold text-gray-600">ID de la séance</p>
									<p class="text-gray-900">{classItem.id}</p>
								</div>
								<div>
									<p class="text-sm font-semibold text-gray-600">Cours associé</p>
									<p class="text-gray-900">{getCourseName(classItem.courseId)}</p>
								</div>
								<div>
									<p class="text-sm font-semibold text-gray-600">Type de séance</p>
									<p class="text-gray-900">Cours magistral / TD</p>
								</div>
								<div>
									<p class="text-sm font-semibold text-gray-600">Capacité</p>
									<p class="text-gray-900">120 étudiants</p>
								</div>
							</div>

							<!-- Link Section -->
							<div class="rounded-lg bg-white p-4 border border-gray-200">
								<p class="text-sm font-semibold text-gray-600 mb-2">Ressources et lien</p>
								<a
									href={classItem.link}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition"
								>
									<span>🔗</span>
									<span>Accéder à la ressource</span>
								</a>
							</div>

							<!-- Additional Info -->
							<div class="rounded-lg bg-blue-50 p-4 border border-blue-200">
								<h4 class="font-semibold text-blue-900 mb-2">Informations supplémentaires</h4>
								<ul class="space-y-1 text-sm text-blue-800">
									<li>📅 Horaire : À déterminer</li>
									<li>📍 Salle : À déterminer</li>
									<li>👥 Professeur : À déterminer</li>
									<li>📋 Documents : Disponibles après inscription</li>
								</ul>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Statistics -->
		<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
			<div class="rounded-lg bg-white p-6 shadow-lg">
				<p class="text-3xl font-bold text-purple-600">{classes.length}</p>
				<p class="mt-2 text-gray-600">Séances totales</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg">
				<p class="text-3xl font-bold text-indigo-600">{mockCourses.length}</p>
				<p class="mt-2 text-gray-600">Cours couverts</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg">
				<p class="text-3xl font-bold text-green-600">
					{(classes.length * 120).toLocaleString()}
				</p>
				<p class="mt-2 text-gray-600">Places disponibles</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg">
				<p class="text-3xl font-bold text-orange-600">
					{classes.length}
				</p>
				<p class="mt-2 text-gray-600">Ressources en ligne</p>
			</div>
		</div>
	</div>
</div>

