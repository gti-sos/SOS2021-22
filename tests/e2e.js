const puppeteer = require('puppeteer');
const path = './tests/screenshots/';
var counter = 0;

(async () => {
    const browser = await puppeteer.launch({
        headless: true, // Especificamos que el navegador no es headless
        slowMo: 300, // Añadimos un delay de 1 segundo entre cada comado.
    });
    console.log("Browser opened.");

    const page = await browser.newPage();
    await page.setViewport({ width: 1980, height: 1280 });
    await page.goto('http://localhost:10000/'); //await page.goto('https://sos2021-22.herokuapp.com');

    // Home page
    console.log("Pagina HOME abierta!");
    await page.screenshot({ path: path + (counter++) + '.png'});
    console.log("> Captura tomada...");

    // Info page
    await page.click("#info");
    console.log("Pagina INFO abierta!");
    await page.screenshot({ path: path + (counter++) + '.png'});
    console.log("> Captura tomada...");
    await page.click("#nav-back"); // Volvemos a la Home page

    // About page
    await page.click("#about");
    console.log("Pagina ABOUT abierta!");
    await page.screenshot({ path: path + (counter++) + '.png'});
    console.log("> Captura tomada...");
    await page.click("#nav-back"); // Volvemos a la Home page

    // Integrations page
    await page.click("#integrations");
    console.log("Pagina INTEGRATIONS abierta!");
    console.log("> Captura tomada...");
    await page.screenshot({ path: path + (counter++) + '.png'});
    await page.click("#nav-back"); // Volvemos a la Home page

    // Cargamos todos los datos de cada API para mostrar la grafica comun
    await page.click("#info");
        // Boton FRONTEND de la api gramys
    await page.click("#grmys-frontend");
    console.log("Pagina GRAMYS abierta!");
    await page.click("body > main > main > ul > li:nth-child(3) > a"); // boton borrar datos (para no duplicar recursos)
    await page.click("body > main > main > ul > li:nth-child(2) > a"); // boton cargar datos
    console.log("> Datos cargados...");
    await page.screenshot({ path: path + (counter++) + '_DATOS_GRAMYS.png'});
    console.log("> Captura tomada...");
    await page.click("body > main > main > ul > li:nth-child(1) > a"); // boton atras > Home page
    await page.click("#info"); 
        // Boton FRONTEND de la api richpp
    await page.click("#richpp-frontend");
    console.log("Pagina RICHPP abierta!");
    await page.click("body > main > main > ul > li:nth-child(3) > a"); // boton borrar datos (para no duplicar recursos)
    await page.click("body > main > main > ul > li:nth-child(2) > a"); // boton cargar datos
    console.log("> Datos cargados...");
    await page.screenshot({ path: path + (counter++) + '_DATOS_RICHPP.png'});
    console.log("> Captura tomada...");
    await page.click("body > main > main > ul > li:nth-child(1) > a"); // boton atras > Info page
        // Boton FRONTEND de la api paawards
    await page.click("#paawards-frontend");
    console.log("Pagina PAAWARDS abierta!");
    await page.click("body > main > main > ul > li:nth-child(3) > a"); // boton borrar datos (para no duplicar recursos)
    await page.click("body > main > main > ul > li:nth-child(2) > a"); // boton cargar datos
    console.log("> Datos cargados...");
    await page.screenshot({ path: path + (counter++) + '_DATOS_PAAWARDS.png'});
    console.log("> Captura tomada...");
    await page.click("body > main > main > ul > li:nth-child(1) > a"); // boton atras > Info page
    // Capturamos pagina de grafica comun
    await page.click("#comun-chart");
    console.log("Pagina ANALITICA COMUN abierta");
    await page.waitForTimeout(000);
    console.log("> Grafica cargada...");
    await page.screenshot({ path: path + (counter++) + '_ANALITICA_COMUN.png'});
    console.log("> Captura tomada...");
    await page.click("#nav-back"); // boton atras > Info page

    // Capturamos pagina de analiticas RICHPP
    await page.click("body > main > main > div:nth-child(4) > div > div > div.card-body > div > div:nth-child(2) > div > div.card-body > div > div > a > button > strong");
    console.log("Pagina ANALITICAS RICHPP abierta");
    await page.screenshot({ path: path + (counter++) + '_ANALITICAS_RICHPP.png'});
    console.log("> Captura tomada...");
        // Grafica tipo LINE
    await page.click("#line-chart");
    console.log("Pagina ANALITICA HIGHTCHART LINE abierta");
    await page.waitForTimeout(3000);
    console.log("> Grafica cargada...");
    await page.screenshot({ path: path + (counter++) + '_ANALITICA_RICHPP_HIGHCHART_LINE.png'});
    console.log("> Captura tomada...");
    await page.click("#nav-back"); // boton atras > Richpp Frontend page
    await page.click("#nav-back"); // boton atras > Info page
    await page.click("body > main > main > div:nth-child(4) > div > div > div.card-body > div > div:nth-child(2) > div > div.card-body > div > div > a > button > strong");
        // Grafica tipo SPLINE
    await page.click("#spline-chart");
    console.log("Pagina ANALITICA HIGHTCHART SPLINE abierta");
    await page.waitForTimeout(3000);
    console.log("> Grafica cargada...");
    await page.screenshot({ path: path + (counter++) + '_ANALITICA_RICHPP_HIGHCHART_SPLINE.png'});
    console.log("> Captura tomada...");
    await page.click("#nav-back"); // boton atras > Richpp Frontend page
    await page.click("#nav-back"); // boton atras > Info page
    await page.click("body > main > main > div:nth-child(4) > div > div > div.card-body > div > div:nth-child(2) > div > div.card-body > div > div > a > button > strong");
        // Grafica uvChart tipo BAR
    await page.click("#uvchart-bar");
    console.log("Pagina ANALITICA UVCHART BAR abierta");
    await page.waitForTimeout(3000);
    console.log("> Grafica cargada...");
    await page.screenshot({ path: path + (counter++) + '_ANALITICA_RICHPP_UVCHART_BAR.png'});
    console.log("> Captura tomada...");
    await page.click("#nav-back"); // boton atras > Richpp Frontend page
    await page.click("#nav-back"); // boton atras > Info page

    await browser.close();

    console.log("Navegador cerrado!");

})();