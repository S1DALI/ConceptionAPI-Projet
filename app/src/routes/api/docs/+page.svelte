<script>
  import { onMount } from 'svelte';
  let swaggerEl;

  import SwaggerUIBundle from 'swagger-ui-dist/swagger-ui-bundle.js';
  import 'swagger-ui-dist/swagger-ui.css';

  onMount(() => {
    SwaggerUIBundle({
      domNode: swaggerEl,
      url: '/myClasses-swagger.yaml'
    });
  });
</script>

<div bind:this={swaggerEl}></div>