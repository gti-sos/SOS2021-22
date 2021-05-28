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

  let lifeData = [];
  let lifeChartCountryDate = [];
  let lifeChartQualityLifeI = [];
  let lifeChartPurchasingPowerI = [];
  let lifeChartSafetyI = [];

  let cargados = false;

  async function loadChart() {
    const res = await fetch(
      `https://sos2021-01.herokuapp.com/api/v2/life-stats`
    );
    lifeData = await res.json();
    if (res.ok) {
      lifeData.forEach((stat) => {
        lifeChartCountryDate.push(stat.country + "-" + stat.date);
        lifeChartQualityLifeI.push(stat["quality_life_index"]);
        lifeChartPurchasingPowerI.push(stat["purchasing_power_index"]);
        lifeChartSafetyI.push(stat["safety_index"]);
      });
      cargados = true;
    }

    console.log("Life Chart Data: " + lifeData);

    Highcharts.chart("container", {
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
        categories: lifeChartCountryDate,
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      series: [
        {
          name: "Índice de calidad de vida",
          data: lifeChartQualityLifeI,
        },
        {
          name: "Índice de poder adquisitivo",
          data: lifeChartPurchasingPowerI,
        },
        {
          name: "Índice de seguridad",
          data: lifeChartSafetyI,
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
      <NavLink href="/#/integrations">Volver</NavLink>
    </NavItem>
  </Nav>

  <h2>INTEGRATIONS WITH OTHER APIs</h2>

  <div>
    <figure class="highcharts-figure">
      <div id="container" />
      <p class="highcharts-description">
        Gráfico de líneas básico que muestra los diferentes valores para los campos de life-stats.
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
