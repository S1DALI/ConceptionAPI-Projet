<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	let expandedClass = $state<(typeof data.classes)[0] | null>(null);

	function getCourseName(courseId: string | number) {
		const course = data.courses.find((c) => c.id === courseId);
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
			{#each data.classes as classItem (classItem.id)}
				<div class="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
					<!-- Class Header -->
					<button
						onclick={() => (expandedClass = expandedClass === classItem.id ? null : classItem.id)}
						class="flex w-full items-center justify-between bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 text-white transition hover:from-purple-600 hover:to-purple-700"
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
						<div class="space-y-4 bg-gray-50 px-6 py-6">
							<!-- Class Information -->
							<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
							<div class="rounded-lg border border-gray-200 bg-white p-4">
								<p class="mb-2 text-sm font-semibold text-gray-600">Ressources et lien</p>
								<a
									href={classItem.link}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
								>
									<span>🔗</span>
									<span>Accéder à la ressource</span>
								</a>
							</div>

							<!-- Additional Info -->
							<div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
								<h4 class="mb-2 font-semibold text-blue-900">Informations supplémentaires</h4>
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
				<p class="text-3xl font-bold text-purple-600">{data.classes.length}</p>
				<p class="mt-2 text-gray-600">Nombre de cours</p>
			</div>
		</div>
	</div>
</div>
