<script lang="ts">
	

  async function usePost(){
  await fetch('api/examples', {method: 'POST'});
  }

  async function useGet(){
  await fetch('api/examples');
  }
</script>

<button on:click={useGet}>
  Create db
</button>