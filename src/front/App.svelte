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
	import integrationsGrmys4 from "./grmysApi/integrations/Api-externa1.svelte";
	import integrationsGrmys5 from "./grmysApi/integrations/Api-Externa2.svelte";
	import NotFound from "./NotFound.svelte";
	import grmys from './grmysApi/grmysApi.svelte';
	import editGrmys from './grmysApi/editGrmys.svelte';
	import grmysGraph from './grmysApi/grmysGraphic.svelte';
	import grmysGraphs from './grmysApi/grmysGraphics.svelte';
	import grmysGraphAm from './grmysApi/grmysAmchart.svelte';
	import paawards from './paawardsApi/paawards-api.svelte';
	import paawardEdit from './paawardsApi/PaawardsEdit.svelte';
	import paawardGraphics from './paawardsApi/PaawardsGraphics.svelte';
	import paawardGraph from './paawardsApi/PaawardsGraphic.svelte';
	import paawardGraph1 from './paawardsApi/PaawardsGraphic1.svelte';
	import paawardGraph2 from './paawardsApi/PaawardsGraphic2.svelte';
	import integrationsPaawards1 from './paawardsApi/integrations/integrationsPaawardsFireStats.svelte';
	import integrationsPaawards2 from './paawardsApi/integrations/integrationsPaawardsPlatforms.svelte';
	import integrationsPaawards3 from './paawardsApi/integrations/integrationsPaawardsRapidApiFootball.svelte';
	import integrationsPaawards4 from './paawardsApi/integrations/integrationsPaawardsRapidApiSeries.svelte';
	import Richpp from './richppApi/Richpp.svelte';
	import RichmanEdit from './richppApi/RichmanEdit.svelte';
	import globalGraphic from './globalGraphic.svelte';
	import RichppGraphics from './richppApi/richppGraphics.svelte';
	import RichmanGraphLine from './richppApi/RichppGraphicLine.svelte';
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
		"/integrations/integrationsPaawardsANDPlatforms":integrationsPaawards2,
		"/integrations/integrationsPaawardsANDFootball":integrationsPaawards3,
		"/integrations/integrationsPaawardsANDSeries":integrationsPaawards4,
		"/integrations/API-11-Smoking":integrationsGrmys1,
		"/integrations/API-21-Temperatures":integrationsGrmys2,
		"/integrations/API-28-awards":integrationsGrmys3,
		"/integrations/Api-externa1":integrationsGrmys4,
		"/integrations/Api-Externa2":integrationsGrmys5,
		"/paawards": paawards,
		"/paawards/:country/:year": paawardEdit,
		"/paawards/paawardsGraphics":paawardGraphics,
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
		"/analytics":globalGraphic,
		"/richpp/richppGraphics": RichppGraphics,
		"/richpp/RichppGraphicLine": RichmanGraphLine,
		"/richpp/RichppGraphic1": RichmanGraph1,
		"/richpp/RichppGraphic2": RichmanGraph2,
		"*":NotFound
    };
</script>

<main>
	<Router {routes}> </Router>
</main>