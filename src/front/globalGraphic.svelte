<script>
    import { onMount } from "svelte";
    import {Nav,NavItem,NavLink} from "sveltestrap";
    let BASE_API_URL = "/api/v2";
    let BASE_API_URL_PAAWARDS = "/api/v1";

    async function loadGraph(){
        let paawardsGraph = [];
        let richppGraph = [];
        let grmysGraph=[];
        var edad1 = 0;
        for (var año=2016; año<2021; año++){
            const res1 = await fetch(BASE_API_URL_PAAWARDS + `/paawards?year=${año}`);
            const res2 = await fetch(BASE_API_URL+`/richpp?year=${año}&top=1`);
            const res3 = await fetch(BASE_API_URL+`/grmys?year=${año}`);
            //PAAWARDS
            if (res1.ok) {
                const json1 = await res1.json();
                var cont = 0;
                var suma = 0.0;
                json1.forEach((p) => {
                    var edad = parseInt(p.age);
                    suma=suma+edad;
                    cont=cont+1;
                });
                var resultado1 = suma/cont;
                paawardsGraph.push(resultado1);
            } 
            else {
                paawardsGraph.push(0);
            }
            //RICHPP
            if (res2.ok) {
                const json2 = await res2.json();
                json2.forEach((r) => {
                    edad1 = parseInt(r.age);
                });
                richppGraph.push(edad1);
            } 
            else {
                richppGraph.push(0);
            }
            if (res3.ok) {
                const json3 = await res3.json();
                var cont = 0;
                var suma = 0.0;
                json1.forEach((p) => {
                    var edad = parseInt(p.year);
                    suma=suma+edad;
                    cont=cont+1;
                });
                var resultado1 = suma/cont;
                grmysGraph.push(resultado1);
                
            } 
            else {
                grmysGraph.push(0);
            }
        }
    
        Highcharts.chart('container', {
            title: {
                text: 'Analítica Común'
            },

            subtitle: {
                text: ''
            },

            yAxis: {
                title: {
                    text: ''
                }

            },

            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 2016 to 2020'
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
                    pointStart: 2016
                }
            },
            series: [
                        {
                          name: "Edad Ganador Premio Princesa Asturias",
                          data: paawardsGraph,
                        },
                        {
                          name: "Edad Top 1 en Fortuna",
                          data: richppGraph,
                        },
                        {
                          name: "año de fundacion",
                          data: grmysGraph,
                        }
            ],

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
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <Nav>
        <NavItem>
            <NavLink href="/#/info">Volver</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/#/paawards">Cargar Datos API Premios Princesa Asturias</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/#/richpp">Cargar Datos API Hombres más ricos del mundo</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/#/grmys">Cargar Datos API Premios Gramys</NavLink>
        </NavItem>
    </Nav>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Grafico que representa la edad de los ganadores de los Premios Princesa de Asturias,
            la edad de la persona con mayor fortuna en el mundo,
            desde el año 2016 hasta 2020.
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