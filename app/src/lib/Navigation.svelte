<script lang="ts">
	import { page } from '$app/stores';
	import { LogOut } from '@lucide/svelte';

	let { user } = $props();
</script>

<nav class="sticky top-0 z-50 bg-indigo-600 shadow-lg">
	<div class="mx-auto max-w-6xl px-6 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 text-2xl font-bold text-white">
				<span>📚</span>
				<span>MyClasses</span>
			</a>

			<!-- Navigation Links + User -->
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

				{#if user && user.role === 3}
					<a
						href="/admin"
						class="text-white transition hover:text-indigo-100 {$page.url.pathname.includes(
							'/admin'
						)
							? 'border-b-2 border-white'
							: ''}"
					>
						Admin
					</a>
				{/if}

				<!-- User Info en haut à droite -->
				{#if user}
					<div class="flex items-center gap-3 border-l border-indigo-400 pl-8">
						<div class="text-right">
							<p class="text-sm font-semibold text-white">
								{user.given_name}
								{user.family_name}
							</p>
							<p class="text-xs text-indigo-100">{user.email}</p>
						</div>
						<img
							src={user.picture}
							referrerpolicy="no-referrer"
							alt="Profile"
							class="h-10 w-10 rounded-full border-2 border-white"
						/>
						<!-- Logout button -->
						<form method="POST" action="/api/v1/users/logout">
							<button
								type="submit"
								class="ml-4 flex items-center gap-2 rounded bg-indigo-800 px-3 py-1 text-white transition hover:bg-red-600"
							>
								<LogOut />
							</button>
						</form>
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>
