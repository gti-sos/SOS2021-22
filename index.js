var cool = require('cool-ascii-faces');
var express = require('express');
var bodyParser = require('body-parser');

var path = require('path');
const { request } = require('express');

var app = express();

var port = (process.env.PORT || 10000);
var BASE_API_PATH = '/api/v1';

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
var paawards = [];

var initPaawards = [
	{"name":"Carlos Sainz","year":2020,"sport":"Rally","country":"Spain","age":58,"gender":"Masculino","trophy":10},
	{"name":"Lindsey Vonn","year":2019,"sport":"Esqui alpino","country":"EE.UU","age":35,"gender":"Femenino","trophy":7},
	{"name":"Reinhold Messner","year":2018,"sport":"Alpinismo","country":"Italia","age":74,"gender":"Masculino","trophy":0},
	{"name":"Krzysztof Wielicki","year":2018,"sport":"Alpinismo","country":"Polonia","age":68,"gender":"Masculino","trophy":0},
	{"name":"Seleccion de rugby de Nueva Zelanda","year":2017,"sport":"Rugby","country":"Nueva Zelanda","age":125,"gender":"Masculino","trophy":100},
	{"name":"Javier Gomez Noya","year":2016,"sport":"Triatlon","country":"Spain","age":33,"gender":"Masculino","trophy":12},
	{"name":"Pau Gasol","year":2015,"sport":"Baloncesto","country":"Spain","age":35,"gender":"Masculino","trophy":19},
	{"name":"Marc Gasol","year":2015,"sport":"Baloncesto","country":"Spain","age":30,"gender":"Masculino","trophy":7},
	{"name":"Maraton de Nueva York","year":2014,"sport":"Atletismo","country":"EE.UU","age":44,"gender":"Mixto","trophy":0},
	{"name":"Jose Maria Olazabal","year":2013,"sport":"Golf","country":"Spain","age":47,"gender":"Masculino","trophy":29},
	{"name":"Iker Casillas","year":2012,"sport":"Futbol","country":"Spain","age":31,"gender":"Masculino","trophy":26},
	{"name":"Xavi Hernandez","year":2012,"sport":"Futbol","country":"Spain","age":32,"gender":"Masculino","trophy":35},
	{"name":"Haile Gebrselassie","year":2011,"sport":"Atletismo","country":"Etiopia","age":38,"gender":"Masculino","trophy":6},
	{"name":"Seleccion de futbol de España","year":2010,"sport":"Futbol","country":"Spain","age":90,"gender":"Masculino","trophy":4},
	{"name":"Yelena Isinbayeva","year":2009,"sport":"Atletismo","country":"Rusia","age":27,"gender":"Femenino","trophy":6},
	{"name":"Rafael Nadal","year":2008,"sport":"Tenis","country":"Spain","age":22,"gender":"Masculino","trophy":86},
	{"name":"Michael Schumacher","year":2007,"sport":"Automovilismo","country":"Alemania","age":38,"gender":"Masculino","trophy":7},
	{"name":"Seleccion de baloncesto de España","year":2006,"sport":"Baloncesto","country":"Spain","age":72,"gender":"Masculino","trophy":8},
	{"name":"Fernando Alonso","year":2005,"sport":"Automovilismo","country":"Spain","age":24,"gender":"Masculino","trophy":6},
	{"name":"Hicham El Guerrouj","year":2004,"sport":"Atletismo","country":"Marruecos","age":30,"gender":"Masculino","trophy":6},
	{"name":"Tour de Francia","year":2003,"sport":"Ciclismo","country":"Francia","age":100,"gender":"Masculino","trophy":0},
	{"name":"Seleccion de futbol de Brasil","year":2002,"sport":"Futbol","country":"Brasil","age":88,"gender":"Masculino","trophy":21},
	{"name":"Manel Estiarte","year":2001,"sport":"Waterpolo","country":"Spain","age":40,"gender":"Masculino","trophy":26},
	{"name":"Lance Armstrong","year":2000,"sport":"Ciclismo","country":"EE.UU","age":29,"gender":"Masculino","trophy":11}
];

//GET a la lista de recursos
app.get(BASE_API_PATH + '/paawards', (request, response) => {
	if (paawards.length!=0){
		console.log("Get Paawards")
		response.send(JSON.stringify(paawards, null, 2));
	}
	else {
		console.log("Paawards is empty");
		return response.sendStatus(404);	
	}
	
});
app.get(BASE_API_PATH + '/paawards/loadInitialData', (request, response) => {
	response.send(JSON.stringify(initPaawards, null, 2));
});

//POST a la lista de recursos
app.post(BASE_API_PATH + '/paawards', (request, response) => {
	var newPaaward = request.body;
	for (var newp of newPaaward){
		console.log(`New paaward to be added: ${newp.name}`);
	}
	paawards.push(newPaaward);
	response.sendStatus(201);
});

