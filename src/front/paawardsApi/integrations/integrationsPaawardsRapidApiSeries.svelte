<script>
    //https://rapidapi.com/SAdrian/api/data-imdb1
    //https://www.anychart.com/products/anychart/gallery/Circular_Gauges/Solid_Gauge.php

    import {Nav,NavItem,NavLink} from "sveltestrap";
    let search = ["Prison%20Break","Sons%20of%20Anarchy","Breaking%20Bad","Mayans%20M.C.","Better%20Call%20Saul"];
    let names = ["Prison Break","Sons of Anarchy","Breaking Bad","Mayans M.C.","Better Call Saul"];
    let cont = 0;
    let data = [];

    anychart.onDocumentReady(async function () {
      /*----------------------------------------*/
      for(var serie of search){
        const resDataSerie = await fetch(`https://data-imdb1.p.rapidapi.com/series/idbyTitle/${serie}/`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key": "46a527eef7msh239b1de442c47aep1f1061jsn165c4acd6a7e"
            }
        });
        if (resDataSerie.ok) {
          const json = await resDataSerie.json();
          var imdbId = json["Result"][0]["imdb_id"];
          
          const resDataSerie1 = await fetch(`https://data-imdb1.p.rapidapi.com/series/id/${imdbId}/`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key": "46a527eef7msh239b1de442c47aep1f1061jsn165c4acd6a7e"
            }
          });
          if (resDataSerie1.ok) {
            const serie1 = await resDataSerie1.json();
            let rating = parseFloat(serie1[`${names[cont]}`]["rating"]);
            data.push(rating);
          }
        }
        cont=cont+1;
      }
      /*----------------------------------------*/
      var dataSet = anychart.data.set(data);
      var palette = anychart.palettes
        .distinctColors()
        .items([
          '#64b5f6',
          '#1976d2',
          '#ef6c00',
          '#ffd54f',
          '#455a64',
          '#96a6a6',
          '#dd2c00',
          '#00838f',
          '#00bfa5',
          '#ffa000'
        ]);

      var makeBarWithBar = function (gauge, radius, i, width) {
        var stroke = null;
        gauge
          .label(i)
          .text(names[i] + ': <span style="">' + data[i] + '</span>') // color: #7c868e
          .useHtml(true);
        gauge
          .label(i)
          .hAlign('center')
          .vAlign('middle')
          .anchor('right-center')
          .padding(0, 10)
          .height(width / 2 + '%')
          .offsetY(radius + '%')
          .offsetX(0);
      
        gauge
          .bar(i)
          .dataIndex(i)
          .radius(radius)
          .width(width)
          .fill(palette.itemAt(i))
          .stroke(null)
          .zIndex(5);
        gauge
          .bar(i + 100)
          .dataIndex(5)
          .radius(radius)
          .width(width)
          .fill('#F5F4F4')
          .stroke(stroke)
          .zIndex(4);
      
        return gauge.bar(i);
      };

      var gauge = anychart.gauges.circular();
      gauge.data(dataSet);
      gauge
        .fill('#fff')
        .stroke(null)
        .padding(0)
        .margin(100)
        .startAngle(0)
        .sweepAngle(270);

      var axis = gauge.axis().radius(10).width(1).fill(null);
      axis
        .scale()
        .minimum(0)
        .maximum(10)
        .ticks({ interval: 1 })
        .minorTicks({ interval: 1 });
      axis.labels().enabled(false);
      axis.ticks().enabled(false);
      axis.minorTicks().enabled(false);
      makeBarWithBar(gauge, 100, 0, 17);
      makeBarWithBar(gauge, 80, 1, 17);
      makeBarWithBar(gauge, 60, 2, 17);
      makeBarWithBar(gauge, 40, 3, 17);
      makeBarWithBar(gauge, 20, 4, 17);

      gauge.margin(50);
      gauge
        .title()
        .text(
          'Ratings Series TV' +
          '<br/><span style="color:#929292; font-size: 12px;">(Rating by IMDB)</span>'
        )
        .useHtml(true);
      gauge
        .title()
        .enabled(true)
        .hAlign('center')
        .padding(0)
        .margin([0, 0, 20, 0]);

      gauge.container('container');
      gauge.draw();
    });
</script>

<svelte:head>
    <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js"></script>
    <script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js"></script>
    <script src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js"></script>
    <script src="https://cdn.anychart.com/releases/v8/js/anychart-circular-gauge.min.js"></script>
    <link href="https://cdn.anychart.com/releases/v8/css/anychart-ui.min.css" type="text/css" rel="stylesheet">
    <link href="https://cdn.anychart.com/releases/v8/fonts/css/anychart-font.min.css" type="text/css" rel="stylesheet">
</svelte:head>

<main>
    <Nav>
        <NavItem>
            <NavLink href="/#/integrations">Volver</NavLink>
        </NavItem>
    </Nav>
    <div id="container"></div>
</main>

<style>
    #container {
      width: 100%;
      height: 500px;
      margin: 0;
      padding: 0;
    }
</style>