var BASE_API_PATH_PAAWARDS = '/api/v1';
var Datastore = require("nedb");
var path = require ("path");
const dbFile = path.join(__dirname,"paawards.db");   
const dbPaawards = new Datastore({
    filename: dbFile,
    autoload:true
});

var paawards = [];
var initialPaawards = [
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
	
	dbPaawards.remove({}, { multi: true });

	//----------------------------------------------------------------------

	//Load Initial Data
	app.get(BASE_API_PATH_PAAWARDS + '/paawards/loadInitialData', (request, response) => {
		dbPaawards.remove({});
        dbPaawards.insert(initialPaawards);
        console.log("Initial Paawards is loaded: " + JSON.stringify(initialPaawards, null, 2));
		response.send(JSON.stringify(initialPaawards, null, 2));
	});

	//Búsquedas por todos los campos del recurso (GET)
	app.get(BASE_API_PATH_PAAWARDS + "/paawards",(request, response) => {
		if(request.query.year) request.query.year = parseInt(request.query.year);
		if(request.query.age) request.query.age = parseInt(request.query.age);
		if(request.query.trophy) request.query.trophy = parseInt(request.query.trophy);

		var parametros = request.query;
		console.log(parametros);
	   	let offset = null;
		let limit = null;

		if (request.query.offset) {
			offset = parseInt(request.query.offset);
			delete request.query.offset;
		}
		if (request.query.limit) {
			limit = parseInt(request.query.limit);
			delete request.query.limit;
		}		
	
		dbPaawards.find(parametros).skip(offset).limit(limit).exec((err, paawardsDB) => { 
			if (err){
				console.error("Error accessing DB in GET: "+err);
				response.sendStatus(500);
			}
			else {
				paawardsDB.forEach((c) => {delete c._id;});
		 		response.send(JSON.stringify(paawardsDB,null,2));
			}	
		});
	});

	//GET a un recurso
	app.get(BASE_API_PATH_PAAWARDS + '/paawards/:country/:year', (request, response) => {
		var country=request.params.country;
		var year=parseInt(request.params.year);
		dbPaawards.find({"country":country,"year":year},(err, paawardsDB) => { 
			if (err){
				console.error("Error accessing DB in GET: "+err);
				res.sendStatus(500);
			}
			else {
				if (paawardsDB.length != 0){
					paawardsDB.forEach((c) => {delete c._id;});
		 			response.send(JSON.stringify(paawardsDB[0],null,2));
					console.log(`GET to a resource given a country(${country}) and a year(${year})`);
				}
				else {
					response.sendStatus(404);
				} 
			}	
		});
	});

	//POST a la lista de recursos
	app.post(BASE_API_PATH_PAAWARDS + '/paawards', (request, response) => {
		var newPaaward = request.body;
		var name = request.body.name;
		var year = parseInt(request.body.year);
		dbPaawards.find({"name": name,"year": year}, (err, paawardsDB) => {
			if (err){
				console.error("Error accessing DB in POST: "+err);
				res.sendStatus(500);
			}
			else {
				if (paawardsDB.length == 0){
					if (!newPaaward.name || !newPaaward.year || !newPaaward['sport'] || !newPaaward['country'] ||
						!newPaaward['age'] || !newPaaward['gender'] || !newPaaward['trophy'] || Object.keys(newPaaward).length != 7) {
						console.log("The resource is not well built");
						response.sendStatus(400);
					}
					else {
						dbPaawards.insert(newPaaward);
						response.sendStatus(201);
						console.log(`New paaward to be added: ${JSON.stringify(newPaaward,null,2)}`);
					}
				}
				else {
					response.sendStatus(409);
				}	 
			}	
		});
	});

	//PUT a un recurso
	app.put(BASE_API_PATH_PAAWARDS+"/paawards/:country/:year", (req, res) =>{
		var country = req.params.country;
	  	var year =  parseInt(req.params.year);
	  	var updatePaaward = req.body;
	
		dbPaawards.update({country: country, year: year}, updatePaaward, (err, numRemoved) => {
			if(err){
                console.error("Cannot update the resource using PUT" + err);
                response.sendStatus(500);
            }
			else {
				if (numRemoved == 0) {
					res.sendStatus(404);
				} else {
					console.log("Resource updated");
					res.sendStatus(200);
				}
			}	  
		});
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
	app.delete(BASE_API_PATH_PAAWARDS + '/paawards', (request, response) => {
		dbPaawards.remove({}, { multi: true }, function (err, paawardsRemoved) {
			if (err){
				console.error("Error accessing DB in DELETE: "+err);
				response.sendStatus(500);
			}
			else {
				if (paawardsRemoved>=1) {
					response.sendStatus(200);
					console.log('Deleted paawards');
				}
				else {
					response.sendStatus(404);
				}
			}	
		});
	});

	//DELETE a un recurso
	app.delete(BASE_API_PATH_PAAWARDS + '/paawards/:country/:year', (request, response) => {
		var country=request.params.country;
		var year=parseInt(request.params.year);

		dbPaawards.remove({"country":country, "year":year}, { multi: true }, function (err, paawardsRemoved) {
			if (err){
				console.error("Error accessing DB in DELETE a resouce: "+err);
				response.sendStatus(500);
			}
			else {
				if (paawardsRemoved==1) {
					response.sendStatus(200);
					console.log(`DELETE a resource given a country(${country}) and a year(${year})`);
				}
				else {
					response.sendStatus(404);
				}
			}	
		});
	});

}