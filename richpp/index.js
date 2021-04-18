var BASE_API_PATH_RICHPP = '/api/v1';

/*Codigo --- Manuel*/
var richpp = [];

var initRichpp = [
    { "top": 1, "name": "Jeff Bezos", "fortune": 113, "age": 56, "country": "EEUU", "year": 2020, "company": "Amazon" },
    { "top": 2, "name": "Bill Gates", "fortune": 98, "age": 64, "country": "EEUU", "year": 2020, "company": "Microsoft" },
    { "top": 3, "name": "Bernard Arnault", "fortune": 76, "age": 71, "country": "France", "year": 2020, "company": "LVMH" },
    { "top": 1, "name": "Jeff Bezos", "fortune": 131, "age": 55, "country": "EEUU", "year": 2019, "company": "Amazon" },
    { "top": 2, "name": "Bill Gates", "fortune": 96.5, "age": 63, "country": "EEUU", "year": 2019, "company": "Microsoft" },
    { "top": 3, "name": "Warren Buffett", "fortune": 82.5, "age": 88, "country": "EEUU", "year": 2019, "company": "Berkshire Hathaway" },
    { "top": 1, "name": "Jeff Bezos", "fortune": 112, "age": 54, "country": "EEUU", "year": 2018, "company": "Amazon" },
    { "top": 2, "name": "Bill Gates", "fortune": 90, "age": 62, "country": "EEUU", "year": 2018, "company": "Microsoft" },
    { "top": 3, "name": "Warren Buffett", "fortune": 84, "age": 87, "country": "EEUU", "year": 2018, "company": "Berkshire Hathaway" },
    { "top": 1, "name": "Bill Gates", "fortune": 86, "age": 61, "country": "EEUU", "year": 2017, "company": "Microsoft" },
    { "top": 2, "name": "Warren Buffett", "fortune": 75.6, "age": 86, "country": "EEUU", "year": 2017, "company": "Berkshire Hathaway" },
    { "top": 3, "name": "Jeff Bezos", "fortune": 72.8, "age": 53, "country": "EEUU", "year": 2017, "company": "Amazon" },
    { "top": 1, "name": "Bill Gates", "fortune": 75, "age": 60, "country": "EEUU", "year": 2016, "company": "Microsoft" },
    { "top": 2, "name": "Amancio Ortega", "fortune": 67, "age": 79, "country": "Spain", "year": 2016, "company": "Inditex" },
    { "top": 3, "name": "Warren Buffett", "fortune": 60.8, "age": 85, "country": "EEUU", "year": 2016, "company": "Berkshire Hathaway" }
];

module.exports.register = (app) => {

    //GET a richhpp
    app.get(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        console.log('-------------------------------------');
        if (initRichpp.length != 0) {
            console.log("GET a richpp");
            response.send(JSON.stringify(initRichpp, null, 2));
        } else {
            console.log("Richpp is empty");
            return response.sendStatus(404);
        }
    });

    //GET a initRichpp
    app.get(BASE_API_PATH_RICHPP + '/richpp/loadInitialData', (request, response) => {
        console.log('-------------------------------------');
        console.log("GET a initRichpp");
        response.send(JSON.stringify(initRichpp, null, 2));
    });

    //POST a richhpp
    app.post(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        console.log('-------------------------------------');
        console.log("POST a initRichpp");
        var newRichpp = request.body;
        for (var resource of newRichpp) {
            console.log(`New richpp to be added: ${resource.name}`);
            initRichpp.push(resource);
        }
        response.sendStatus(201);
    });

    //DELETE a un recurso (eliminar dato por pais y año)
    app.delete(BASE_API_PATH_RICHPP + '/richpp/:country/:year', (request, response) => {
        console.log('-------------------------------------');
        var country = request.params.country;
        var year = parseInt(request.params.year);
        if (initRichpp.length != 0) {
            for (var i = 0; i < initRichpp.length; i++) {
                if (initRichpp[i]["country"] == country && initRichpp[i]["year"] == year) {
                    console.log(`DELETE a resource given a country(${country}) and a year(${year})`);
                    initRichpp.splice(i, 1)
                    return response.sendStatus(200);
                }
            }
            console.log(`Not data with country(${country}) and year(${year})`);
            return response.sendStatus(404);
        }
        else {
            console.log('Richpp is empty');
            return response.sendStatus(404);
        }
    });

    //PUT a un recurso (actualizar dato por pais y año)
    app.put(BASE_API_PATH_RICHPP + '/richpp/:country/:year', (request, response) => {
        console.log('-------------------------------------');
        var country = request.params.country;
        var year = parseInt(request.params.year);
        var putRichpp = request.body;
        console.log(`PUT a resource given a country(${country}) and a year(${year})`);
        if (richpp.length != 0) {
            if (!putRichpp.top || !putRichpp.name || !putRichpp.fortune || !putRichpp.age || !putRichpp.country || !putRichpp.year || !putRichpp.company) {
                console.log('El numero de parametros es incorrecto');
                return response.sendStatus(400);
            }
            else {
                for (var i = 0; i < richpp[0].length; i++) {
                    if (richpp[0][i]["country"] == country && richpp[0][i]["year"] == year) {
                        if (putRichpp.country != country) {
                            console.log('El pais indicado en el enlace no coincide con el json');
                            return response.sendStatus(403);
                        }
                        else if (putRichpp.year != year) {
                            console.log('El pais indicado en el enlace no coincide con el json');
                            return response.sendStatus(403);
                        }
                        else {
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

    //GET a un recurso (eliminar dato por pais y año)
    app.get(BASE_API_PATH_RICHPP + '/richpp/:country/:year', (request, response) => {
        console.log('-------------------------------------');
        var country = request.params.country;
        var year = parseInt(request.params.year);
        console.log(`GET to a resource given a country(${country}) and a year(${year})`);
        for(var resource of richpp){
            if (resource.country == country && resource.year == year) {
                return response.status(200).json(resource);
            }
        }
        return response.sendStatus(404);
    });

    //POST a un recurso (error 405)
    app.post(BASE_API_PATH_RICHPP + '/richpp/:country/:year', (request, response) => {
        console.log('-------------------------------------');
        console.log("POST a resource is not allowed");
        return response.sendStatus(405);
    });

    //PUT a la lista de recursos (error 405)
    app.put(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        console.log('-------------------------------------');
        console.log("PUT a resource list is not allowed");
        return response.sendStatus(405);
    });

    //DELETE a la lista de recursos
    app.delete(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        console.log('-------------------------------------');
        console.log(`DELETE richpp`);
        if (richpp.length != 0) {
            richpp[0].splice(0, richpp[0].length);
            return response.status(200);
        }
    });

    //GET recursos por columna
    app.get(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        console.log('-------------------------------------');
        var search = {}

        //Búsqueda
        if (request.query.top) { 
            search["top"] = request.query.top; 
        } else if (request.query.name) { 
            search["name"] = request.query.name; 
        } else if (request.query.fortune) { 
            search["fortune"] = request.query.fortune; 
        } else if (request.query.age) { 
            search["age"] = request.query.age; 
        } else if (request.query.country) { 
            search["country"] = request.query.country; 
        } else if (request.query.year) { 
            search["year"] = request.query.year; 
        } else if (request.query.company) { 
            search["company"] = request.query.company; 
        }
        console.log(`GET to a resource given a query(${search})`);
        response.send(JSON.stringify(initRichpp, null, 2));

        return response.sendStatus(404);
    });
}
