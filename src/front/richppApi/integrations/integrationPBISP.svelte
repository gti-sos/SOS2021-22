<script>
  import {
    Button,
    Icon,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
  } from "sveltestrap";
  import { onMount } from "svelte";

  let pbispData = [];
  let pbispProvinceYear = [];
  let pbispBudget = [];
  let pbispInvestPromotion = [];
  let pbispLiquid = [];

  let cargados = false;

  async function loadChart() {
    const res = await fetch(
      `https://sos2021-27.herokuapp.com/api/v2/province-budget-and-investment-in-social-promotion`
    );
    pbispData = await res.json();
    console.log(pbispData);
    if (res.ok) {
      pbispData.forEach((stat) => {
        pbispProvinceYear.push(stat.province + "-" + stat.year);
        pbispBudget.push(stat["budget"]);
        pbispInvestPromotion.push(stat["invest_promotion"]);
        pbispLiquid.push(stat["liquid"]);
      });
      cargados = true;
    }

    Highcharts.chart("container", {
      chart: {
        type: "scatter",
        zoomType: "xy",
      },
      title: {
        text: "Life-stats",
      },
      yAxis: {
        title: {
          text: "Valor",
        },
      },
      xAxis: {
        title: {
          text: "País-Año",
        },
        categories: pbispProvinceYear,
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: "rgb(100,100,100)",
              },
            },
          },
          states: {
            hover: {
              marker: {
                enabled: false,
              },
            },
          },
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",
            pointFormat: "{point.x} cm, {point.y} kg",
          },
        },
      },
      series: [
        {
          name: "Presupuesto",
          data: pbispBudget,
        },
        {
          name: "Promocion",
          data: pbispInvestPromotion,
        },
        {
          name: "Liquidacion",
          data: pbispLiquid,
        },
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
  <Nav>
    <NavItem>
      <NavLink id="nav-back" href="/#/integrations">Volver</NavLink>
    </NavItem>
  </Nav>

  <h2>API ProvinceBudgetInvestmentSocialPromotion (GRUPO 27)</h2>

  <div>
    <figure class="highcharts-figure">
      <div id="container" />
      <p class="highcharts-description">
        Gráfico de líneas básico que muestra los diferentes valores para los
        campos de life-stats.
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
  .highcharts-figure {
    min-width: 360px;
    max-width: 800px;
    margin: 1em auto;
  }
</style>
