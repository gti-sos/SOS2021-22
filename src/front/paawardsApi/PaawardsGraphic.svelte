<script>
    import { onMount } from "svelte";

    async function loadGraph(){

        let paawardsData = [];
        let paawardsGraph = [];
        let BASE_API_URL_PAAWARDS = "/api/v1";
        
        const data = await fetch(BASE_API_URL_PAAWARDS + "/paawards?offset=0&limit=10");
        paawardsData = await data.json();
        paawardsData.forEach( (x) => {
            paawardsGraph.push({name: x.name + " " + x.year, data: [parseInt(x.age), parseInt(x.trophy)], pointPlacement: 'on'});
        });

        Highcharts.chart('container', {
            title: {
                text: 'Premios Princesa de Asturias 2000-2020'
            },

            subtitle: {
                text: ''
            },

            yAxis: {
                title: {
                    text: 'Edad / Trofeos'
                }

            },

            xAxis: {
                categories: [
                    'Edad',
                    'Trofeos'
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

            series: paawardsGraph,

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
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Grafico que representa los ganadores de los Premios Princesa de Asturias desde el año 2000
            junto a la edad con la que ganaron el premio y al número de trofeos que ha ganado a lo largo 
            de su carrera
        </p>
    </figure>
</main>

<style>
    .highcharts-figure, .highcharts-data-table table {
        min-width: 360px; 
        max-width: 800px;
        margin: 1em auto;
    }

    .highcharts-data-table table {
    	font-family: Verdana, sans-serif;
    	border-collapse: collapse;
    	border: 1px solid #EBEBEB;
    	margin: 10px auto;
    	text-align: center;
    	width: 100%;
    	max-width: 500px;
    }
    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }
    .highcharts-data-table th {
    	font-weight: 600;
        padding: 0.5em;
    }
    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }

</style>