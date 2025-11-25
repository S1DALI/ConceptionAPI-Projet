<script lang="ts">
	export let data;
	export let form;

	const roles = [
		{ role: 0, name: 'Étudiant' },
		{ role: 1, name: 'Délégué' },
		{ role: 2, name: 'Professeur' },
		{ role: 3, name: 'Administrateur' }
	];
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-6xl">
		<div class="mb-8 flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Modifier l'utilisateur</h1>
				<p class="mt-2 text-gray-600">
					{data.targetUser.firstName}
					{data.targetUser.lastName}
				</p>
			</div>
			<a
				href="/admin/users"
				class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
			>
				&larr; Retour
			</a>
		</div>

		<div class="max-w-2xl rounded-xl bg-white p-8 shadow-sm">
			{#if form?.message}
				<div class="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
					{form.message}
				</div>
			{/if}

			<form method="POST" action="?/patch" class="space-y-6">
				<!-- Role Selection -->
				<div>
					<label for="role" class="block text-sm font-medium text-gray-700">Rôle</label>
					<select
						id="role"
						name="role"
						class="mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm"
						value={data.targetUser.role}
					>
						{#each roles as role}
							<option value={role.role}>{role.name}</option>
						{/each}
					</select>
				</div>

				<!-- Degree Selection -->
				<div>
					<label for="degreeId" class="block text-sm font-medium text-gray-700">Diplôme</label>
					<select
						id="degreeId"
						name="degreeId"
						class="mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm"
						value={data.targetUser.degreeId}
					>
						{#each data.degrees as degree}
							<option value={degree.id}>{degree.name}</option>
						{/each}
					</select>
				</div>

				<div class="flex justify-end pt-4">
					<button
						type="submit"
						class="cursor-pointer rounded-lg bg-indigo-600 px-6 py-2 text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Enregistrer
					</button>
				</div>
			</form>

			{#if data.targetUser.role !=3}
			<div class="mt-8 border-t border-gray-200 pt-6">
				<div class="flex items-center justify-between">
					<div>
						<h3 class="text-lg font-medium text-gray-900">Supprimer l'utilisateur</h3>
						<p class="mt-1 text-sm text-gray-500">
							Cette action est irréversible. Toutes les données associées à cet utilisateur seront
							supprimées.
						</p>
					</div>
					<form
						action="?/delete"
						method="POST"
						on:submit|preventDefault={(e) => {
							if (
								confirm(
									'Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.'
								)
							) {
								e.currentTarget.submit();
							}
						}}
					>
						<button
							type="submit"
							class="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
						>
							Supprimer
						</button>
					</form>
				</div>
			</div>
			{/if}
		</div>
	</div>
</div>
