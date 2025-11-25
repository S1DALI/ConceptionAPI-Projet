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
				<h1 class="text-3xl font-bold text-gray-900">Utilisateurs</h1>
				<p class="mt-2 text-gray-600">Gérer les comptes utilisateurs de la plateforme.</p>
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
						<th
							scope="col"
							class="w-1/3 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
							>Email</th
						>
						<th
							scope="col"
							class="w-1/6 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
							>Rôle</th
						>
						<th
							scope="col"
							class="w-1/6 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
							>Diplôme</th
						>
						<th
							scope="col"
							class="w-24 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
							>Actions</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each data.users as user}
						<tr class="hover:bg-gray-50">
							<td class="truncate px-6 py-4 text-center text-sm text-gray-500">#{user.id}</td>
							<td class="truncate px-6 py-4 text-sm font-medium text-gray-900">
								{user.firstName}
								{user.lastName}
							</td>
							<td class="truncate px-6 py-4 text-sm text-gray-500" title={user.email}
								>{user.email}</td
							>
							<td class="px-6 py-4 text-center text-sm text-gray-500">
								<span
									class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                                    {user.role === 3
										? 'bg-purple-100 text-purple-800'
										: user.role === 0
											? 'bg-red-100 text-red-800'
											: 'bg-blue-100 text-blue-800'}"
								>
									{roleNames[user.role] ?? 'Rôle inconnu'}
								</span>
							</td>
							<td class="px-6 py-4 text-center text-sm text-gray-500">
								{user.degreeName ? user.degreeName : '-'}
							</td>
							<td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
								<a href="/admin/users/{user.id}" class="text-indigo-600 hover:text-indigo-900"
									>Modifier</a
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
