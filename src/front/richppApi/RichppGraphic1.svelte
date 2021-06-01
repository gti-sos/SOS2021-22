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
                                dataBillGates.push({
                                    name: r.year,
                                    data: parseFloat(r.fortune),
                                });
                            } else if (r.name == warren) {
                                dataWarren.push({
                                    name: r.year,
                                    data: parseFloat(r.fortune),
                                });
                            } else if (r.name == amancioOrtega) {
                                dataAmancio.push({
                                    name: r.year,
                                    data: parseFloat(r.fortune),
                                });
                            } else if (r.name == jeffBezos) {
                                dataJeffBezos.push({
                                    name: r.year,
                                    data: parseFloat(r.fortune),
                                });
                            } else if (r.name == bernard) {
                                dataBernard.push({
                                    name: r.year,
                                    data: parseFloat(r.fortune),
                                });
                            }
                        });
                    }
                }
            }
        }

        console.log("Datos de Bill Gates: ", dataBillGates);
        console.log("Datos de Warren Buffett: ", dataWarren);
        console.log("Datos de Amancio Ortega: ", dataAmancio);
        console.log("Datos de Jeff Bezos: ", dataJeffBezos);
        console.log("Datos de Bernard Arnault: ", dataBernard);

        var graphdef = {
            categories: [billGates, warren, amancioOrtega, jeffBezos, bernard],
            dataset: {
                billGates: [dataBillGates],
                warren: [dataWarren],
                amancioOrtega: [dataAmancio],
                jeffBezos: [dataJeffBezos],
                bernard: [dataBernard],
            },
        };

        var config = {
            graph: {
                orientation: "Vertical",
                custompalette: [
                    "#A1A4A5",
                    "#C80F98",
                    "#5F0DCF",
                    "#C80F90",
                    "#5F0DCB",
                ],
            },

            meta: {
                position: "#uv-div",
                caption: "Hombre más ricos del mundo entre 2016 y 2020",
                hlabel: "Años",
                vlabel: "Fortuna en billones de dolares",
            },
            /*
            legend: {
                position: "right",
            },
            dimension: {
                width: "120",
                height: "120",
            },*/
            scale: {
                type: "linear",
                ordinality: "0.1",
            },
        };

        var charObject = uv.chart("StackedBar", graphdef, config);
    }
</script>

<svelte:head>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"></script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/uvCharts/1.1.5/uvcharts.min.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <Nav>
        <NavItem>
            <NavLink color="secondary" href="/#/richpp">Volver</NavLink>
        </NavItem>
    </Nav>

    <figure class="uv-figure">
        <div id="uv-div" />
        <p>
            Gráfico que representa el top 3 de los hombre más ricos del mundo
            desde 2016 junto con la edad que tienen cada año y su fortuna.
        </p>
    </figure>
</main>

<style>
    .uv-figure {
        min-width: 360px;
        max-width: 800px;
        margin: 1em auto;
    }
</style>
