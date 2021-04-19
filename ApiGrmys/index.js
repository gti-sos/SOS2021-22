    var Datastore = require("nedb");
	var path = require("path");
	
	var dbfile = path.join(__dirname, "grmys.db");
	var db = new Datastore({filename: dbfile, autoload: true});
	
	var BASE_API_PATH_GRMYS = '/api/v1';
	var initGrmys=[];
	
	
	var initGrmys = [
		{
			"ranking": "1",
			"name": "the beatles",
			"award": "28",
			"country": "england",
			"groupmember": "4",
			"style": "rock",
			"year": "1960"
		},
		{
			"ranking": "2",
			"name": "U2",
			"award": "22",
			"country": "england",
			"groupmember": "4",
			"style": "rock",
			"year": "1976"
		},
		{
			"ranking": "3",
			"name": "dixie chicks",
			"award": "13",
			"country": "EE.UU",
			"groupmember": "3",
			"style": "country",
			"year": "1989"
		},
		{
			"ranking": "4",
			"name": "foo fighters",
			"award": "12",
			"country": "EE.UU",
			"groupmember": "3",
			"style": "rock",
			"year": "1994"
		},
		{
			"ranking": "5",
			"name": "pat metheny group",
			"award": "10",
			"country": "EE.UU",
			"groupmember": "4",
			"style": "jazz",
			"year": "1977"
		},
		{
			"ranking": "6",
			"name": "the manhattan transfer",
			"award": "9",
			"country": "EE.UU",
			"groupmember": "3",
			"style": "folk",
			"year": "1972"
		},
		{
			"ranking": "7",
			"name": "the Blackwood brother",
			"award": "8",
			"country": "EE.UU",
			"groupmember": "5",
			"style": "gospel",
			"year": "1934"
		},
		{
			"ranking": "8",
			"name": "Metallica",
			"award": "8",
			"country": "EE.UU",
			"groupmember": "4",
			"style": "rock",
			"year": "1983"
		},
		{
			"ranking": "9",
			"name": "santana",
			"award": "8",
			"country": "EE.UU",
			"groupmember": "9",
			"style": "rock",
			"year": "1966"
		},
		{
			"ranking": "10",
			"name": "take 6",
			"award": "8",
			"country": "EE.UU",
			"groupmember": "6",
			"style": "gospel",
			"year": "1985"
		},
		{
			"ranking": "11",
			"name": "coldplay",
			"award": "7",
			"country": "england",
			"groupmember": "5",
			"style": "pop",
			"year": "1996"
		},
		{
			"ranking": "12",
			"name": "kentucky thunders",
			"award": "7",
			"country": "EE.UU",
			"groupmember": "6",
			"style": "bluegrass",
			"year": "1997"
		},
		{
			"ranking": "13",
			"name": "toto",
			"award": "7",
			"country": "EE.UU",
			"groupmember": "2",
			"style": "rock",
			"year": "1977"
		},
		{
			"ranking": "14",
			"name": "lady antebellum",
			"award": "7",
			"country": "EE.UU",
			"groupmember": "3",
			"style": "country",
			"year": "2006"
		},
		{
			"ranking": "15",
			"name": "simon & garfunkel",
			"award": "7",
			"country": "EE.UU",
			"groupmember": "2",
			"style": "folk",
			"year": "1957"
		},
		{
			"ranking": "16",
			"name": "the 5th dimension",
			"award": "6",
			"country": "EE.UU",
			"groupmember": "5",
			"style": "pop",
			"year": "1966"
		},
		{
			"ranking": "17",
			"name": "the black eyed peas",
			"award": "6",
			"country": "EE.UU",
			"groupmember": "4",
			"style": "pop",
			"year": "1992"
		},
		{
			"ranking": "18",
			"name": "the chieftains",
			"award": "6",
			"country": "ireland",
			"groupmember": "6",
			"style": "celta",
			"year": "1963"
		},
		{
			"ranking": "19",
			"name": "eagles",
			"award": "6",
			"country": "EE.UU",
			"groupmember": "3",
			"style": "rock",
			"year": "1971"
		},
		{
			"ranking": "20",
			"name": "earth,wind & fire",
			"award": "6",
			"country": "EE.UU",
			"groupmember": "9",
			"style": "fusion",
			"year": "1970"
		},
		{
			"ranking": "21",
			"name": "outkast",
			"award": "6",
			"country": "EE.UU",
			"groupmember": "2",
			"style": "hip-hop",
			"year": "1992"
		},
		{
			"ranking": "22",
			"name": "the police",
			"award": "6",
			"country": "england",
			"groupmember": "3",
			"style": "pop",
			"year": "1977"
		},
		{
			"ranking": "23",
			"name": "red hot chili peppers",
			"award": "6",
			"country": "EE.UU",
			"groupmember": "4",
			"style": "rock",
			"year": "1983"
		},
		{
			"ranking": "24",
			"name": "daft punk",
			"award": "6",
			"country": "french",
			"groupmember": "2",
			"style": "pop",
			"year": "1993"
		}
	];
  
  module.exports.register=(app)=>{
	
	db.remove({}, {multi: true});

	//cargamos los datos de la base de datos
    app.get(BASE_API_PATH_GRMYS + '/grmys/loadInitialData', (request, response) => {
		db.insert(initGrmys);
        console.log(`Initial data: <${JSON.stringify(initGrmys, null, 2)}>`);
        response.sendStatus(200);
    });
    
  
    //get usando nedb para todos los campos
	app.get(BASE_API_PATH_GRMYS + '/grmys', (request, response) => {
		
		var query = request.query;

        //Obtenemos los offset y limit de la query
        var offset = query.offset;
        var limit = query.limit;

        //Los quitamos de la query 
        delete query.offset;
        delete query.limit;

        db.find(query).skip(offset).limit(limit).exec((err, data) => {
            if(err){
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            }
            else{
                if(data.length == 0){
                    console.error("No data found");
                    response.sendStatus(404);
                }
                else{
                    data.forEach( (d) =>{
                    delete d._id;
                    });
                    response.send(JSON.stringify(data, null, 2));
                    console.log("Data sent:"+JSON.stringify(data, null, 2));
                }
            }
        });
    });
	//POST usando nedb 
	app.post(BASE_API_PATH_GRMYS + '/grmys', (request, response)=> {
        
        var newData = request.body;
        var ranking = request.body.ranking;
        var name = request.body.name;

        db.find({"ranking":ranking, "name":name}).exec((err, data)=>{
            if(err){
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            }else {
                if(data.length == 0){
                    if (!newData.ranking
						|| !newData.name
						|| !newData['award']
						|| !newData["country"] 
						|| !newData['groupmember'] 
						|| !newData['style'] 
                        || !newData["year"]                        
                        || Object.keys(newData).length != 7){
                        console.log("The data is not correctly provided");
                        return response.sendStatus(400);
                    }else{
                        console.log("Data imput:"+JSON.stringify(newData, null, 2));
                        db.insert(newData);
                        response.sendStatus(201);
                    }

                }else{
                    response.sendStatus(409);
                    console.log("There is already a resource with that country and year in the DB");
                }
            }

        });
	});
    //DELETE
	app.delete(BASE_API_PATH_GRMYS + '/grmys/:country/:year', (request, response) => {
        
        var country = request.params.country;
        var year = request.params.year;


        db.remove({country: country, year: year}, {multi:true}, (err, numRemoved) =>{
            if(err){
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            }
            else{
		        if(numRemoved == 0){
			        response.sendStatus(404);
			        console.log("There is no such data in the database");
	    	    }
		        else{
			        response.sendStatus(200);
			        console.log("Object removed");
		        }
            }
	    });
    });
	app.put(BASE_API_PATH_GRMYS + '/grmys/:ranking/:name', (request, response)=>{
        
        var newData = request.body;
        var ranking = request.body.ranking;
        var name = request.body.name;
	    var query = {"ranking":ranking, "name":name};
    
		if (!newData.ranking
			|| !newData.name
			|| !newData['award']
			|| !newData['country'] 
			|| !newData['groupmember'] 
			|| !newData['style'] 
			|| !newData['year']                        
			|| Object.keys(newData).length != 7){

            console.log("The data is not correctly provided");
            return response.sendStatus(400);
        }
        else {
            db.update(query,newData,(err,datoCambio) =>{
                if(err){
                    console.error("ERROR accesing DB in PUT");
                    response.sendStatus(500);
                }
                else{
                    if(datoCambio == 0){
                        response.sendStatus(404);
                        console.log("There is no such data in the database");
    
                    }
                    else{
                        response.sendStatus(200);
                        console.log("Database updated");
                    }
                }
            });
        }
    });
	app.delete(BASE_API_PATH_GRMYS + '/grmys', (request, response) => {
        
        
        db.remove({}, {multi: true },  (err, remove)=> {
            if (err) {
                console.error("ERROR deleting DB resources");
                response.sendStatus(500);
            } else {
                if (remove == 0) {
                    console.error("ERROR resources not found");
                    response.sendStatus(404);
                } else {
                    response.sendStatus(200);
                }
            }
        });
	});
	//-----------------------------------------------------------------------------------//
	app.post(BASE_API_PATH_GRMYS + '/grmys', (request, response) => {
        var newGrmys = request.body;
        console.log(`New grmy to be added: <${JSON.stringify(newGrmys, null, 2)}>`);
        initGrmys.push(newGrmys);
        response.sendStatus(201);
    });
	app.get(BASE_API_PATH_GRMYS + '/grmys/:country/:year', (request, response) => {
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
    app.delete(BASE_API_PATH_GRMYS + '/grmys/:country/:year', (request, response) => {
        var country=request.params.country;
        var year=parseInt(request.params.year);
      
        if (initGrmys.length!=0){
            for (var i=0; i<initGrmys.length;i++){
                if(initGrmys[i]["country"]==country && initGrmys[i]["year"]==year){
                    console.log(`DELETE a resource given a country(${country}) and a year(${year})`);
                    initGrmys.splice(i,1)
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
	app.get(BASE_API_PATH_GRMYS + '/grmys', (request, response) => {
		if(initGrmys.length!=0){
			
			return response.send(JSON.stringify(initGrmys, null, 2));
		}else {
			console.log("No data found");
			return response.sendStatus(404);
		  }
	
		  return response.sendStatus(200)
		
	});
  }