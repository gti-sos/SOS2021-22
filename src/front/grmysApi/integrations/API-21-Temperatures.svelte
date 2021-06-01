<script>
  import {
      onMount
  } from "svelte";

  /*let grmysData=[];
  let award=[];*/
  let temperatureData = [];
  let ejeX = [];
  let temperature_min = [];
  let temperature_max = [];
  let temperature_co2 = [];
  let BASE_API_URL = "/api/v2";

  async function loadGraph(){  
      const res = await fetch(`https://sos2021-21.herokuapp.com/api/v2/temperature-stats`);
      //const res1 = await fetch(BASE_API_URL+`/grmys`);
      if(res.ok){
          temperatureData = await res.json();
          console.log(JSON.stringify(temperatureData, null, 2))
          temperatureData.forEach(data => {
              ejeX.push(data.country + "-" + data.year);
              
              temperature_min.push(data["temperature_min"]);
              temperature_max.push(data["temperature_max"]);
              temperature_co2.push(data["temperature_co2"]);
          });
      }else{
          console.log("Error loading temperature");
      }
      /*if(res.ok){
          grmysData = await res.json();
          console.log(JSON.stringify(grmysData, null, 2))
          grmysData.forEach(data => {
              ejeX.push(data.country + "-" + data.year);
              console.log(data.country + "-" + data.year);
              award.push(data["award"]);
          });
      }else{
          console.log("Error loading temperature");
      }*/
      Highcharts.chart('container', {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Gráfico de temperaturas'
          },
          yAxis: {
              title: {
                  text: ''
              }
          },
          xAxis: {
              title: {
                  text: 'País-Año'
              },
              categories: ejeX
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },
          series: [{
              name: 'Temperatura mínima',
              data: temperature_min
          },
          {
              name: 'Temperatura máxima',
              data: temperature_max
          },
          {
              name: 'Temperatura del co2',
              data: temperature_co2
          
          }],
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
  <h2>Integracion api-21 </h2>
  <figure class="highcharts-figure">
      <div id="container" />
      <p class="highcharts-description">
          <i>
              En esta simple gráfica de lineas podemos observar los datos de
              Tabaquismo en los países de Europa en el año 2017.</i
          >
      </p>
  </figure>

</main>
<style>
    
  h2 {
  color: #ff9900;
  text-align: center;
  text-transform: uppercase;
  font-size: 4em;
  font-weight: 100;
}
</style>