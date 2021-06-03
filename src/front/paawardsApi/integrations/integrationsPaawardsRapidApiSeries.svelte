<script>
    //https://rapidapi.com/SAdrian/api/data-imdb1
    //https://www.anychart.com/products/anychart/gallery/Circular_Gauges/Solid_Gauge.php

    import {Nav,NavItem,NavLink} from "sveltestrap";
    var names = [];
    var data = [];
    async function load(){
        const resDataSerie = await fetch("https://data-imdb1.p.rapidapi.com/series/order/byRating/", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key": "46a527eef7msh239b1de442c47aep1f1061jsn165c4acd6a7e"
            }
        });

        let serie = await resDataSerie.json();
        for (var i=0;i<10;i++){
            let nombre = serie["Series Order By Rating"][i]["title"];
            let rating = parseFloat(serie["Series Order By Rating"][i]["rating"]);
            names.push(nombre);
            data.push(rating);
        }
        console.log(names);
        console.log(data);
    }
    load();
    /*
    anychart.onDocumentReady(async function () {

    var names = [];
    var data = [];
        const resDataSerie = await fetch("https://data-imdb1.p.rapidapi.com/series/order/byRating/", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key": "46a527eef7msh239b1de442c47aep1f1061jsn165c4acd6a7e"
            }
        });

        let serie = await resDataSerie.json();
        for (var i=0;i<10;i++){
            let nombre = serie["Series Order By Rating"][i]["title"];
            let rating = parseFloat(serie["Series Order By Rating"][i]["rating"]);
            names.push(nombre);
            data.push(rating);
        }


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
        .text(names[i] + ', <span style="">' + data[i] + '%</span>') // color: #7c868e
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

      var axis = gauge.axis().radius(100).width(1).fill(null);
      axis
        .scale()
        .minimum(0)
        .maximum(100)
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
          'Medicine manufacturing progress' +
          '<br/><span style="color:#929292; font-size: 12px;">(ACME CORPORATION)</span>'
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
    });*/
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
      height: 100%;
      margin: 0;
      padding: 0;
    }
</style>