<script>
  import {
      onMount
  } from "svelte";
  import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
  let grmysData=[];
  let grmysName=[];
  let award=[];
  let temperatureData = [];
  let ejeX = [];
  let temperature_min = [];
  let temperature_max = [];
  let temperature_co2 = [];
  let BASE_API_URL = "/api/v2";

  async function loadGraph(){  
      const res = await fetch(`https://sos2021-21.herokuapp.com/api/v2/temperature-stats`);
     // const res1 = await fetch(BASE_API_URL+`/grmys`);
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
      /*if(res1.ok){
          grmysData = await res1.json();
          console.log(JSON.stringify(grmysData, null, 2))
          grmysData.forEach(data => {
              ejeX.push(data.country + "-" + data.year);
              grmysName.push(data.name);
              award.push(parseInt(data.award));
          });
      }else{
          console.log("Error loading temperature");
      }*/
      am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.RadarChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
chart.innerRadius = am4core.percent(50);
chart.startAngle = -80;
chart.endAngle = 260;

chart.data = temperatureData;

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.labels.template.location = 0.5;
categoryAxis.renderer.grid.template.strokeOpacity = 0.08;
categoryAxis.renderer.tooltipLocation = 0.5;
categoryAxis.tooltip.disabled = true;
categoryAxis.renderer.labels.template.bent = true;
categoryAxis.renderer.labels.template.padding(0,0,0,0);
categoryAxis.renderer.labels.template.radius = 7;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.max = 60;
valueAxis.strictMinMax = true;
valueAxis.renderer.minGridDistance = 30;
valueAxis.renderer.grid.template.strokeOpacity = 0.08;
valueAxis.tooltip.disabled = true;

// axis break
var axisBreak = valueAxis.axisBreaks.create();
axisBreak.startValue = 0;
axisBreak.endValue = 50;
axisBreak.breakSize = 0.02;

// make break expand on hover
var hoverState = axisBreak.states.create("hover");
hoverState.properties.breakSize = 1;
hoverState.properties.opacity = 0.1;
hoverState.transitionDuration = 1500;

axisBreak.defaultState.transitionDuration = 1000;

var series = chart.series.push(new am4charts.RadarColumnSeries());
series.dataFields.categoryX = "country";
series.dataFields.valueY = "temperature_min";
series.columns.template.tooltipText = "{valueY.value}";
series.columns.template.tooltipY = 0;
series.columns.template.strokeOpacity = 0;

chart.seriesContainer.zIndex = -1;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
});

let cursor = new am4charts.RadarCursor();
cursor.innerRadius = am4core.percent(50);
cursor.lineY.disabled = true;

cursor.xAxis = categoryAxis;
chart.cursor = cursor;

}); // end am4core.ready()
}
loadGraph();

</script>

<svelte:head>
      
</svelte:head>
    
<style>
       h2 {
        color: #ff9900;
        text-align: center;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
      }
      #chartdiv {
        width: 100%;
        height: 700px;
      }
     
    </style>
    
    
    <main>
      <h2>integracion Api-21</h2>
      
      <div id="chartdiv"></div>
      <p class="highcharts-description">
        Gráfico donde mostramos las tempreaturas min de cada pais
      </p>
      <Button outline color="secondary" on:click={pop}>
        <i class="fas fa-arrow-circle-left" /> Volver
    </Button>
    
      
    </main>