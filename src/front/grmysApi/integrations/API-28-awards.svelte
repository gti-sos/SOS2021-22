<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  import { pop } from "svelte-spa-router";
    const BASE_CONTACT_API_PATH = "/api/v2";
    let pData = [];
    let pChartData = [];
    let grmysData=[];
    let grmysName=[];
    let award=[];
    let countryWinnerData = [];
    let awardData = [];
    let winnerData = []
    let yearData = [];
    let galaData = [];
    let nPlatformData = [];
    let nAwardData = [];
  

  let errorMsg = "";
  let okMsg = "";
  function distinctRecords(MYJSON, prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  async function loadChart() {
    console.log("Fetching data...");
    const res = await fetch("proxyHeroku/api/v1/awards");
    const res1 = await fetch(BASE_CONTACT_API_PATH+`/grmys`);
    
      if (res.ok) {
        pData = await res.json();
        pData.forEach(stat => {
        countryWinnerData.push(stat.country +"-"+stat.winner);
        //platChartData.push(stat.platform);
        galaData.push(stat.gala)
        yearData.push(stat.year);
        nPlatformData.push(stat["n-platform"]);
        nAwardData.push(stat["n-award"]);
        
        });
      }else{
        console.log("Error loading temperature");
      }if(res1.ok){
          grmysData = await res1.json();
          console.log(JSON.stringify(grmysData, null, 2))
          grmysData.forEach(data => {
            countryWinnerData.push(data.country + "-" + data.name);
              grmysName.push(data.name);
              nAwardData.push(parseInt(data.award));
          });
      }else{
          console.log("Error loading temperature");
      }
      console.log("awards Chart DaTa: " + pChartData);
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
              categories: countryWinnerData
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },
          series: [{
              name: 'premios award',
              data: nAwardData
          },
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
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadChart}></script>
</svelte:head>
<main>
  <div>
    <h2>Integracion api-28 </h2>
  </div>

  <div>
    {#if errorMsg}
      <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
      <p class="msgGreen" style="color: #155724">{okMsg}</p>
    {/if}
  </div>

  <div>
    <figure class="highcharts-figure">
      <div id="container" />
      <p class="highcharts-description">
        Gráfico de líneas básico que muestra los diferentes valores para los campos de awards.
      </p>
      <Button outline color="secondary" on:click={pop}>
        <i class="fas fa-arrow-circle-left" /> Volver
    </Button>
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
</style>
