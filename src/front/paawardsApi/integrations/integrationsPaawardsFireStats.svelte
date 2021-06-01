<script>
    //https://www.anychart.com/products/anychart/gallery/3D_Column_Charts/Multi-Series_3D_Column_Chart.php
    import { onMount } from "svelte";
    import {Nav,NavItem,NavLink} from "sveltestrap";
    import {} from "anychart";
    let BASE_API_URL_PAAWARDS = "/api/v1";

    let paisesFireStats = ['Brazil','United States'];
    let paisesPaawards = ['Brasil','EE.UU']
    let Incendios = ['Incendios'];
    let EspeciesVegetales = ['Especies Vegetales Afectadas'];
    let PremiosPA = ['Premios Princesa de Asturias'];

    anychart.onDocumentReady(async function () {
        for (var i=0; i<paisesFireStats.length; i++){
            const res1 = await fetch(`https://sos2021-21.herokuapp.com/api/v2/fire-stats?country=${paisesFireStats[i]}`);
            if (res1.ok) {
                const json1 = await res1.json();
                var suma1 = 0;
                var suma2 = 0;
                json1.forEach((f) => {
                    console.log(f)
                    var fire = parseInt(f.fire_nfc);
                    var vegetales = parseInt(f.fire_nvs);
                    suma1=suma1+fire;
                    suma2=suma2+vegetales;
                });
                Incendios.push(suma1);
                EspeciesVegetales.push(suma2);
            } 
            else {
                Incendios.push(0);
            }
        }
        for (var j=0; j<paisesPaawards.length; j++){
            
            const res2 = await fetch(BASE_API_URL_PAAWARDS + `/paawards?country=${paisesPaawards[j]}`);
            if (res2.ok) {
                const json2 = await res2.json();
                var suma2 = 0;
                json2.forEach((p) => {
                    var trofeo = parseInt(p.trophy);
                    suma2=suma2+trofeo;
                });
                PremiosPA.push(suma2);
            } 
            else {
                PremiosPA.push(0);
            }
        }
      console.log(Incendios);
      console.log(PremiosPA);
      var chartData = {
        title: 'Incendios, Especies Vegetales Afectadas y Premios Princesa de Asturias en Estados Unidos y Brasil',
        header: ['#', 'Brasil', 'Estados Unidos'],
        rows: [
          Incendios,
          EspeciesVegetales,
          PremiosPA
        ]
      };

      // create column chart
      var chart = anychart.column3d();

      // set chart data
      chart.data(chartData);

      // turn on chart animation
      chart.animation(true);

      // set axes settings
      chart.yAxis().title('Total');
      chart.yAxis().labels().format('{%Value}{groupsSeparator: }');

      // set labels settings
      chart
        .labels()
        .enabled(true)
        .fontColor('#60727b')
        .position('center-top')
        .anchor('center-bottom')
        .format('${%Value}{groupsSeparator: }');
      chart.hovered().labels(false);

      // turn on legend
      chart.legend().enabled(true).fontSize(13).padding([0, 0, 20, 0]);

      // set interactivity settings
      chart.interactivity().hoverMode('single');

      // set tooltip settings
      chart
        .tooltip()
        .positionMode('point')
        .position('center-top')
        .anchor('center-bottom')
        .offsetX(0)
        .offsetY(5)
        .format('{%SeriesName}: ${%Value}{groupsSeparator: }');

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
    <script src="https://cdn.anychart.com/releases/v8/js/anychart-cartesian-3d.min.js"></script>
</svelte:head>

<main>
    <div id="container"></div>
</main>

<style>
    html,
    body,
    #container {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
</style>