<!-- Chart code -->
<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    let ApiData = [];
    let ApiGraph = [];
    let pais=[]
    let BASE_API_URL_GRMYS = "/api/v2";

    async function loadGraph() {
          const res =await fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/europe", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "aa850122f4msha0e020e9b389efbp19540cjsne8f34e6ccc36",
		"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
	}
})

    ApiData= await res.json()
    
    console.log(ApiData);
    ApiData.forEach(x => {
      ApiGraph.push(x.Country)
      
        
    });
    am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.PieChart);

// Add data
chart.data =ApiData;

// Set inner radius
chart.innerRadius = am4core.percent(50);

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "rank";
pieSeries.dataFields.category = "Country";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;

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
      <h2>Integracion de api Externa 1</h2>
      
      <div id="chartdiv"></div>
      <p class="highcharts-description">
        Gráfico donde mostramos los datos de coronavirus en Europa
      </p>
      <Button outline color="secondary" on:click={pop}>
        <i class="fas fa-arrow-circle-left" /> Volver
    </Button>
    
      
    </main>