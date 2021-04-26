<script>
	
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import grmys from './grmysApi.svelte';
	import paawards from './paawards-api.svelte';
	import Richpp from './Richpp.svelte';
const routes = {
		"/":Home,
		"/grmys": grmys,
		"/richpp": Richpp,
		"/paawards": paawards,
		"*":NotFound,
    };
</script>

<main>
	<Router {routes}> </Router>
	<a href="index_static.html">Pincha aquí para ver toda la información del proyecto</a>
</main>

