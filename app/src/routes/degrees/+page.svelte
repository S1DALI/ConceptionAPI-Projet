<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
  let expandedDegree = $state<typeof data.degrees[0] | null>(null);

  function getCoursesForDegree(degreeId: string | number) {
    return data.courses.filter(course => course.degreeId === degreeId);
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
        <div class="rounded-lg bg-white shadow-md overflow-hidden hover:shadow-lg transition">
          <!-- Degree Header -->
          <button
            onclick={() => expandedDegree = expandedDegree === degree.id ? null : degree.id}
            class="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition"
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
            <div class="px-6 py-6 bg-gray-50">
              <h3 class="mb-4 text-lg font-semibold text-gray-900">Cours du programme :</h3>
              <div class="space-y-3">
                {#each getCoursesForDegree(degree.id) as course (course.id)}
                  <div class="rounded-lg border border-gray-200 bg-white p-4">
                    <div class="flex items-start justify-between">
                      <div>
                        <h4 class="font-semibold text-gray-900">{course.name}</h4>
                        <p class="mt-1 text-sm text-gray-600">{course.description}</p>
                      </div>
                      <span class="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                        ID: {course.id}
                      </span>
                    </div>
                  </div>
                {/each}

                {#if getCoursesForDegree(degree.id).length === 0}
                  <p class="text-gray-500 italic">Aucun cours pour ce diplôme pour le moment.</p>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Statistics -->
    <div class="mt-8 rounded-lg bg-white p-6 shadow-lg">
      <h3 class="mb-4 text-xl font-bold text-gray-900">Statistiques</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="flex items-center justify-between border-b pb-4">
          <span class="text-gray-600">Nombre de diplômes</span>
          <span class="text-2xl font-bold text-indigo-600">{data.degrees.length}</span>
        </div>
        <div class="flex items-center justify-between border-b pb-4">
          <span class="text-gray-600">Total des cours</span>
          <span class="text-2xl font-bold text-indigo-600">{data.courses.length}</span>
        </div>
        <div class="flex items-center justify-between pt-4">
          <span class="text-gray-600">Cours en moyenne par diplôme</span>
          <span class="text-2xl font-bold text-indigo-600">
            {(data.courses.length / data.degrees.length).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

