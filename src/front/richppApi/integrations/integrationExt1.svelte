<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    let listData = [];
    let resultado = [];

    async function load() {
        const data = await fetch(
            "https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics?fixture=215662&team=463",
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                    "x-rapidapi-key":
                        "f980ac1b7dmsh485ce13dfbad110p176198jsn17cc80a64b23",
                },
            }
        );

        let res = await data.json();
        resultado = res.response;

        resultado.forEach((r) => {
            let shots = r.statistics;
            shots.forEach((s) => {
                if (parseInt(s.value) >= 1) {
                    listData.push({ name: s.type, value: parseInt(s.value) });
                }
            });
        });
        console.log(listData);

        var graphdef = {
            categories: ["Estadisticas"],
            dataset: {
                Estadisticas: listData,
            },
        };
        var config = {
            graph: {
                orientation: "Vertical",
            },

            meta: {
                position: "#uv-div",
                caption: "",
                hlabel: "",
                vlabel: "",
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

        var chart = uv.chart("Donut", graphdef, config);
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
        <a href="https://rapidapi.com/api-sports/api/api-football">
            API-FOOTBALL
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
