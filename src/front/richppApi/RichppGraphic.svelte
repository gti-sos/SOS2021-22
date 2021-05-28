<script>
    import { onMount } from "svelte";
    import { Nav, NavItem, NavLink } from "sveltestrap";
    let BASE_API_PATH = "/api/v2";

    async function loadGraph() {
        let richppGraph = [];
        let listName = [];
        let fortuna = 0;
        let nombre = null;

        const res = await fetch(BASE_API_PATH + `/richpp`);
        const richpp = await res.json();
        richpp.forEach((r) => {
            if (!listName.includes(r.name)) {
                listName.push(r.name);
            }
        });
        for (var name of listName) {
            for (var year = 2016; year < 2021; year++) {
                const res2 = await fetch(
                    BASE_API_PATH + `/richpp?name=${name}&year=${year}`
                );
                if (res2.ok) {
                    const richpp2 = await res2.json();
                    if (richpp2 != null) {
                        richpp2.forEach((r) => {
                            fortuna = parseInt(r.fortune);
                            if (fortuna != null) {
                                richppGraph.push(fortuna);
                            }
                        });
                    }
                }
            }
        }

        console.log(richppGraph);

        Highcharts.chart("container", {
            title: {
                text: "Top3 hombres más ricos del mundo, 2016-2020",
            },

            subtitle: {
                text: "",
            },

            yAxis: {
                title: {
                    text: "Fortuna (billones de dolares)",
                },
            },

            xAxis: {
                accessibility: {
                    rangeDescription: "Rango: 2016 a 2020",
                },
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
            series: [
                {
                    name: "Hombres más ricos",
                    data: richppGraph,
                },
            ],

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
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <Nav>
        <NavItem>
            <NavLink color="secondary" href="/#/richpp">Volver</NavLink>
        </NavItem>
    </Nav>

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
