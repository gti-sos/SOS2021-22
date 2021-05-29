<script>
    import { onMount } from "svelte";
    import { Nav, NavItem, NavLink } from "sveltestrap";
    let BASE_API_PATH = "/api/v2";

    async function loadGraph() {
        let richppGraph = [];
        let listYear = [];

        for (var year = 2016; year < 2021; year++) {
            const res2 = await fetch(BASE_API_PATH + `/richpp?year=${year}`);
            if (res2.ok) {
                const richpp2 = await res2.json();
                if (richpp2 != null) {
                    richpp2.forEach((r) => {
                        listYear.push(r.year);
                        richppGraph.push({
                            name: r.name + " " + r.year,
                            data: [parseInt(r.fortune)],
                        });
                    });
                }
            }
        }

        console.log(richppGraph);
        console.log(listYear);

        Highcharts.chart("container", {
            chart: {
                type: "bar",
            },
            title: {
                text: "",
            },

            yAxis: {
                title: {
                    text: "Fortuna (billones de dolares)",
                },
            },

            xAxis: {
                title: {
                    text: "Año",
                },
                categories: listYear
            },

            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
            },

            series: richppGraph,

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
            desde 2016 junto con la edad que tienen cada año y su fortuna.
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
