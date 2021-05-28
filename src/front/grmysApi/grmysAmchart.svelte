<script>
    async function loadGraph(){

        let grmysData = [];
        let grmysGraph = [];
        let BASE_API_URL_GRMYS = "/api/v2";

        const data = await fetch(BASE_API_URL_GRMYS + "/grmys?offset=0&limit=10");
        grmysData = await data.json();
        grmysData.forEach( (x) => {
            grmysGraph.push({name: x.name + " " + x.year, data: [parseInt(x.ranking), parseInt(x.award)], pointPlacement: 'on'});
        });
        am4core.ready(function() {
            am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chartdiv", am4charts.PieChart);
            chart.data = MyDataGraph;
            
            chart.innerRadius = am4core.percent(50);
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "data";
            pieSeries.dataFields.category = "name";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;
        });
    }
loadGraph();
</script>
<svelte:head>

</svelte:head>   
<style>
    #chartdiv {
      width: 100%;
      height: 500px;
    }
    
</style> 
<main>
    <h1>holaaaa</h1>
    <!-- HTML -->
    <div id="chartdiv"></div>
</main>


