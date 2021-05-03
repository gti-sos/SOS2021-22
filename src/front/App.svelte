<script>
	
	import Router from 'svelte-spa-router';
	import Home from "./Home.svelte";
	import info from "./info.svelte";
	import NotFound from "./NotFound.svelte";
	import grmys from './grmysApi/grmysApi.svelte';
	import paawards from './paawardsApi/paawards-api.svelte';
	import paawardEdit from './paawardsApi/paawardsEdit.svelte';
	import Richpp from './richppApi/Richpp.svelte';
	import RichmanEdit from './richppApi/RichmanEdit.svelte';
	import editGrmys from './grmysApi/editGrmys.svelte';
	const routes = {
		"/":Home,
		"/info":info,
		"/paawards": paawards,
		"/paawards/:country/:year": paawardEdit,
		"/grmys": grmys,
		"/richpp": Richpp,
		"/richman/:name": RichmanEdit,
		"/grmys/:ranking/:name": editGrmys,
		"*":NotFound
    };
</script>

<main>
	<Router {routes}> </Router>
</main>

