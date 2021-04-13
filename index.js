var cool = require('cool-ascii-faces');
var express = require('express');
var bodyParser = require('body-parser');

var path = require('path');
const { request } = require('express');

var ApiGrmys=require("./ApiGrmys");
var app = express();

ApiGrmys.register(app);

var port = (process.env.PORT || 10000);


app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));

/*
app.get('/cool', (request, response) => {
	response.send(cool());
	console.log('New request to /cool has arrived');
});
*/
app.get('/index', (request, response) => {
	response.send(express());
	console.log('New request to /index has arrived');
});

/*Codigo --- Antonio*/
var paawardsAPI = require("./paawardsAPI");
paawardsAPI.register(app);

/*Codigo --- Manuel*/
var richpp = [];

app.get(BASE_API_PATH + '/richpp', (request, response) => {
	response.send(JSON.stringify(richpp, null, 2));
});

var initRichpp = [
	{
		"top": 1,
		"name": "Jeff Bezos",
		"fortune (billions of dollars)": 113,
		"age": 56,
		"country": "EEUU",
		"year": 2020,
		"company": "Amazon"
	},
	{
		"top": 2,
		"name": "Bill Gates",
		"fortune (billions of dollars)": 98,
		"age": 64,
		"country": "EEUU",
		"year": 2020,
		"company": "Microsoft"
	},
];

app.get(BASE_API_PATH + '/richpp/loadInitialData', (request, response) => {
	response.send(JSON.stringify(initRichpp, null, 2));
});

app.post(BASE_API_PATH + '/richpp', (request, response) => {
	var newRichMan = request.body;
	console.log(`New rich man to be added: <${JSON.stringify(newRichMan, null, 2)}>`);
	richpp.push(newRichMan);
	response.sendStatus(201);
});

/*Codigo --- Jose Manuel*/


