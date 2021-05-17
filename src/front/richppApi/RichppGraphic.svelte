<script>
    import { onMount } from "svelte";

    async function loadGraph() {
        let richppData = [];
        let richppGraph = [];
        let BASE_API_PATH = "/api/v1";

        const data = await fetch(BASE_API_PATH + "/richpp?offset=0&limit=10");
        richppData = await data.json();
        richppData.forEach((richman) => {
            richppGraph.push({
                name: richman.name + " " + richman.year,
                data: [richman.fortune, richman.age],
                pointPlacement: "on",
            });
        });

        Highcharts.chart("container", {
            title: {
                text: "Top3 hombres más ricos del mundo, 2016-2020",
            },

            subtitle: {
                text: "",
            },

            yAxis: {
                title: {
                    text: "Fortuna en billones de dolares",
                },
            },

            xAxis: {
                /*accessibility: {
                    rangeDescription: "Rango: 2016 a 2020",
                },*/
                categories: ["Fortuna", "Edad"],
            },

            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false,
                    },
                    pointStart: 2016,
                },
            },
            series: richppGraph,
            /*
            series: [
                {
                    name: "Amancio Ortega",
                    data: [67, null, null, null, null],
                },
                {
                    name: "Jeff Bezos",
                    data: [null, 72.8, 112, 131, 113],
                },
                {
                    name: "Bill Gates",
                    data: [75, 86, 90, 96.5, 98],
                },
                {
                    name: "Warren Buffett",
                    data: [60.8, 75.6, 84, 82.5, null],
                },
                {
                    name: "Bernard Arnault",
                    data: [null, null, null, null, 76],
                },
            ],
*/
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            legend: {
                                layout: "horizontal",
                                align: "center",
                                verticalAlign: "bottom",
                            },
                        },
                    },
                ],
            },
        });
    }

    onMount(loadGraph);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}>
    </script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            Gráfico que representa el top 3 de los hombre más ricos del mundo
            desde 2016 a 2020 junto con la edad que tienen cada año y su
            fortuna.
        </p>
    </figure>
</main>

<style>
    .highcharts-figure {
        min-width: 360px;
        max-width: 800px;
        margin: 1em auto;
    }
</style>
