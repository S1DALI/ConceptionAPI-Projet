<script>
	import { mockUsers } from '$lib/mockData';

	let users = $state(mockUsers);
	let selectedUser = $state(null);

	const roleColors = {
		student: 'bg-blue-100 text-blue-800',
		professor: 'bg-green-100 text-green-800',
		class_representative: 'bg-purple-100 text-purple-800',
		admin: 'bg-red-100 text-red-800'
	};

	const roleLabels = {
		student: 'Étudiant',
		professor: 'Professeur',
		class_representative: 'Délégué de classe',
		admin: 'Administrateur'
	};
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
			<p class="mt-2 text-gray-600">Consultez et gérez tous les utilisateurs du système</p>
		</div>

		<!-- Users Table -->
		<div class="rounded-lg bg-white shadow-lg overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-indigo-600">
						<tr>
							<th class="px-6 py-4 text-left text-white font-semibold">Nom</th>
							<th class="px-6 py-4 text-left text-white font-semibold">Email</th>
							<th class="px-6 py-4 text-left text-white font-semibold">Rôle</th>
							<th class="px-6 py-4 text-center text-white font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each users as user (user.id)}
							<tr class="hover:bg-gray-50 transition">
								<td class="px-6 py-4 font-medium text-gray-900">{user.name}</td>
								<td class="px-6 py-4 text-gray-600">{user.email}</td>
								<td class="px-6 py-4">
									<span class="px-3 py-1 rounded-full text-sm font-medium {roleColors[user.role]}">
										{roleLabels[user.role]}
									</span>
								</td>
								<td class="px-6 py-4 text-center">
									<button
										on:click={() => (selectedUser = selectedUser?.id === user.id ? null : user)}
										class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
									>
										Détails
									</button>
								</td>
							</tr>
							{#if selectedUser?.id === user.id}
								<tr class="bg-indigo-50">
									<td colspan="4" class="px-6 py-4">
										<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<p class="text-sm text-gray-600">ID</p>
												<p class="font-semibold text-gray-900">{user.id}</p>
											</div>
											<div>
												<p class="text-sm text-gray-600">Email</p>
												<p class="font-semibold text-gray-900">{user.email}</p>
											</div>
											<div>
												<p class="text-sm text-gray-600">Nom complet</p>
												<p class="font-semibold text-gray-900">{user.name}</p>
											</div>
											<div>
												<p class="text-sm text-gray-600">Rôle</p>
												<p class="font-semibold text-gray-900">{roleLabels[user.role]}</p>
											</div>
										</div>
									</td>
								</tr>
							{/if}
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Stats -->
		<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
			<div class="rounded-lg bg-white p-6 shadow">
				<p class="text-2xl font-bold text-indigo-600">{users.length}</p>
				<p class="text-gray-600">Utilisateurs totaux</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow">
				<p class="text-2xl font-bold text-blue-600">
					{users.filter(u => u.role === 'student').length}
				</p>
				<p class="text-gray-600">Étudiants</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow">
				<p class="text-2xl font-bold text-green-600">
					{users.filter(u => u.role === 'professor').length}
				</p>
				<p class="text-gray-600">Professeurs</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow">
				<p class="text-2xl font-bold text-purple-600">
					{users.filter(u => u.role === 'class_representative').length}
				</p>
				<p class="text-gray-600">Délégués</p>
			</div>
		</div>
	</div>
</div>

