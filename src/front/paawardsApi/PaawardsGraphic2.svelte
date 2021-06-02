<script>
    //https://www.anychart.com/products/anychart/gallery/Pie_and_Donut_Charts/Donut_Chart.php

    import {Nav,NavItem,NavLink} from "sveltestrap";
    let BASE_API_URL_PAAWARDS = "/api/v1";
    let country = [];
    
    anychart.onDocumentReady(async function () {
        //Obtenemos paises
        let paawards = [];
        const data = await fetch(BASE_API_URL_PAAWARDS + "/paawards");
        paawards = await data.json();
        paawards.forEach((x) => {
            if (!country.includes(x.country)){
                country.push(x.country);
            }
        });

        var paisesGrafico = [];
        for (const c of country){
            const res = await fetch(BASE_API_URL_PAAWARDS + `/paawards?country=${c}`);
            var array = [];
            if (res.ok) {
                const json = await res.json();
                var suma = 0;
                json.forEach((p) => {
                    var trofeos = parseInt(p.trophy);
                    suma=suma+trofeos;
                });
                array.push(`${c}`);
                array.push(suma);
            } 
            else {
                array.push(`${c}`);
                array.push(0);
            }
            paisesGrafico.push(array);
        }
      // create pie chart with passed data
      var chart = anychart.pie(paisesGrafico);

      // set chart title text settings
      chart
        .title('Gráfico que representa los paises que tienen más Premios Princesa de Asturias')
        // set chart radius
        .radius('43%')
        // create empty area in pie chart
        .innerRadius('30%');

      // set container id for the chart
      chart.container('container');
      // initiate chart drawing
      chart.draw();
    });
</script>

<svelte:head>
    <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js"></script>
    <script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js"></script>
    <script src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js"></script>
    <link href="https://cdn.anychart.com/releases/v8/css/anychart-ui.min.css" type="text/css" rel="stylesheet">
    <link href="https://cdn.anychart.com/releases/v8/fonts/css/anychart-font.min.css" type="text/css" rel="stylesheet">
</svelte:head>

<main>
    <NavItem>
        <NavLink href="/#/paawards">Volver</NavLink>
    </NavItem>
    <div id="container"></div>
</main>

<style>
    #container {
      width: 100%;
      height: 500px;
      margin: 0;
      padding: 0;
    }
</style>