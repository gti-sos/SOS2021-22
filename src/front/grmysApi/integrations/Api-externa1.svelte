<!-- Chart code -->
<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    let ApiData = [];
    let ApiGraph = [];
    let pais=[]
    let BASE_API_URL_GRMYS = "/api/v2";
    async function loadGraph() {
          const res =await fetch("https://free-nba.p.rapidapi.com/teams?page=0", {
            "method": "GET",
            "headers": {
              "x-rapidapi-key": "aa850122f4msha0e020e9b389efbp19540cjsne8f34e6ccc36",
              "x-rapidapi-host": "free-nba.p.rapidapi.com"
	  }
});
         
  ApiData = await res.json();
  ApiData.forEach(data => {
  ApiGraph.push(data.city)
            });
          
         
 
am4core.ready(function() {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      var chart = am4core.create("chartdiv", am4charts.PieChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.data =ApiData;
      chart.radius = am4core.percent(70);
      chart.innerRadius = am4core.percent(40);
      chart.startAngle = 180;
      chart.endAngle = 360;  

      var series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = 3.0;
      series.dataFields.category = "city";

      series.slices.template.cornerRadius = 10;
      series.slices.template.innerCornerRadius = 7;
      series.slices.template.draggable = true;
      series.slices.template.inert = true;
      series.alignLabels = false;

      series.hiddenState.properties.startAngle = 90;
      series.hiddenState.properties.endAngle = 90;

      chart.legend = new am4charts.Legend();

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
  height: 500px;
}
     
    </style>
    
    
    <main>
      <h2>AmCharts</h2>
      
      <div id="chartdiv"></div>
      <p class="highcharts-description">
        Gráfico donde mostramos las tempreaturas min de cada pais
      </p>
      <Button outline color="secondary" on:click={pop}>
        <i class="fas fa-arrow-circle-left" /> Volver
    </Button>
    
      
    </main>