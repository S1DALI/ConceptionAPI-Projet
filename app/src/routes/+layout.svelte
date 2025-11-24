<script lang="ts">
    import '../app.css';
    import favicon from '$lib/assets/favicon.svg';
    import Navigation from '$lib/Navigation.svelte';
    
    let { data, children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{#if data.user}
    <Navigation user={data.user} />
{/if}

{@render children()}