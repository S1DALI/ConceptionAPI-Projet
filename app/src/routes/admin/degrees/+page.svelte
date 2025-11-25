<script lang="ts">
	export let data;
	const roleNames: Record<number, string> = {
		0: 'Étudiant',
		1: 'Délégué',
		2: 'Professeur',
		3: 'Administrateur'
	};
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-6xl">
		<div class="mb-8 flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Diplômes</h1>
				<p class="mt-2 text-gray-600">Explorer les diplômes et cursus de la plateforme.</p>
			</div>
			<a
				href="/admin"
				class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
			>
				&larr; Retour
			</a>
		</div>

		<div class="overflow-hidden rounded-xl bg-white shadow-sm">
			<table class="min-w-full table-fixed divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							scope="col"
							class="w-16 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
							>ID</th
						>
						<th
							scope="col"
							class="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
							>Nom</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each data.degrees as degree}
						<tr class="hover:bg-gray-50">
							<td class="truncate px-6 py-4 text-center text-sm text-gray-500">#{degree.id}</td>
							<td class="truncate px-6 py-4 text-sm font-medium text-gray-900">
								{degree.name}
							</td>
							<!--
							<td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
								<a href="/admin/degrees/{degree.id}" class="text-indigo-600 hover:text-indigo-900"
									>Modifier</a
								>
							</td>-->
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
