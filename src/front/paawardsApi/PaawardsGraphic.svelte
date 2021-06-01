<script>
    
    import { onMount } from "svelte";
    import {Nav,NavItem,NavLink} from "sveltestrap";
    let BASE_API_URL_PAAWARDS = "/api/v1";

    //Obtenemos los paises
    let country = [];
    async function getCountry(){
        let paawards = [];
        
        const data = await fetch(BASE_API_URL_PAAWARDS + "/paawards");
        paawards = await data.json();
        paawards.forEach((x) => {
            if (!country.includes(x.country)){
                country.push(x.country);
            }
        });
        console.log(country);
        loadGraph();
    }

    async function loadGraph(){
        let paawardsGraph = [];
        for (const c of country){
            let arrayAños = [];
            for (var año=2000; año<2021; año++){
                const res = await fetch(BASE_API_URL_PAAWARDS + `/paawards?country=${c}&year=${año}`);
                if (res.ok) {
                    const json = await res.json();
                    var suma = 0;
                    json.forEach((p) => {
                        var trofeos = parseInt(p.trophy);
                        suma=suma+trofeos;
                    });
                    arrayAños.push(suma);
                } else {
                    arrayAños.push(0);
                }
            }
            paawardsGraph.push({name: c, data: arrayAños, pointPlacement: 'on'});
        }
        Highcharts.chart('container', {
            title: {
                text: 'Premios Princesa de Asturias 2000-2020'
            },

            subtitle: {
                text: ''
            },

            yAxis: {
                title: {
                    text: 'Total de premios'
                }

            },

            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 2000 to 2020'
                }
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
                    },
                    pointStart: 2000
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

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{getCountry}"></script>
</svelte:head>

<main>
    <Nav>
        <NavItem>
            <NavLink href="/#/paawards">Volver</NavLink>
        </NavItem>
    </Nav>

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
    .highcharts-figure {
        min-width: 360px; 
        max-width: 800px;
        margin: 1em auto;
    }
</style>