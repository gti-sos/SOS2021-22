<script>
	
	import Router from 'svelte-spa-router';
	import Home from "./Home.svelte";
	import grmys from './grmysApi.svelte';
	import paawards from './paawards-api.svelte';
	import Richpp from './Richpp.svelte';
	const routes = {
		"/":Home,
		"/paawards": paawards,
		"/grmys": grmys,
		"/richpp": Richpp,
		//"*":NotFound
    };
</script>

<main>
	<Router {routes}> </Router>
</main>

