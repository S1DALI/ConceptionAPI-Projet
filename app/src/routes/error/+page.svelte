<script>
  import { page } from '$app/stores';
</script>

<h1>Erreur</h1>
<p>{$page.url.searchParams.get('message')}</p>
<a href="/">Retour</a>
