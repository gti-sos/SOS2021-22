<script>
    import {Nav,NavItem,NavLink} from "sveltestrap";
    let BASE_API_URL_PAAWARDS = "/api/v1";

    let country = [];
    async function getCountry(){
        let paawards = [];
        
        const data = await fetch(BASE_API_URL_PAAWARDS + "/paawards");
        paawards = await data.json();
        paawards.forEach((x) => {
            if (!country.includes(x.country)){
                country.push(x.country);
            }
        });
        console.log(country);
        loadGraph();
    }

    async function loadGraph(){
        let paawardsGraph = [];
        for (const c of country){
            const res = await fetch(BASE_API_URL_PAAWARDS + `/paawards?country=${c}`);
            if (res.ok) {
                const json = await res.json();
                var sumaEdad = 0;
                var sumaTrofeos = 0;
                var contador = 0;
                json.forEach((p) => {
                    var edad = parseInt(p.age);
                    var trofeos = parseInt(p.trophy);
                    sumaEdad=sumaEdad+edad;
                    sumaTrofeos=sumaTrofeos+trofeos;
                    contador=contador+1;
                });
                var mediaEdad = sumaEdad/contador;
                var mediaTrofeos = sumaTrofeos/contador;
                paawardsGraph.push({name: `${c}`, y: mediaEdad, z: mediaTrofeos});
            } 
            else {
                paawardsGraph.push({name: `${c}`, y: 0.0, z: 0.0});
            }
        }
        console.log(paawardsGraph);

        Highcharts.chart('container', {
            chart: {
                type: 'variablepie'
            },
            title: {
                text: 'Paises ganadores de al menos un Premio Princesa de Asturias junto a la media de edad y trofeos'
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                    'Media de Edad: <b>{point.y}</b><br/>' +
                    'Media de Trofeos: <b>{point.z}</b><br/>'
            },
            series: [{
                minPointSize: 10,
                innerSize: '20%',
                zMin: 0,
                name: 'paises',
                data: paawardsGraph
            }]
        });
    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/variable-pie.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{getCountry}"></script>
</svelte:head>

<main>
    <Nav>
        <NavItem>
            <NavLink href="/#/paawards">Volver</NavLink>
        </NavItem>
    </Nav>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
</main>

<style>
    #container {
        width: 100%;
        height: 500px;
        margin: 0;
        padding: 0;
    }

    .highcharts-figure {
        min-width: 320px; 
        max-width: 700px;
        margin: 1em auto;
    }
</style>