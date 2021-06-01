<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_CONTACT_API_PATH = "/api/v2";
    let pDataAwards = [];
    let pDataGrmys = [];

    let pChartData = [];
    let countryData = [];
    let nameData = [];
    let yearData = [];
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
    pDataAwards = await res.json();
    
    if (res.ok) {
      pDataAwards.forEach(stat => {
        if (stat.winner in nameData){
            console.log("ya esta almacenado el country" + stat.winner)
        }else{
          nameData.push(stat.winner);
        }
        if (stat.year in yearData){
            console.log("ya esta almacenado el year" + stat.year)
        }else{
            yearData.push(stat.year);
        } 
        nAwardData.push(stat["n-award"]);
      
        });
    }
      const res1 = await fetch(BASE_CONTACT_API_PATH + "/grmys");
      pDataGrmys = await res1.json();
      
      if (res1.ok) {
        pDataGrmys.forEach(stat => {
          if (stat.name in nameData){
            console.log("ya hola")
            console.log("ya esta almacenado el name" + stat.name)
        }else{
          nameData.push(stat.name);
        }
       
        if (stat.year in yearData){
            console.log("ya esta almacenado el year" + stat.year)
        }else{
            yearData.push(stat.year);
        } 
       
        nAwardData.push(stat["award"]);
        });
    }
    
    console.log("awards Chart DaTa: " + pChartData);
    Highcharts.chart("container", {
        chart: {
            type: 'column'
        },
        title: {
          text: "Grafica General",
        },
        yAxis: {
          title: {
            text: "Valor",
          },
        },
        xAxis: {
          title: {
            text: "nombre",
          },
          categories: nameData,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        annotations: [
          {
            labels: [
              {
                point: "date",
                text: "",
              },
              {
                point: "min",
                text: "Min",
                backgroundColor: "white",
              },
            ],
          },
        ],
        series: [
          
          {
            name: "premios",
            data: nAwardData,
          },
          {
            name: "Numero de premios",
            data: nAwardData,
          }
          
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
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