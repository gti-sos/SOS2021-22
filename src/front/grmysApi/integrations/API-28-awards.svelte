<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_CONTACT_API_PATH = "/api/v2";
    let pData = [];
    let pChartData = [];
    
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
    pData = await res.json();
      if (res.ok) {
        pData.forEach(stat => {
        countryWinnerData.push(stat.country +"-"+stat.winner);
        //platChartData.push(stat.platform);
        galaData.push(stat.gala)
        yearData.push(stat.year);
        nPlatformData.push(stat["n-platform"]);
        nAwardData.push(stat["n-award"]);
        
        });
      }
      console.log("awards Chart DaTa: " + pChartData);
      var colors = Highcharts.getOptions().colors;
      Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'valores de la Api awards'
    },
    
    xAxis: {
        categories: countryWinnerData,
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'valores',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Año',
        data: yearData
        
    }, {
        name: 'Gala',
        data: galaData
    }, {
        name: 'Numero de plataformas',
        data: nPlatformData
    }, {
        name: 'Numero de premios',
        data: nAwardData
    }]
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
