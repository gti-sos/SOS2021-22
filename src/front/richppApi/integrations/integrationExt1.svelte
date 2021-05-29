<script>

    async function load() {
        var myHeaders = new Headers();
        myHeaders.append(
            "x-rapidapi-key",
            "f980ac1b7dmsh485ce13dfbad110p176198jsn17cc80a64b23"
        );
        myHeaders.append("x-rapidapi-host", "api-football-v1.p.rapidapi.com");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(
            "https://api-football-v1.p.rapidapi.com/v3/trophies?player=276}",
            requestOptions
        )
            .then((response) => response)
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

        Highcharts.chart("container", {
            chart: {
                type: "bar",
            },
            title: {
                text: "",
            },

            yAxis: {
                title: {
                    text: "Fortuna (billones de dolares)",
                },
            },

            xAxis: {
                title: {
                    text: "Año",
                },
                categories: listYear,
            },

            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
            },

            series: richppGraph,

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
        on:load={load}></script>
</svelte:head>

<main>
    <div id="container" />
</main>
