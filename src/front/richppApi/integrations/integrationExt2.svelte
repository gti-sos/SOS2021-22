<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    let listData = [];
    let resultado = [];

    async function load() {
        const data = await fetch(
            "https://covid-193.p.rapidapi.com/statistics",
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key":
                        "f980ac1b7dmsh485ce13dfbad110p176198jsn17cc80a64b23",
                },
            }
        );

        let res = await data.json();
        resultado = res.response;

        resultado.forEach((r) => {
            if (r.continent == "Europe" && r.country == "Spain") {
                listData.push({
                    name: r.country,
                    value: parseInt(r.cases.total),
                });
            } else if (r.continent == "Europe" && r.country == "France") {
                listData.push({
                    name: r.country,
                    value: parseInt(r.cases.total),
                });
            } else if (r.continent == "Europe" && r.country == "Portugal") {
                listData.push({
                    name: r.country,
                    value: parseInt(r.cases.total),
                });
            } else if (r.continent == "Europe" && r.country == "Germany") {
                listData.push({
                    name: r.country,
                    value: parseInt(r.cases.total),
                });
            } else if (r.continent == "Europe" && r.country == "Italy") {
                listData.push({
                    name: r.country,
                    value: parseInt(r.cases.total),
                });
            }
        });
        console.log(listData);

        var graphdef = {
            categories: ["CasosTotales"],
            dataset: {
                CasosTotales: listData,
            },
        };
        var config = {
            graph: {
                orientation: "Horizontal",
            },

            meta: {
                position: "#uv-div",
                caption: "",
                hlabel: "Paises",
                vlabel: "Casos totales de contagios",
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
            effects: {
                hovercolor: "#FF0000",
                strokecolor: "none",
                textcolor: "#000000",
                duration: 800,
                hover: 400,
                showhovertext: false,
            },
        };

        var chart = uv.chart("Bar", graphdef, config);
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
            <NavLink id="nav-back" href="/#/integrations">Volver</NavLink>
        </NavItem>
    </Nav>

    <h2>
        API EXTERNA
        <a href="https://rapidapi.com/api-sports/api/covid-193">
            API-COVID-19
        </a>
    </h2>
    <div>
        <figure class="uv-figure">
            <div id="uv-div" />
        </figure>
    </div>
</main>

<style>
    h2 {
        color: #ff9900;
        text-align: center;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
    .uv-figure {
        min-width: 360px;
        max-width: 800px;
        margin: 1em auto;
    }
</style>
