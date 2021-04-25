<script>
	//import Router from 'svelte-routing';
	//import grmys from './grmys-api.svelte';
	//import paawards from './paawards-api.svelte';
	import Richpp from './Richpp.svelte';
	//import Principal from './Principal.svelte';
	export let name;
</script>

<main>

	<h1>Hello {name}!</h1>
	<input bind:value={name}>

	<Richpp/>

	<a href="index_static.html">Pincha aquí para ver toda la información del proyecto</a>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>