//GET a un recurso
app.get(BASE_API_PATH + '/paawards/:country/:year', (request, response) => {
	var country=request.params.country;
	var year=parseInt(request.params.year);
	console.log(`GET to a resource given a country(${country}) and a year(${year})`);
	for(var resource of paawards[0]){
		if (resource.country == country && resource.year == year) {
			return response.status(200).json(resource);
		}
	}
    return response.sendStatus(404);
});

//DELETE a un recurso
app.delete(BASE_API_PATH + '/paawards/:country/:year', (request, response) => {
	var country=request.params.country;
	var year=parseInt(request.params.year);
	console.log(`DELETE a resource given a country(${country}) and a year(${year})`);
	if (paawards.length!=0){
		for(var i=0;i<paawards[0].length;i++){
			if (paawards[0][i]["country"] == country && paawards[0][i]["year"] == year) {
				paawards[0].splice(i,1);
				return response.status(200);
			}
		}
	}
});

//PUT a un recurso
app.put(BASE_API_PATH + '/paawards/:country/:year', (request, response) => {
	var country=request.params.country;
	var year=parseInt(request.params.year);
	var putPaaward = request.body;
	console.log(`PUT a resource given a country(${country}) and a year(${year})`);
	if (paawards.length!=0){
		if (!putPaaward.name || !putPaaward.year || !putPaaward.sport || !putPaaward.country || !putPaaward.age || !putPaaward.gender || !putPaaward.trophy){
			console.log('El numero de parametros es incorrecto');
			return response.sendStatus(400);
		}
		else {
			for(var i=0;i<paawards[0].length;i++){
				if (paawards[0][i]["country"] == country && paawards[0][i]["year"] == year){
					if (putPaaward.country != country){
						console.log('El pais indicado en el enlace no coincide con el json');
						return response.sendStatus(403);	
					}
					else if (putPaaward.year != year){
						console.log('El pais indicado en el enlace no coincide con el json');
						return response.sendStatus(403);
					}
					else{
						paawards[0][i]['country'] = country;
						paawards[0][i]['year'] = year;
						paawards[0][i]['name'] = putPaaward['name'];
						paawards[0][i]['sport'] = putPaaward['sport'];
						paawards[0][i]['age'] = putPaaward['age'];
						paawards[0][i]['gender'] = putPaaward['gender'];
						paawards[0][i]['trophy'] = putPaaward['trophy'];
						return res.sendStatus(200);
					}
				}
			}
		}	
	}
});

//POST a un recurso (error)
app.post(BASE_API_PATH + '/paawards/:country/:year', (request, response) => {
	console.log("POST a resource is not allowed");
	return response.sendStatus(405);
});

//PUT a la lista de recursos (error)
app.put(BASE_API_PATH + '/paawards', (request, response) => {
	console.log("PUT a resource list is not allowed");
	return response.sendStatus(405);
});

//DELETE a la lista de recursos
app.delete(BASE_API_PATH + '/paawards', (request, response) => {;
	console.log(`DELETE paawards`);
	if (paawards.length!=0){
		paawards[0].splice(0,paawards[0].length);
		return response.status(200);
		
	}
});

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

var initGrmys=[];

app.get(BASE_API_PATH + '/grmys', (request, response) => {
	if(initGrmys.length!=0){
		return response.send(JSON.stringify(initGrmys, null, 2));
	}else {
		console.log("No data found");
		return response.sendStatus(404);
	  }

	  return response.sendStatus(200)
    
});
var initGrmys = [
    {
        "ranking": 1,
        "name": "the beatles",
        "award": 28,
        "country": "england",
        "group-member": 4,
        "style": "rock",
        "year": 1960
    },
    {
        "ranking": 2,
        "name": "u2",
        "award": 22,
        "country": "england",
        "group-member": 4,
        "style": "rock",
        "year": 1976
    },
];
app.get(BASE_API_PATH + '/grmys/loadInitialData', (request, response) => {
    response.send(JSON.stringify(initGrmys, null, 2));
});

app.post(BASE_API_PATH + '/grmys', (request, response) => {
    var newGrmys = request.body;
    console.log(`New grmy to be added: <${JSON.stringify(newGrmys, null, 2)}>`);
    initGrmys.push(newGrmys);
    response.sendStatus(201);
});

app.get(BASE_API_PATH + '/grmys/:country/:year', (request, response) => {
	var country=request.params.country;
	var year=parseInt(request.params.year);
	console.log(`GET stat by country: <${country}> and foundation-year: <${year}>`);
	for(var stat of initGrmys){
		if (stat.country === country && stat.year === year) {
			
			return response.status(200).json(stat);
		  }
	}
	
	

    return response.sendStatus(404);
});
/*app.delete(BASE_API_PATH + '/grmys/:country/:year', (request, response) => {
	var country=request.params.country;
	var year=parseInt(request.params.year);
  
	for (var i = 0; i < initGrmys.length; i++) {
	  if (initGrmys[i]["country"] === country && initGrmys[i]["year"] === year) {
		initGrmys.splice(i, 1);
		return res.sendStatus(200);
	  }
	}
  
	return res.sendStatus(404);
  });*/
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
