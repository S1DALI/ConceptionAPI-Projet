<script lang="ts">
	export let data;
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-7xl">
		<header class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Panneau d'administration</h1>
			<p class="mt-2 text-gray-600">Bienvenue, {data.user.firstname} !</p>
		</header>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<!-- Card: Gestion des utilisateurs -->
			<div class="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900">Utilisateurs</h3>
				<p class="mt-2 text-sm text-gray-500">Gérer les comptes utilisateurs, rôles et accès.</p>
				<a
					href="/admin/users"
					class="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
				>
					Gérer &rarr;
				</a>
			</div>

			<!-- Card: Gestion des diplômes -->
			<div class="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900">Diplômes</h3>
				<p class="mt-2 text-sm text-gray-500">Explorez les diplômes et cursus.</p>
				<a
					href="/admin/degrees"
					class="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
				>
					Gérer &rarr;
				</a>
			</div>

<!--
			<div class="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-600"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M23 5v13.883l-1 .117v-16c-3.895.119-7.505.762-10.002 2.316-2.496-1.554-6.102-2.197-9.998-2.316v16l-1-.117v-13.883h-1v15h9.057c1.479 0 1.641 1 2.941 1 1.304 0 1.461-1 2.942-1h9.06v-15h-1zm-12 13.645c-1.946-.772-4.137-1.269-7-1.484v-12.051c2.352.197 4.996.675 7 1.922v11.613zm9-1.484c-2.863.215-5.054.712-7 1.484v-11.613c2.004-1.247 4.648-1.725 7-1.922v12.051z"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900">Cours</h3>
				<p class="mt-2 text-sm text-gray-500">Explorer les cours disponibles.</p>
				<a
					href="/admin/courses"
					class="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
				>
					Gérer &rarr;
				</a>
			</div>


			<div class="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							 d="M6 3.447h-1v-1.447h19v16h-7.731l2.731 4h-1.311l-2.736-4h-1.953l-2.736 4h-1.264l2.732-4h-2.732v-1h8v-1h3v1h3v-14h-17v.447zm2.242 17.343c-.025.679-.576 1.21-1.256 1.21-.64 0-1.179-.497-1.254-1.156l-.406-4.034-.317 4.019c-.051.656-.604 1.171-1.257 1.171-.681 0-1.235-.531-1.262-1.21l-.262-6.456-.308.555c-.241.437-.8.638-1.265.459-.404-.156-.655-.538-.655-.951 0-.093.012-.188.039-.283l1.134-4.098c.17-.601.725-1.021 1.351-1.021h4.096c.511 0 1.012-.178 1.285-.33.723-.403 2.439-1.369 3.136-1.793.394-.243.949-.147 1.24.217.32.396.286.95-.074 1.297l-3.048 2.906c-.375.359-.595.849-.617 1.381-.061 1.397-.3 8.117-.3 8.117zm-5.718-10.795c-.18 0-.34.121-.389.294-.295 1.04-1.011 3.666-1.134 4.098l1.511-2.593c.172-.295.623-.18.636.158l.341 8.797c.01.278.5.287.523.002 0 0 .269-3.35.308-3.944.041-.599.449-1.017.992-1.017.547.002.968.415 1.029 1.004.036.349.327 3.419.385 3.938.043.378.505.326.517.022 0 0 .239-6.725.3-8.124.033-.791.362-1.523.925-2.061l3.045-2.904c-.661.492-2.393 1.468-3.121 1.873-.396.221-1.07.457-1.772.457h-4.096zm16.476 1.005h-5v-1h5v1zm2-2h-7v-1h7v1zm-15.727-4.994c-1.278 0-2.315 1.038-2.315 2.316 0 1.278 1.037 2.316 2.315 2.316s2.316-1.038 2.316-2.316c0-1.278-1.038-2.316-2.316-2.316zm0 1c.726 0 1.316.59 1.316 1.316 0 .726-.59 1.316-1.316 1.316-.725 0-1.315-.59-1.315-1.316 0-.726.59-1.316 1.315-1.316zm15.727 1.994h-7v-1h7v1z"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900">Classes</h3>
				<p class="mt-2 text-sm text-gray-500">Explorer les classes disponibles.</p>
				<a
					href="/admin/classes"
					class="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
				>
					Gérer &rarr;
				</a>
			</div>
			-->
		</div>
	</div>
</div>
