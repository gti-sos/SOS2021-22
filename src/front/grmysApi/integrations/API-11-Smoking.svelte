<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    async function loadGraph() {
        let SmokingData = [];
        let SmokingDataGraph = [];
        const resData = await fetch("https://sos2021-11.herokuapp.com/api/v2/smoking_stats");
        SmokingData = await resData
        console.log(SmokingData);
        SmokingData.forEach((x) => {
            SmokingDataGraph.push({
                name: x.country + " " + x.year,
                data: [
                    "",
                    parseInt(x.smoking_men),
                    parseInt(x.smoking_women),
                    parseInt(x.smoking_population),
                    "",
                ],
                pointPlacement: "on",
            });
        });
        Highcharts.chart("container", {
            chart: {
                type: "bar",
            },
            title: {
                text: "Datos de Tabaquismo",
            },
            xAxis: {
                categories: [
                    "",
                    "Datos de Tabaquismo de Hombre (radio/media)",
                    "Datos de Tabaquismo de Mujer (radio/media)",
                    "Datos de Tabaquismo de Poblacion (radio/media)",
                    "",
                ],
                title: {
                    text: null,
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: "miles",
                    align: "high",
                },
                labels: {
                    overflow: "justify",
                },
            },
            tooltip: {
                // valueSuffix: ' miles'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                    },
                },
            },
            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "top",
                x: -40,
                y: 80,
                floating: false,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor ||
                    "#FFFFFF",
                shadow: true,
            },
            credits: {
                enabled: false,
            },
            series: SmokingDataGraph,
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            <i>
                En esta simple gráfica de lineas podemos observar los datos de
                Tabaquismo en los países de Europa en el año 2017.</i
            >
        </p>
    </figure>
    <Button outline color="secondary" on:click={pop}>
        <i class="fas fa-arrow-circle-left" /> Volver
    </Button>
</main>

<style>
    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 310px;
        max-width: 1000px;
        margin: 1em auto;
    }
    #container {
        height: 600px;
    }
    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #ebebeb;
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
    .highcharts-data-table td,
    .highcharts-data-table th,
    .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr,
    .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }
</style>