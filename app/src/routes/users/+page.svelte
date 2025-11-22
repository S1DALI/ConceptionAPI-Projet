<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
  let selectedUser = $state<typeof data.users[0] | null>(null);

  // Mapping int -> label/couleur
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
            {#each data.users as user (user.id)}
              <tr class="hover:bg-gray-50 transition">
                <td class="px-6 py-4 font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                <td class="px-6 py-4 text-gray-600">{user.email}</td>
                <td class="px-6 py-4">
                  <span class="px-3 py-1 rounded-full text-sm font-medium {data.roleColors[Number(user.role)]}">
                    {data.roleLabels[Number(user.role)]}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <button
                    onclick={() => selectedUser = selectedUser?.id === user.id ? null : user}
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
                        <p class="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">Rôle</p>
                        <p class="font-semibold text-gray-900">{data.roleLabels[Number(user.role)]}</p>
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
        <p class="text-2xl font-bold text-indigo-600">{data.users.length}</p>
        <p class="text-gray-600">Utilisateurs totaux</p>
      </div>
      <div class="rounded-lg bg-white p-6 shadow">
        <p class="text-2xl font-bold text-blue-600">
          {data.users.filter(u => Number(u.role) === 0).length}
        </p>
        <p class="text-gray-600">Étudiants</p>
      </div>
      <div class="rounded-lg bg-white p-6 shadow">
        <p class="text-2xl font-bold text-purple-600">
          {data.users.filter(u => Number(u.role) === 1).length}
        </p>
        <p class="text-gray-600">Délégués</p>
      </div>
      <div class="rounded-lg bg-white p-6 shadow">
        <p class="text-2xl font-bold text-green-600">
          {data.users.filter(u => Number(u.role) === 2).length}
        </p>
        <p class="text-gray-600">Professeurs</p>
      </div>
    </div>
  </div>
</div>