app.get('/info/paawards', (request, response) => {
	response.send(`<!DOCTYPE html>
	</html>

	<head>
        <title>PAAWARDS</title>
    </head>

	<body>
		<table>
			<col class="col0">
			<col class="col1">
			<col class="col2">
			<col class="col3">
			<col class="col4">
			<col class="col5">
			<col class="col6">
        	<tbody>
			  <tr class="row0">
				<td class="column0 style1 s">name</td>
				<td class="column1 style1 s">year</td>
				<td class="column2 style1 s">sport</td>
				<td class="column3 style1 s">country</td>
				<td class="column4 style1 s">age</td>
				<td class="column5 style1 s">gender</td>
				<td class="column6 style1 s">trophy</td>
			  </tr>
			  <tr class="row1">
				<td class="column0 style2 s">Carlos Sainz</td>
				<td class="column1 style3 n">2020</td>
				<td class="column2 style4 s">Rally</td>
				<td class="column3 style4 s">Spain</td>
				<td class="column4 style3 n">58</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">10</td>
			  </tr>
			  <tr class="row2">
				<td class="column0 style2 s">Lindsey Vonn</td>
				<td class="column1 style3 n">2019</td>
				<td class="column2 style4 s">Esqui alpino</td>
				<td class="column3 style4 s">EE.UU</td>
				<td class="column4 style3 n">35</td>
				<td class="column5 style4 s">Femenino</td>
				<td class="column6 style3 n">7</td>
			  </tr>
			  <tr class="row3">
				<td class="column0 style2 s">Reinhold Messner </td>
				<td class="column1 style3 n">2018</td>
				<td class="column2 style4 s">Alpinismo</td>
				<td class="column3 style4 s">Italia</td>
				<td class="column4 style3 n">74</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">0</td>
			  </tr>
			  <tr class="row4">
				<td class="column0 style2 s">Krzysztof Wielicki</td>
				<td class="column1 style3 n">2018</td>
				<td class="column2 style4 s">Alpinismo</td>
				<td class="column3 style4 s">Polonia</td>
				<td class="column4 style3 n">68</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">0</td>
			  </tr>
			  <tr class="row5">
				<td class="column0 style2 s">Selección de rugby de Nueva Zelanda</td>
				<td class="column1 style3 n">2017</td>
				<td class="column2 style4 s">Rugby</td>
				<td class="column3 style4 s">Nueva Zelanda</td>
				<td class="column4 style3 n">125</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">100</td>
			  </tr>
			  <tr class="row6">
				<td class="column0 style2 s">Javier Gómez Noya</td>
				<td class="column1 style3 n">2016</td>
				<td class="column2 style4 s">Triatlon</td>
				<td class="column3 style4 s">España</td>
				<td class="column4 style3 n">33</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">12</td>
			  </tr>
			  <tr class="row7">
				<td class="column0 style2 s">Pau Gasol</td>
				<td class="column1 style3 n">2015</td>
				<td class="column2 style4 s">Baloncesto</td>
				<td class="column3 style4 s">España</td>
				<td class="column4 style3 n">35</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">19</td>
			  </tr>
			  <tr class="row8">
				<td class="column0 style2 s">Marc Gasol</td>
				<td class="column1 style3 n">2015</td>
				<td class="column2 style4 s">Baloncesto</td>
				<td class="column3 style4 s">España</td>
				<td class="column4 style3 n">30</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">7</td>
			  </tr>
			  <tr class="row9">
				<td class="column0 style2 s">Maratón de Nueva York</td>
				<td class="column1 style3 n">2014</td>
				<td class="column2 style4 s">Atletismo</td>
				<td class="column3 style4 s">EE.UU</td>
				<td class="column4 style3 n">44</td>
				<td class="column5 style4 s">Mixto</td>
				<td class="column6 style3 n">0</td>
			  </tr>
			  <tr class="row10">
				<td class="column0 style2 s">José María Olazábal</td>
				<td class="column1 style3 n">2013</td>
				<td class="column2 style4 s">Golf</td>
				<td class="column3 style4 s">España</td>
				<td class="column4 style3 n">47</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">29</td>
			  </tr>
			  <tr class="row11">
				<td class="column0 style2 s">Iker Casillas</td>
				<td class="column1 style3 n">2012</td>
				<td class="column2 style4 s">Futbol</td>
				<td class="column3 style4 s">España</td>
				<td class="column4 style3 n">31</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">26</td>
			  </tr>
			  <tr class="row12">
				<td class="column0 style2 s">Xavi Hernández</td>
				<td class="column1 style3 n">2012</td>
				<td class="column2 style4 s">Futbol</td>
				<td class="column3 style4 s">España</td>
				<td class="column4 style3 n">32</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">35</td>
			  </tr>
			  <tr class="row13">
				<td class="column0 style2 s">Haile Gebrselassie</td>
				<td class="column1 style3 n">2011</td>
				<td class="column2 style4 s">Atletismo</td>
				<td class="column3 style4 s">Etiopía</td>
				<td class="column4 style3 n">38</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">6</td>
			  </tr>
			  <tr class="row14">
				<td class="column0 style2 s">Selección de fútbol de España</td>
				<td class="column1 style3 n">2010</td>
				<td class="column2 style4 s">Futbol</td>
				<td class="column3 style4 s">España</td>
				<td class="column4 style3 n">90</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">4</td>
			  </tr>
			  <tr class="row15">
				<td class="column0 style2 s">Yelena Isinbáyeva</td>
				<td class="column1 style3 n">2009</td>
				<td class="column2 style4 s">Atletismo</td>
				<td class="column3 style4 s">Rusia</td>
				<td class="column4 style3 n">27</td>
				<td class="column5 style4 s">Femenino</td>
				<td class="column6 style3 n">6</td>
			  </tr>
			  <tr class="row16">
				<td class="column0 style2 s">Rafael Nadal</td>
				<td class="column1 style3 n">2008</td>
				<td class="column2 style4 s">Tenis</td>
				<td class="column3 style4 s">España</td>
				<td class="column4 style3 n">22</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">86</td>
			  </tr>
			  <tr class="row17">
				<td class="column0 style2 s">Michael Schumacher</td>
				<td class="column1 style3 n">2007</td>
				<td class="column2 style4 s">Automovilismo</td>
				<td class="column3 style4 s">Alemania</td>
				<td class="column4 style3 n">38</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">7</td>
			  </tr>
			  <tr class="row18">
				<td class="column0 style2 s">Selección de baloncesto de España</td>
				<td class="column1 style3 n">2006</td>
				<td class="column2 style4 s">Baloncesto</td>
				<td class="column3 style4 s">España</td>
				<td class="column4 style3 n">72</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">8</td>
			  </tr>
			  <tr class="row19">
				<td class="column0 style2 s">Fernando Alonso</td>
				<td class="column1 style3 n">2005</td>
				<td class="column2 style4 s">Automovilismo</td>
				<td class="column3 style4 s">España</td>
				<td class="column4 style3 n">24</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">6</td>
			  </tr>
			  <tr class="row20">
				<td class="column0 style2 s">Hicham El Guerrouj</td>
				<td class="column1 style3 n">2004</td>
				<td class="column2 style4 s">Atletismo</td>
				<td class="column3 style4 s">Marruecos</td>
				<td class="column4 style3 n">30</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">6</td>
			  </tr>
			  <tr class="row21">
				<td class="column0 style2 s">Tour de Francia</td>
				<td class="column1 style3 n">2003</td>
				<td class="column2 style4 s">Ciclismo</td>
				<td class="column3 style4 s">Francia</td>
				<td class="column4 style3 n">100</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">0</td>
			  </tr>
			  <tr class="row22">
				<td class="column0 style2 s">Selección de fútbol de Brasil</td>
				<td class="column1 style3 n">2002</td>
				<td class="column2 style4 s">Futbol</td>
				<td class="column3 style4 s">Brasil</td>
				<td class="column4 style3 n">88</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">21</td>
			  </tr>
			  <tr class="row23">
				<td class="column0 style2 s">Manel Estiarte</td>
				<td class="column1 style3 n">2001</td>
				<td class="column2 style4 s">Waterpolo</td>
				<td class="column3 style4 s">España</td>
				<td class="column4 style3 n">40</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">26</td>
			  </tr>
			  <tr class="row24">
				<td class="column0 style2 s">Lance Armstrong</td>
				<td class="column1 style3 n">2000</td>
				<td class="column2 style4 s">Ciclismo</td>
				<td class="column3 style4 s">EE.UU</td>
				<td class="column4 style3 n">29</td>
				<td class="column5 style4 s">Masculino</td>
				<td class="column6 style3 n">11</td>
			  </tr>
			</tbody>
    	</table>
	</body>
	</html>`);
	console.log('New request to /idex has arrived');
});

