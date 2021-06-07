<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    import {Nav,NavItem,NavLink} from "sveltestrap";
    async function loadGraph(){

        let grmysData = [];
        let grmysGraph = [];
        let BASE_API_URL_GRMYS = "/api/v2";
        
        const data = await fetch(BASE_API_URL_GRMYS + "/grmys");
        grmysData = await data.json();
        grmysData.forEach( (x) => {
            grmysGraph.push({name: x.name + " " + x.year, data: [parseInt(x.ranking), parseInt(x.award)], pointPlacement: 'on'});
        });

        Highcharts.chart('container', {
            chart: {
		        type: 'bar'
		    },

            title: {
                text: 'premios Gramys de toda la historia'
            },

            subtitle: {
                text: ''
            },

            yAxis: {
                title: {
                    text: 'ranking / premios'
                }

            },

            xAxis: {
                categories: [
                    'ranking',
                    'premios'
                ]
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    }
                }
            },

            series: grmysGraph,

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }
    onMount(loadGraph);

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <Nav>
        <NavItem>
            <NavLink id="nav-back" href="/#/grmys/grmysGraphics">Volver</NavLink>
        </NavItem>
    </Nav>
    <h2>grmys Grafica</h2>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Grafico que representa los ganadores de los Premios Gramys en toda la historia de este prestigioso trofeo de musica
        </p>
    </figure>
    
</main>

<style>
    
    h2 {
    color: #ff9900;
    text-align: center;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>