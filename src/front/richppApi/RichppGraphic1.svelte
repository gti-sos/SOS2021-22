<script>
    import { onMount } from "svelte";
    import { Nav, NavItem, NavLink } from "sveltestrap";
    let BASE_API_PATH = "/api/v2";

    async function loadGraph() {
        let listName = [];
        const data = await fetch(BASE_API_PATH + "/richpp");
        const richpp = await data.json();
        richpp.forEach((x) => {
            if (!listName.includes(x.name)) {
                listName.push(x.name);
            }
        });

        let dataBillGates = [];
        let dataWarren = [];
        let dataAmancio = [];
        let dataJeffBezos = [];
        let dataBernard = [];

        let billGates = "Bill Gates";
        let warren = "Warren Buffett";
        let amancioOrtega = "Amancio Ortega";
        let jeffBezos = "Jeff Bezos";
        let bernard = "Bernard Arnault";
        for (var name of listName) {
            for (var year = 2016; year < 2021; year++) {
                const res2 = await fetch(
                    BASE_API_PATH + `/richpp?name=${name}&year=${year}`
                );
                if (res2.ok) {
                    const richpp2 = await res2.json();
                    if (richpp2 != null) {
                        richpp2.forEach((r) => {
                            if (r.name == billGates) {
                                dataBillGates.push(parseFloat(r.fortune));
                            } else if (r.name == warren) {
                                dataWarren.push(parseFloat(r.fortune));
                            } else if (r.name == amancioOrtega) {
                                dataAmancio.push(parseFloat(r.fortune));
                            } else if (r.name == jeffBezos) {
                                dataJeffBezos.push(parseFloat(r.fortune));
                            } else if (r.name == bernard) {
                                dataBernard.push(parseFloat(r.fortune));
                            }
                        });
                    }
                } else {
                    if (name == billGates) {
                        dataBillGates.push(0);
                    } else if (name == warren) {
                        dataWarren.push(0);
                    } else if (name == amancioOrtega) {
                        dataAmancio.push(0);
                    } else if (name == jeffBezos) {
                        dataJeffBezos.push(0);
                    } else if (name == bernard) {
                        dataBernard.push(0);
                    }
                }
            }
        }

        console.log("Datos de Bill Gates: ", dataBillGates);
        console.log("Datos de Warren Buffett: ", dataWarren);
        console.log("Datos de Amancio Ortega: ", dataAmancio);
        console.log("Datos de Jeff Bezos: ", dataJeffBezos);
        console.log("Datos de Bernard Arnault: ", dataBernard);

        Highcharts.chart("container", {
            chart: {
                type: "area",
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
                    text: "Años de 2016 a 2020",
                },
                accessibility: {
                    rangeDescription: "Range: 2016 to 2020",
                },
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false,
                    },
                    pointStart: 2016,
                },
            },
            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
            },
            series: [
                {
                    name: "Bill Gates",
                    data: dataBillGates,
                },
                {
                    name: "Warren Buffett",
                    data: dataWarren,
                },
                {
                    name: "Amancio Ortega",
                    data: dataAmancio,
                },
                {
                    name: "Jeff Bezos",
                    data: dataJeffBezos,
                },
                {
                    name: "Bernard Arnault",
                    data: dataBernard,
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
    <div>
        <figure class="highcharts-figure">
            <div id="container" />
            <p class="highcharts-description">
                Gráfico que representa el top 3 de los hombre más ricos del
                mundo desde 2016 junto con la edad que tienen cada año y su
                fortuna.
            </p>
        </figure>
    </div>
</main>

<style>
    .highcharts-figure {
        min-width: 360px;
        max-width: 800px;
        margin: 1em auto;
    }
</style>
