var BASE_API_PATH_PAAWARDS = '/api/v1';

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
	{"name":"Lance Armstrong","year":2000,"sport":"Ciclismo","country":"EE.UU","age":29,"gender":"Masculino","trophy":11},
];

module.exports.register = (app) => {
    
//GET a la lista de recursos
app.get(BASE_API_PATH_PAAWARDS + '/paawards', (request, response) => {
	if (initPaawards.length!=0){
		console.log("Get Paawards")
		response.send(JSON.stringify(initPaawards, null, 2));
	}
	else {
		console.log("Paawards is empty");
		return response.sendStatus(404);	
	}
	
});
app.get(BASE_API_PATH_PAAWARDS + '/paawards/loadInitialData', (request, response) => {
	response.send(JSON.stringify(initPaawards, null, 2));
});

//POST a la lista de recursos
app.post(BASE_API_PATH_PAAWARDS + '/paawards', (request, response) => {
	var newPaaward = request.body;
	for (var newp of newPaaward){
		console.log(`New paaward to be added: ${newp.name}`);
		initPaawards.push(newp);
	}
	response.sendStatus(201);
});

//GET a un recurso
app.get(BASE_API_PATH_PAAWARDS + '/paawards/:country/:year', (request, response) => {
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
app.delete(BASE_API_PATH_PAAWARDS + '/paawards/:country/:year', (request, response) => {
	var country=request.params.country;
	var year=parseInt(request.params.year);
	if (initPaawards.length!=0){
		for (var i=0; i<initPaawards.length;i++){
			if(initPaawards[i]["country"]==country && initPaawards[i]["year"]==year){
				console.log(`DELETE a resource given a country(${country}) and a year(${year})`);
				initPaawards.splice(i,1)
				return response.sendStatus(200);
			} 
		}
		console.log (`Not data with country(${country}) and year(${year})`);
		return response.sendStatus(404);
	}
	else {
		console.log ('Paawards is empty');
		return response.sendStatus(404);
	}
});

//PUT a un recurso
app.put(BASE_API_PATH_PAAWARDS + '/paawards/:country/:year', (request, response) => {
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
app.post(BASE_API_PATH_PAAWARDS + '/paawards/:country/:year', (request, response) => {
	console.log("POST a resource is not allowed");
	return response.sendStatus(405);
});

//PUT a la lista de recursos (error)
app.put(BASE_API_PATH_PAAWARDS + '/paawards', (request, response) => {
	console.log("PUT a resource list is not allowed");
	return response.sendStatus(405);
});

//DELETE a la lista de recursos
app.delete(BASE_API_PATH_PAAWARDS + '/paawards', (request, response) => {;
	console.log(`DELETE paawards`);
	if (paawards.length!=0){
		paawards[0].splice(0,paawards[0].length);
		return response.status(200);
		
	}
});

}

