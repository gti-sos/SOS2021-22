<script>
	
	import Router from 'svelte-spa-router';
	import Home from "./Home.svelte";
	import info from "./info.svelte";
	import grmys from './grmysApi/grmysApi.svelte';
	import paawards from './paawardsApi/paawards-api.svelte';
	import Richpp from './richppApi/Richpp.svelte';
	const routes = {
		"/":Home,
		"/info":info,
		"/paawards": paawards,
		"/grmys": grmys,
		"/richpp": Richpp,
		//"*":NotFound
    };
</script>

<main>
	<Router {routes}> </Router>
</main>

