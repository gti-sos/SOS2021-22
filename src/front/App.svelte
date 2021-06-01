<script>
	import Router from 'svelte-spa-router';
	import Home from "./Home.svelte";
	import info from "./info.svelte";
	import about from "./about.svelte";
	import integrations from "./integrations.svelte";
	import integrationLifeStats from "./richppApi/integrations/integrationLifeStats.svelte";
	import integrationPBISP from "./richppApi/integrations/integrationPBISP.svelte";
	import integrationExt1 from "./richppApi/integrations/integrationExt1.svelte";
	import integrationExt2 from "./richppApi/integrations/integrationExt2.svelte";
	import integrationsGrmys1 from "./grmysApi/integrations/API-11-Smoking.svelte";
	import integrationsGrmys2 from "./grmysApi/integrations/API-21-Temperatures.svelte";
	import integrationsGrmys3 from "./grmysApi/integrations/API-28-awards.svelte";
	import NotFound from "./NotFound.svelte";
	import grmys from './grmysApi/grmysApi.svelte';
	import editGrmys from './grmysApi/editGrmys.svelte';
	import grmysGraph from './grmysApi/grmysGraphic.svelte';
	import grmysGraphs from './grmysApi/grmysGraphics.svelte';
	import grmysGraphAm from './grmysApi/grmysAmchart.svelte';
	import paawards from './paawardsApi/paawards-api.svelte';
	import paawardEdit from './paawardsApi/PaawardsEdit.svelte';
	import paawardGraph from './paawardsApi/PaawardsGraphic.svelte';
	import paawardGraph1 from './paawardsApi/PaawardsGraphic1.svelte';
	import paawardGraph2 from './paawardsApi/PaawardsGraphic2.svelte';
	import integrationsPaawards1 from './paawardsApi/integrations/integrationsPaawardsFireStats.svelte';
	import Richpp from './richppApi/Richpp.svelte';
	import RichmanEdit from './richppApi/RichmanEdit.svelte';
	import globalGraphic from './globalGraphic.svelte';
	import RichmanGraph from './richppApi/RichppGraphic.svelte';
	import RichmanGraph1 from './richppApi/RichppGraphic1.svelte';
    import RichmanGraph2 from './richppApi/RichppGraphic2.svelte';

	const routes = {
		"/":Home,
		"/info":info,
		"/about":about,
		"/integrations":integrations,
		"/integrations/integrationLifeStats":integrationLifeStats,
		"/integrations/integrationPBISP":integrationPBISP,
		"/integrations/integrationExt1":integrationExt1,
		"/integrations/integrationExt2":integrationExt2,
		"/integrations/integrationsPaawardsANDFireStats":integrationsPaawards1,
		"/integrations/API-11-Smoking":integrationsGrmys1,
		"/integrations/API-21-Temperatures":integrationsGrmys2,
		"/integrations/API-28-awards":integrationsGrmys3,
		"/paawards": paawards,
		"/paawards/:country/:year": paawardEdit,
		"/paawards/paawardsGraphic": paawardGraph,
		"/paawards/paawardsGraphic-Highcharts": paawardGraph1,
		"/paawards/paawardsGraphic-Anychart": paawardGraph2,
		"/grmys": grmys,
		"/grmys/:ranking/:name": editGrmys,
		"/grmys/grmysGraphic": grmysGraph,
		"/grmys/grmysGraphics": grmysGraphs,
		"/grmys/grmysAmchart": grmysGraphAm,
		"/richpp": Richpp,
		"/richpp/:name/:year": RichmanEdit,
		"/globalGraphic":globalGraphic,
		"/richpp/RichppGraphic": RichmanGraph,
		"/richpp/RichppGraphic1": RichmanGraph1,
        "/richpp/RichppGraphic2": RichmanGraph2,
		"*":NotFound
    };
</script>

<main>
	<Router {routes}> </Router>
</main>