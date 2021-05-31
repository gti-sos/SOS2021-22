<!-- Chart code -->
<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";
  async function loadGraph() {
        let grmysData = [];
        let grmysGraph = [];
        let BASE_API_URL_GRMYS = "/api/v2";
        const data = await fetch(BASE_API_URL_GRMYS + "/grmys?offset=0&limit=10");
        grmysData = await data.json();
        grmysData.forEach( (x) => {
        grmysGraph.push({name: x.name + " " + x.year, data: [parseInt(x.ranking), parseInt(x.award)], pointPlacement: 'on'});
  });
  am4core.ready(function() {
  
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
  
      var chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
  
      chart.data =  grmysData;
  
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.minGridDistance = 40;
      categoryAxis.fontSize = 11;
  
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.max = 30;
      valueAxis.strictMinMax = true;
      valueAxis.renderer.minGridDistance = 30;
      // axis break
      var axisBreak = valueAxis.axisBreaks.create();
      axisBreak.startValue =0;
      axisBreak.endValue = 50;
      //axisBreak.breakSize = 0.005;
  
  // fixed axis break
      var d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
      axisBreak.breakSize = 0.05 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height
  
      // make break expand on hover
      var hoverState = axisBreak.states.create("hover");
      hoverState.properties.breakSize = 1;
      hoverState.properties.opacity = 0.1;
      hoverState.transitionDuration = 1500;
  
      axisBreak.defaultState.transitionDuration = 1000;
 
  
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryX = "name";
      series.dataFields.valueY = "award";
      series.columns.template.tooltipText = "{valueY.value}";
      series.columns.template.tooltipY = 0;
      series.columns.template.strokeOpacity = 0;
  
  // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
      series.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });
  
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
    <h2>AmCharts</h2>
    
    <div id="chartdiv"></div>
    <Button outline color="secondary" on:click={pop}>
      <i class="fas fa-arrow-circle-left" /> Volver
  </Button>
  
    
  </main>