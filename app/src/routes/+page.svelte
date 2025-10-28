<script>
    let message = '';

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


<button on:click={fetchMessage}>Fetch from backend</button>

<p>{message}</p>

<button on:click={sendMessage}>Envoyer POST</button>
<p>{message2}</p>


