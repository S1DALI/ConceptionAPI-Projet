<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	let selectedCourseId = $derived(data.courseId);
	let selectedCourse = $derived(data.courses.find((c) => c.id === selectedCourseId));
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
	<div class="mx-auto max-w-6xl px-6">
		<h1 class="mb-4 text-4xl font-bold text-gray-900">
			{data.degrees.find((d) => d.id === data.degreeId)?.name}
		</h1>

		<!-- Liste des cours -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each data.courses as course}
				<a
					href={`?course=${course.id}`}
					class="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
				>
					<div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-white">
						<div class="mb-2 text-3xl">📚</div>
						<h3 class="text-lg font-bold">{course.name}</h3>
					</div>

					<div class="px-6 py-4 text-gray-700">
						<p>{course.description}</p>
					</div>
				</a>
			{/each}
		</div>

		<!-- Classes du cours sélectionné -->
		{#if selectedCourseId}
			<div class="mt-12">
				<h2 class="mb-4 text-2xl font-semibold text-gray-900">
					{selectedCourse?.name}
				</h2>

				{#if data.classes.length > 0}
					<div class="space-y-4">
						{#each data.classes as cl}
							<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
								<h3 class="font-semibold text-gray-900">{cl.name}</h3>
								<a href={cl.link} target="_blank" class="text-sm text-blue-600 hover:underline">
									Accéder au cours →
								</a>
							</div>
						{/each}
					</div>
				{:else}
					<p class="italic text-gray-600">Aucun cours pour cette matière.</p>
				{/if}
			</div>
		{/if}
	</div>
</div>
