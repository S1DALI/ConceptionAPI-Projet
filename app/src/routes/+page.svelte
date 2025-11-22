<script>
	let message = '';
	import CreateDb from '../CreateDb.svelte';

	async function fetchMessage() {
		const response = await fetch('/api/hello');
		const data = await response.json();
		message = data.message;
	}

	let message2 = '';

	async function sendMessage() {
		const res = await fetch('/api/hello', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message: 'message pour le back !' })
		});
		const data = await res.json();
		message2 = JSON.stringify(data);
	}
</script>

<h1>SALIIIT</h1>
<CreateDb></CreateDb>