app.get('/info/richpp', (request, response) => {
	response.send(`<!DOCTYPE html>
    <html>
    
    <head>
        <title>RICHPP</title>
    </head>
    
    <body>
        <table>
            <col class="col0">
            <col class="col1">
            <col class="col2">
            <col class="col3">
            <col class="col4">
            <col class="col5">
            <col class="col6">
            <col class="col7">
            <tbody>
              <tr class="row0">
                <td>top</td>
                <td>name</td>
                <td>fortune (billions of dollars)</td>
                <td>age</td>
                <td>country</td>
                <td>year</td>
                <td>company</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row1">
                <td>1</td>
                <td>Jeff Bezos</td>
                <td>113 $</td>
                <td>56</td>
                <td>EEUU</td>
                <td>2020</td>
                <td>Amazon</td>
                <tdç>&nbsp;</td>
              </tr>
              <tr class="row2">
                <td>2</td>
                <td>Bill Gates</td>
                <td>98 $</td>
                <td>64</td>
                <td>EEUU</td>
                <td>2020</td>
                <td>Microsoft</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row3">
                <td>3</td>
                <td>Bernard Arnault</td>
                <td>76 $</td>
                <td>71</td>
                <td>France</td>
                <td>2020</td>
                <td>LVMH</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row4">
                <td>1</td>
                <td>Jeff Bezos</td>
                <td>131 $</td>
                <td>55</td>
                <td>EEUU</td>
                <td>2019</td>
                <td>Amazon</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row5">
                <td>2</td>
                <td>Bill Gates</td>
                <td>96,5 $</td>
                <td>63</td>
                <td>EEUU</td>
                <td>2019</td>
                <td>Microsoft</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row6">
                <td>3</td>
                <td>Warren Buffett</td>
                <td>82,5 $</td>
                <td>88</td>
                <td>EEUU</td>
                <td>2019</td>
                <td>Berkshire Hathaway</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row7">
                <td>1</td>
                <td>Jeff Bezos</td>
                <td>112 $</td>
                <td>54</td>
                <td>EEUU</td>
                <td>2018</td>
                <td>Amazon</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row8">
                <td>2</td>
                <td>Bill Gates</td>
                <td>90 $</td>
                <td>62</td>
                <td>EEUU</td>
                <td>2018</td>
                <td>Microsoft</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row9">
                <td>3</td>
                <td>Warren Buffett</td>
                <td>84 $</td>
                <td>87</td>
                <td>EEUU</td>
                <td>2018</td>
                <td>Berkshire Hathaway</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row10">
                <td>1</td>
                <td>Bill Gates</td>
                <td>86 $</td>
                <td>61</td>
                <td>EEUU</td>
                <td>2017</td>
                <td>Microsoft</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row11">
                <td>2</td>
                <td>Warren Buffett</td>
                <td>75,6 $</td>
                <td>86</td>
                <td>EEUU</td>
                <td>2017</td>
                <td>Berkshire Hathaway</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row12">
                <td>3</td>
                <td>Jeff Bezos</td>
                <td>72,8 $</td>
                <td>53</td>
                <td>EEUU</td>
                <td>2017</td>
                <td>Amazon</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row13">
                <td>1</td>
                <td>Bill Gates</td>
                <td>75 $</td>
                <td>60</td>
                <td>EEUU</td>
                <td>2016</td>
                <td>Microsoft</td>
                <tdÇ>&nbsp;</td>
              </tr>
              <tr class="row14">
                <td>2</td>
                <td>Amancio Ortega</td>
                <td>67 $</td>
                <td>79</td>
                <td>Spain</td>
                <td>2016</td>
                <td>Inditex</td>
                <td>&nbsp;</td>
              </tr>
              <tr class="row15">
                <td>3</td>
                <td>Warren Buffett</td>
                <td>60,8 $</td>
                <td>85</td>
                <td>EEUU</td>
                <td>2016</td>
                <td>Berkshire Hathaway</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
        </table>
      </body>
    </html>
    
    </body>
    
    </html>`);
	console.log('New request to /idex has arrived');
});

