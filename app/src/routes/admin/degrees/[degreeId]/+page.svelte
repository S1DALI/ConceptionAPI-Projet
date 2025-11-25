<script lang="ts">
	export let data;
	export let form;

</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-6xl">
		<div class="mb-8 flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Modifier le cursus</h1>
				<p class="mt-2 text-gray-600">
					{data.targetDegree.name}
				</p>
			</div>
			<a
				href="/admin/degrees"
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

			<form method="POST" action="?/put" class="space-y-6">
				<!-- Role Selection -->
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
					<input
	type="text"
	class="w-full rounded-md border border-black px-3 py-2 shadow-sm focus:border-black focus:ring-2 focus:ring-black focus:outline-none transition"
/>

				</div>

				<!-- Degree Selection -->

				<div class="flex justify-end pt-4">
					<button
						type="submit"
						class="cursor-pointer rounded-lg bg-indigo-600 px-6 py-2 text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Enregistrer
					</button>
				</div>
			</form>

			<div class="mt-8 border-t border-gray-200 pt-6">
				<div class="flex items-center justify-between">
					<div>
						<h3 class="text-lg font-medium text-gray-900">Supprimer l'utilisateur</h3>
						<p class="mt-1 text-sm text-gray-500">
							Cette action est irréversible. Toutes les données associées à ce cursus seront
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
		</div>
	</div>
</div>
