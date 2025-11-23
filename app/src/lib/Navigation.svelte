<script>
	import { page } from '$app/stores';
</script>

<nav class="sticky top-0 z-50 bg-indigo-600 shadow-lg">
	<div class="mx-auto max-w-6xl px-6 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 text-2xl font-bold text-white">
				<span>📚</span>
				<span>MyClasses</span>
			</a>

			<!-- Navigation Links -->
			<div class="flex items-center gap-8">
				<a
					href="/"
					class="text-white transition hover:text-indigo-100 {$page.url.pathname === '/'
						? 'border-b-2 border-white'
						: ''}"
				>
					Accueil
				</a>
				<a
					href="/degrees"
					class="text-white transition hover:text-indigo-100 {$page.url.pathname.includes(
						'/degrees'
					)
						? 'border-b-2 border-white'
						: ''}"
				>
					Diplômes
				</a>
				<a
					href="/courses"
					class="text-white transition hover:text-indigo-100 {$page.url.pathname.includes(
						'/courses'
					)
						? 'border-b-2 border-white'
						: ''}"
				>
					Matières
				</a>
				<a
					href="/classes"
					class="text-white transition hover:text-indigo-100 {$page.url.pathname.includes(
						'/classes'
					)
						? 'border-b-2 border-white'
						: ''}"
				>
					Cours
				</a>
			</div>
		</div>
	</div>
</nav>