app.get('/info/grmys', (request, response) => {
	response.send(`<!DOCTYPE html>
	<html>
    
    <head>
        <title>GRMYS</title>
    </head>
	<body>
	<table border="0" cellpadding="0" cellspacing="0" id="sheet0" class="sheet0 gridlines">
	<col class="col0">
	<col class="col1">
	<col class="col2">
	<col class="col3">
	<col class="col4">
	<col class="col5">
	<col class="col6">
	<col class="col7">
	<tbody>
	  <tr class="row0">
		<td class="column0 style3 s">ranking</td>
		<td class="column1 style3 s">name</td>
		<td class="column2 style3 s">award</td>
		<td class="column3 style1 s">country</td>
		<td class="column4 style3 s">group-member</td>
		<td class="column5 style3 s">style</td>
		<td class="column6 style4 s">year</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row1">
		<td class="column0 style5 n">1</td>
		<td class="column1 style5 s">the beatles</td>
		<td class="column2 style5 n">28</td>
		<td class="column3 style2 s">england</td>
		<td class="column4 style5 n">4</td>
		<td class="column5 style5 s">rock</td>
		<td class="column6 style5 n">1960</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row2">
		<td class="column0 style5 n">2</td>
		<td class="column1 style5 s">U2</td>
		<td class="column2 style5 n">22</td>
		<td class="column3 style2 s">england</td>
		<td class="column4 style5 n">4</td>
		<td class="column5 style5 s">rock</td>
		<td class="column6 style5 n">1976</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row3">
		<td class="column0 style5 n">3</td>
		<td class="column1 style5 s">dixie chicks</td>
		<td class="column2 style5 n">13</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">3</td>
		<td class="column5 style5 s">country</td>
		<td class="column6 style5 n">1989</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row4">
		<td class="column0 style5 n">4</td>
		<td class="column1 style5 s">foo fighters</td>
		<td class="column2 style5 n">12</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">3</td>
		<td class="column5 style5 s">rock</td>
		<td class="column6 style5 n">1994</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row5">
		<td class="column0 style5 n">5</td>
		<td class="column1 style5 s">pat metheny group</td>
		<td class="column2 style5 n">10</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">4</td>
		<td class="column5 style5 s">jazz</td>
		<td class="column6 style5 n">1977</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row6">
		<td class="column0 style5 n">6</td>
		<td class="column1 style5 s">the manhattan transfer</td>
		<td class="column2 style5 n">9</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">3</td>
		<td class="column5 style5 s">folk</td>
		<td class="column6 style5 n">1972</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row7">
		<td class="column0 style5 n">7</td>
		<td class="column1 style5 s">the Blackwood brother</td>
		<td class="column2 style5 n">8</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">5</td>
		<td class="column5 style5 s">gospel</td>
		<td class="column6 style5 n">1934</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row8">
		<td class="column0 style5 n">8</td>
		<td class="column1 style5 s">Metallica</td>
		<td class="column2 style5 n">8</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">4</td>
		<td class="column5 style5 s">rock</td>
		<td class="column6 style5 n">1983</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row9">
		<td class="column0 style5 n">9</td>
		<td class="column1 style5 s">santana</td>
		<td class="column2 style5 n">8</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">9</td>
		<td class="column5 style5 s">rock</td>
		<td class="column6 style5 n">1966</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row10">
		<td class="column0 style5 n">10</td>
		<td class="column1 style5 s">take 6</td>
		<td class="column2 style5 n">8</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">6</td>
		<td class="column5 style5 s">gospel</td>
		<td class="column6 style5 n">1985</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row11">
		<td class="column0 style5 n">11</td>
		<td class="column1 style5 s">coldplay</td>
		<td class="column2 style5 n">7</td>
		<td class="column3 style2 s">england</td>
		<td class="column4 style5 n">5</td>
		<td class="column5 style5 s">pop</td>
		<td class="column6 style5 n">1996</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row12">
		<td class="column0 style5 n">12</td>
		<td class="column1 style5 s">kentucky thunders</td>
		<td class="column2 style5 n">7</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">6</td>
		<td class="column5 style5 s">bluegrass</td>
		<td class="column6 style5 n">1997</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row13">
		<td class="column0 style5 n">13</td>
		<td class="column1 style5 s">toto</td>
		<td class="column2 style5 n">7</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">2</td>
		<td class="column5 style5 s">rock</td>
		<td class="column6 style5 n">1977</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row14">
		<td class="column0 style5 n">14</td>
		<td class="column1 style5 s">lady antebellum</td>
		<td class="column2 style5 n">7</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">3</td>
		<td class="column5 style5 s">country</td>
		<td class="column6 style5 n">2006</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row15">
		<td class="column0 style5 n">15</td>
		<td class="column1 style5 s">simon &amp; garfunkel</td>
		<td class="column2 style5 n">7</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">2</td>
		<td class="column5 style5 s">folk</td>
		<td class="column6 style5 n">1957</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row16">
		<td class="column0 style5 n">16</td>
		<td class="column1 style5 s">the 5th dimension</td>
		<td class="column2 style5 n">6</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">5</td>
		<td class="column5 style5 s">pop</td>
		<td class="column6 style5 n">1966</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row17">
		<td class="column0 style5 n">17</td>
		<td class="column1 style5 s">the black eyed peas</td>
		<td class="column2 style5 n">6</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">4</td>
		<td class="column5 style5 s">pop</td>
		<td class="column6 style5 n">1992</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row18">
		<td class="column0 style5 n">18</td>
		<td class="column1 style5 s">the chieftains</td>
		<td class="column2 style5 n">6</td>
		<td class="column3 style2 s">ireland</td>
		<td class="column4 style5 n">6</td>
		<td class="column5 style5 s">celta</td>
		<td class="column6 style5 n">1963</td>
		<td class="column7">&nbsp;</td>
	  </tr>
	  <tr class="row19">
		<td class="column0 style5 n">19</td>
		<td class="column1 style5 s">eagles</td>
		<td class="column2 style5 n">6</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">3</td>
		<td class="column5 style5 s">rock</td>
		<td class="column6 style5 n">1971</td>
		<td class="column7 style6 null"></td>
	  </tr>
	  <tr class="row20">
		<td class="column0 style5 n">20</td>
		<td class="column1 style5 s">earth,wind &amp; fire</td>
		<td class="column2 style5 n">6</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">9</td>
		<td class="column5 style5 s">fusion</td>
		<td class="column6 style5 n">1970</td>
		<td class="column7 style6 null"></td>
	  </tr>
	  <tr class="row21">
		<td class="column0 style5 n">21</td>
		<td class="column1 style5 s">outkast</td>
		<td class="column2 style5 n">6</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">2</td>
		<td class="column5 style5 s">hip-hop</td>
		<td class="column6 style5 n">1992</td>
		<td class="column7 style6 null"></td>
	  </tr>
	  <tr class="row22">
		<td class="column0 style5 n">22</td>
		<td class="column1 style5 s">the police</td>
		<td class="column2 style5 n">6</td>
		<td class="column3 style2 s">england</td>
		<td class="column4 style5 n">3</td>
		<td class="column5 style5 s">pop</td>
		<td class="column6 style5 n">1977</td>
		<td class="column7 style6 null"></td>
	  </tr>
	  <tr class="row23">
		<td class="column0 style5 n">23</td>
		<td class="column1 style5 s">red hot chili peppers</td>
		<td class="column2 style5 n">6</td>
		<td class="column3 style5 s">EE.UU</td>
		<td class="column4 style5 n">4</td>
		<td class="column5 style5 s">rock</td>
		<td class="column6 style5 n">1983</td>
		<td class="column7 style6 null"></td>
	  </tr>
	  <tr class="row24">
		<td class="column0 style5 n">24</td>
		<td class="column1 style5 s">daft punk</td>
		<td class="column2 style5 n">6</td>
		<td class="column3 style2 s">french</td>
		<td class="column4 style5 n">2</td>
		<td class="column5 style5 s">pop</td>
		<td class="column6 style5 n">1993</td>
		<td class="column7 style6 null"></td>
	  </tr>
	</tbody>
</table>
</body>
</html>`);
	console.log('New request to /idex has arrived');
});

app.listen(port, () => {
	console.log(`Server ready listenig on port ${port}`);
});
