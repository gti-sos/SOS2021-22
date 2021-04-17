var BASE_API_PATH_RICHPP = '/api/v1';

/*Codigo --- Manuel*/
var richpp = [];

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

module.exports.register = (app) => {

    //GET a la lista de recursos
    app.get(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        if (initRichpp.length != 0){
            console.log("Get Richpp")
            response.send(JSON.stringify(initRichpp, null, 2));
        }
        else {
            console.log("Richpp is empty");
            return response.sendStatus(404);	
        }
        
    });

    app.get(BASE_API_PATH_RICHPP + '/richpp/loadInitialData', (request, response) => {
        response.send(JSON.stringify(initRichpp, null, 2));
    });

    //POST a la lista de recursos
    app.post(BASE_API_PATH_RICHMAN + '/richpp', (request, response) => {
        var newRichpp = request.body;
        for (var newp of newRichpp){
            console.log(`New richpp to be added: ${newp.name}`);
            initRichpp.push(newp);
        }
        response.sendStatus(201);
    });

    //GET a un recurso
    app.get(BASE_API_PATH_RICHMAN + '/richpp/:country/:year', (request, response) => {
        var country = request.params.country;
        var year = parseInt(request.params.year);
        console.log(`GET to a resource given a country(${country}) and a year(${year})`);
        for(var resource of richpp[0]){
            if (resource.country == country && resource.year == year) {
                return response.status(200).json(resource);
            }
        }
        return response.sendStatus(404);
    });

    //DELETE a un recurso
    app.delete(BASE_API_PATH_RICHMAN + '/richpp/:country/:year', (request, response) => {
        var country = request.params.country;
        var year = parseInt(request.params.year);
        if (initRichpp.length != 0){
            for (var i = 0; i < initRichpp.length; i++){
                if(initRichpp[i]["country"]==country && initRichpp[i]["year"]==year){
                    console.log(`DELETE a resource given a country(${country}) and a year(${year})`);
                    initRichpp.splice(i,1)
                    return response.sendStatus(200);
                } 
            }
            console.log (`Not data with country(${country}) and year(${year})`);
            return response.sendStatus(404);
        }
        else {
            console.log ('Richpp is empty');
            return response.sendStatus(404);
        }
    });

    //PUT a un recurso
    app.put(BASE_API_PATH_RICHMAN + '/richpp/:country/:year', (request, response) => {
        var country = request.params.country;
        var year = parseInt(request.params.year);
        var putRichpp = request.body;
        console.log(`PUT a resource given a country(${country}) and a year(${year})`);
        if (richpp.length != 0){
            if (!putRichpp.top || !putRichpp.name || !putRichpp.fortune || !putRichpp.age || !putRichpp.country || !putRichpp.year || !putRichpp.company){
                console.log('El numero de parametros es incorrecto');
                return response.sendStatus(400);
            }
            else {
                for(var i = 0; i < richpp[0].length; i++){
                    if (richpp[0][i]["country"] == country && richpp[0][i]["year"] == year){
                        if (putRichpp.country != country){
                            console.log('El pais indicado en el enlace no coincide con el json');
                            return response.sendStatus(403);	
                        }
                        else if (putRichpp.year != year){
                            console.log('El pais indicado en el enlace no coincide con el json');
                            return response.sendStatus(403);
                        }
                        else{
                            richpp[0][i]['top'] = putRichpp['top'];
                            richpp[0][i]['name'] = putRichpp['name'];
                            richpp[0][i]['fortune'] = putRichpp['fortune'];
                            richpp[0][i]['age'] = putRichpp['age'];
                            richpp[0][i]['country'] = country;
                            richpp[0][i]['year'] = year;
                            richpp[0][i]['company'] = putRichpp['company'];

                            return res.sendStatus(200);
                        }
                    }
                }
            }	
        }
    });

    //POST a un recurso (error)
    app.post(BASE_API_PATH_RICHMAN + '/richpp/:country/:year', (request, response) => {
        console.log("POST a resource is not allowed");
        return response.sendStatus(405);
    });

    //PUT a la lista de recursos (error)
    app.put(BASE_API_PATH_RICHMAN + '/richpp', (request, response) => {
        console.log("PUT a resource list is not allowed");
        return response.sendStatus(405);
    });

    //DELETE a la lista de recursos
    app.delete(BASE_API_PATH_RICHMAN + '/richpp', (request, response) => {;
        console.log(`DELETE richpp`);
        if (richpp.length!=0){
            richpp[0].splice(0, richpp[0].length);
            return response.status(200);
        }
    });
}
