<script>
	
	import Router from 'svelte-spa-router';
	import Home from "./Home.svelte";
	import info from "./info.svelte";
	import NotFound from "./NotFound.svelte";
	import grmys from './grmysApi/grmysApi.svelte';
	import paawards from './paawardsApi/paawards-api.svelte';
	import paawardEdit from './paawardsApi/PaawardsEdit.svelte';
	import paawardGraph from './paawardsApi/PaawardsGraphic.svelte'
	import Richpp from './richppApi/Richpp.svelte';
	import RichmanEdit from './richppApi/RichmanEdit.svelte';
	import RichmanGraph from './richppApi/RichppGraphic.svelte';
	import editGrmys from './grmysApi/editGrmys.svelte';
	import grmysGraph from './grmysApi/grmysGraphic.svelte';
	const routes = {
		"/":Home,
		"/info":info,
		"/paawards": paawards,
		"/paawards/:country/:year": paawardEdit,
		"/paawards/paawardsGraphic": paawardGraph,
		"/grmys": grmys,
		"/grmys/:ranking/:name": editGrmys,
		"/grmys/grmysGraphic": grmysGraph,
		"/richpp": Richpp,
		"/richpp/:name/:year": RichmanEdit,
		"/richpp/RichppGraphic": RichmanGraph,
		"*":NotFound
    };
</script>

<main>
	<Router {routes}> </Router>
</main>

