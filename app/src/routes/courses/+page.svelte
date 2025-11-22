<script>
	import { mockCourses, mockDegrees } from '$lib/mockData';

	let courses = $state(mockCourses);
	let selectedCourse = $state(null);

	function getDegreeName(degreeId) {
		const degree = mockDegrees.find(d => d.id === degreeId);
		return degree ? degree.name : 'Diplôme inconnu';
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-gray-900">Catalogue des Cours</h1>
			<p class="mt-2 text-gray-600">Explorez tous les cours disponibles dans nos programmes</p>
		</div>

		<!-- Courses Grid -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each courses as course (course.id)}
				<div
					class="rounded-lg bg-white shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
					on:click={() =>
						(selectedCourse = selectedCourse?.id === course.id ? null : course)}
				>
					<!-- Card Header -->
					<div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-white">
						<div class="text-3xl mb-2">📚</div>
						<h3 class="text-lg font-bold">{course.name}</h3>
					</div>

					<!-- Card Body -->
					<div class="px-6 py-4">
						<div class="mb-3">
							<p class="text-sm text-gray-600 font-semibold">Diplôme</p>
							<p class="text-gray-900">{getDegreeName(course.degreeId)}</p>
						</div>
						<div class="mb-3">
							<p class="text-sm text-gray-600 font-semibold">Description</p>
							<p class="text-gray-700">{course.description}</p>
						</div>
						<div>
							<span class="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
								ID: {course.id}
							</span>
						</div>
					</div>

					<!-- Card Footer -->
					{#if selectedCourse?.id === course.id}
						<div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
							<h4 class="mb-2 font-semibold text-gray-900">Informations détaillées</h4>
							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span class="text-gray-600">Code du cours</span>
									<span class="font-medium text-gray-900">COURS-{course.id}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600">Crédits</span>
									<span class="font-medium text-gray-900">6 ECTS</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600">Durée</span>
									<span class="font-medium text-gray-900">45h</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600">Professeur</span>
									<span class="font-medium text-gray-900">À déterminer</span>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Statistics -->
		<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="rounded-lg bg-white p-6 shadow-lg">
				<p class="text-3xl font-bold text-green-600">{courses.length}</p>
				<p class="mt-2 text-gray-600">Cours disponibles</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg">
				<p class="text-3xl font-bold text-blue-600">{mockDegrees.length}</p>
				<p class="mt-2 text-gray-600">Diplômes couverts</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-lg">
				<p class="text-3xl font-bold text-purple-600">{courses.length * 6}</p>
				<p class="mt-2 text-gray-600">Crédits ECTS totaux</p>
			</div>
		</div>
	</div>
</div>

