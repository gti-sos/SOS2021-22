<script>
	import Router from 'svelte-spa-router';
	import Home from "./Home.svelte";
	import info from "./info.svelte";
	import about from "./about.svelte";
	import NotFound from "./NotFound.svelte";
	import grmys from './grmysApi/grmysApi.svelte';
	import editGrmys from './grmysApi/editGrmys.svelte';
	import grmysGraph from './grmysApi/grmysGraphic.svelte';
	import paawards from './paawardsApi/paawards-api.svelte';
	import paawardEdit from './paawardsApi/PaawardsEdit.svelte';
	import paawardGraph from './paawardsApi/PaawardsGraphic.svelte'
	import Richpp from './richppApi/Richpp.svelte';
	import RichmanEdit from './richppApi/RichmanEdit.svelte';
	import globalGraphic from './globalGraphic.svelte';
	import RichmanGraph from './richppApi/RichppGraphic.svelte';
	const routes = {
		"/":Home,
		"/info":info,
		"/about":about,
		"/paawards": paawards,
		"/paawards/:country/:year": paawardEdit,
		"/paawards/paawardsGraphic": paawardGraph,
		"/grmys": grmys,
		"/grmys/:ranking/:name": editGrmys,
		"/grmys/grmysGraphic": grmysGraph,
		"/richpp": Richpp,
		"/richpp/:name/:year": RichmanEdit,
		"/globalGraphic":globalGraphic,
		"/richpp/RichppGraphic": RichmanGraph,
		"*":NotFound
    };
</script>

<main>
	<Router {routes}> </Router>
</main>

