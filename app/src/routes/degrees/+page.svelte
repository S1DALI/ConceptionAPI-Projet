<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	let expandedDegree = $state<(typeof data.degrees)[0] | null>(null);

	function getCoursesForDegree(degreeId: string | number) {
		return data.courses.filter((course) => course.degreeId === degreeId);
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
	<div class="mx-auto max-w-4xl px-6">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-gray-900">Diplômes et Parcours</h1>
			<p class="mt-2 text-gray-600">Consultez tous les diplômes et leurs programmes</p>
		</div>

		<!-- Degrees List -->
		<div class="space-y-4">
			{#each data.degrees as degree (degree.id)}
				<div class="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
					<!-- Degree Header -->
					<button
						onclick={() => (expandedDegree = expandedDegree === degree.id ? null : degree.id)}
						class="flex w-full items-center justify-between bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4 text-white transition hover:from-indigo-600 hover:to-indigo-700"
					>
						<div class="flex items-center gap-4">
							<span class="text-2xl">🎓</span>
							<div class="text-left">
								<h2 class="text-xl font-bold">{degree.name}</h2>
								<p class="text-sm text-indigo-100">
									{getCoursesForDegree(degree.id).length} cours
								</p>
							</div>
						</div>
						<span class="text-2xl">
							{expandedDegree === degree.id ? '▼' : '▶'}
						</span>
					</button>

					<!-- Expanded Content -->
					{#if expandedDegree === degree.id}
						<div class="bg-gray-50 px-6 py-6">
							<h3 class="mb-4 text-lg font-semibold text-gray-900">Matières du programme :</h3>
							<div class="space-y-3">
								{#each getCoursesForDegree(degree.id) as course (course.id)}
									<a
										href={`/${degree.id}/courses?course=${course.id}`}
										class="block rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-indigo-50"
									>
										<h4 class="font-semibold text-gray-900">{course.name}</h4>
										<p class="mt-1 text-sm text-gray-600">{course.description}</p>
									</a>
								{/each}

								{#if getCoursesForDegree(degree.id).length === 0}
									<p class="italic text-gray-500">Aucune matière pour ce diplôme pour le moment.</p>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
