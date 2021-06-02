<script>
    import { onMount } from "svelte";
    import { Nav, NavItem, NavLink } from "sveltestrap";
    let BASE_API_PATH = "/api/v2";

    async function load() {
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
                                    value: parseFloat(r.fortune),
                                });
                            } else if (r.name == warren) {
                                dataWarren.push({
                                    name: r.year,
                                    value: parseFloat(r.fortune),
                                });
                            } else if (r.name == amancioOrtega) {
                                dataAmancio.push({
                                    name: r.year,
                                    value: parseFloat(r.fortune),
                                });
                            } else if (r.name == jeffBezos) {
                                dataJeffBezos.push({
                                    name: r.year,
                                    value: parseFloat(r.fortune),
                                });
                            } else if (r.name == bernard) {
                                dataBernard.push({
                                    name: r.year,
                                    value: parseFloat(r.fortune),
                                });
                            }
                        });
                    }
                } else {
                    if (name == billGates) {
                        dataBillGates.push({
                            name: year.toString(),
                            value: 0,
                        });
                    } else if (name == warren) {
                        dataWarren.push({
                            name: year.toString(),
                            value: 0,
                        });
                    } else if (name == amancioOrtega) {
                        dataAmancio.push({
                            name: year.toString(),
                            value: 0,
                        });
                    } else if (name == jeffBezos) {
                        dataJeffBezos.push({
                            name: year.toString(),
                            value: 0,
                        });
                    } else if (name == bernard) {
                        dataBernard.push({
                            name: year.toString(),
                            value: 0,
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
            categories: [
                "billGates",
                "warren",
                "amancioOrtega",
                "jeffBezos",
                "bernard",
            ],
            dataset: {
                billGates: dataBillGates,
                warren: dataWarren,
                amancioOrtega: dataAmancio,
                jeffBezos: dataJeffBezos,
                bernard: dataBernard,
            },
        };

        var config = {
            graph: {
                orientation: "Vertical",
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

        var chart = uv.chart("Line", graphdef, config);
    }
</script>

<svelte:head>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"></script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/uvCharts/1.1.5/uvcharts.min.js"
        on:load={load}></script>
</svelte:head>

<main>
    <Nav>
        <NavItem>
            <NavLink color="secondary" href="/#/richpp">Volver</NavLink>
        </NavItem>
    </Nav>

    <div>
        <figure class="uv-figure">
            <div id="uv-div" />
            <p>
                Gráfico que representa el top 3 de los hombre más ricos del
                mundo desde 2016 junto con la edad que tienen cada año y su
                fortuna.
            </p>
        </figure>
    </div>
</main>

<style>
    .uv-figure {
        min-width: 360px;
        max-width: 800px;
        margin: 1em auto;
    }
</style>
