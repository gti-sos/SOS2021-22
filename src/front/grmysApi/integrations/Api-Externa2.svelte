<!-- Chart code -->
<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
import ApiExterna1 from "./Api-externa1.svelte";
    let ApiData = [];
    let ApiGraph = [];
    let pais=[]
    let BASE_API_URL_GRMYS = "/api/v2";
    async function loadGraph() {
          const res =await fetch("https://dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com/?format=json&images=1&lic=1&color=1&uuid=1&minage=30&maxage=40&count=10&seed=helloworld&phone=l%2Ct%2Co&ip=a&pwlen=12&email=gmail.com%2Cyahoo.com&cc=all&gender=b", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "aa850122f4msha0e020e9b389efbp19540cjsne8f34e6ccc36",
		"x-rapidapi-host": "dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com"
	}
})
         
      ApiData = await res.json();
      ApiData.forEach(x => {
          ApiGraph.push(x.firstname)
      });
          
         
 
      am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

let chart = am4core.create("chartdiv", am4charts.SlicedChart);
chart.data =ApiData;

let series = chart.series.push(new am4charts.FunnelSeries());
series.dataFields.value = "age";
series.dataFields.category = "firstname";

var fillModifier = new am4core.LinearGradientModifier();
fillModifier.brightnesses = [-0.5, 1, -0.5];
fillModifier.offsets = [0, 0.5, 1];
series.slices.template.fillModifier = fillModifier;
series.alignLabels = true;

series.labels.template.text = "{category}: [bold]{value}[/]";

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
      <h2>Integracion de api Externa 2</h2>
      
      <div id="chartdiv"></div>
      <p class="highcharts-description">
        Gráfico donde mostramos la edad y el nombre de personas aleatorias de Alemania
      </p>
      <Button outline color="secondary" on:click={pop}>
        <i class="fas fa-arrow-circle-left" /> Volver
    </Button>
    
      
    </main>