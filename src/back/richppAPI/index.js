var Datastore = require("nedb");
var path = require("path");

var dbfile = path.join(__dirname, "richpp.db");
var db = new Datastore({ filename: dbfile, autoload: true });

const request = require("request");
var BASE_API_PATH_RICHPP = '/api/v2';

/*Codigo --- Manuel*/
var richpp = [];

var initRichpp = [
    { "top": "1", "name": "Jeff Bezos", "fortune": "113", "age": "56", "country": "EEUU", "year": "2020", "company": "Amazon" },
    { "top": "2", "name": "Bill Gates", "fortune": "98", "age": "64", "country": "EEUU", "year": "2020", "company": "Microsoft" },
    { "top": "3", "name": "Bernard Arnault", "fortune": "76", "age": "71", "country": "France", "year": "2020", "company": "LVMH" },
    { "top": "1", "name": "Jeff Bezos", "fortune": "131", "age": "55", "country": "EEUU", "year": "2019", "company": "Amazon" },
    { "top": "2", "name": "Bill Gates", "fortune": "96.5", "age": "63", "country": "EEUU", "year": "2019", "company": "Microsoft" },
    { "top": "3", "name": "Warren Buffett", "fortune": "82.5", "age": "88", "country": "EEUU", "year": "2019", "company": "Berkshire Hathaway" },
    { "top": "1", "name": "Jeff Bezos", "fortune": "112", "age": "54", "country": "EEUU", "year": "2018", "company": "Amazon" },
    { "top": "2", "name": "Bill Gates", "fortune": "90", "age": "62", "country": "EEUU", "year": "2018", "company": "Microsoft" },
    { "top": "3", "name": "Warren Buffett", "fortune": "84", "age": "87", "country": "EEUU", "year": "2018", "company": "Berkshire Hathaway" },
    { "top": "1", "name": "Bill Gates", "fortune": "86", "age": "61", "country": "EEUU", "year": "2017", "company": "Microsoft" },
    { "top": "2", "name": "Warren Buffett", "fortune": "75.6", "age": "86", "country": "EEUU", "year": "2017", "company": "Berkshire Hathaway" },
    { "top": "3", "name": "Jeff Bezos", "fortune": "72.8", "age": "53", "country": "EEUU", "year": "2017", "company": "Amazon" },
    { "top": "1", "name": "Bill Gates", "fortune": "75", "age": "60", "country": "EEUU", "year": "2016", "company": "Microsoft" },
    { "top": "2", "name": "Amancio Ortega", "fortune": "67", "age": "79", "country": "Spain", "year": "2016", "company": "Inditex" },
    { "top": "3", "name": "Warren Buffett", "fortune": "60.8", "age": "85", "country": "EEUU", "year": "2016", "company": "Berkshire Hathaway" }
];

module.exports.register = (app) => {

    db.remove({}, { multi: true });

    //GET a initRichpp
    app.get(BASE_API_PATH_RICHPP + '/richpp/loadInitialData', (request, response) => {
        console.log('-------------------------------------');
        console.log("GET a initRichpp");
        db.insert(initRichpp);
        console.log(`Initial data: <${JSON.stringify(initRichpp, null, 2)}>`);
        response.sendStatus(200);
    });

    //GET recursos por columna usando nedb
    app.get(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        console.log('-------------------------------------');
        var query = request.query;

        //Obtenemos los offset y limit de la query
        var offset = query.offset;
        var limit = query.limit;

        //Los quitamos de la query 
        delete query.offset;
        delete query.limit;

        db.find(query).skip(offset).limit(limit).exec((err, data) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            } else if (data.length == 0) {
                console.error("No data found");
                response.sendStatus(404);
            } else {
                data.forEach((d) => {
                    delete d._id;
                });
                response.send(JSON.stringify(data, null, 2));
                console.log("Data sent:" + JSON.stringify(data, null, 2));
            }
        });
    });

    //GET a un recurso (obtener dato por top y nombre) usando nedb
    app.get(BASE_API_PATH_RICHPP + '/richpp/:top/:name', (request, response) => {
        console.log('-------------------------------------');
        var top = request.params.top;
        var name = request.params.name;
        var query = { "top": top, "name": name };

        db.find(query, { multi: true }).exec((err, data) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            } else if (data.length >= 1) {
                delete data[0]._id;
                response.status(200).send(JSON.stringify(data[0], null, 2));
                console.log("Data sent:" + JSON.stringify(data[0], null, 2));
            } else {
                response.sendStatus(404);
                console.log("The data requested is empty");
            }
        });
    });

    //GET a un recurso (obtener dato por nombre y año) usando nedb
    app.get(BASE_API_PATH_RICHPP + '/richpp/:name/:year', (request, response) => {
        console.log('-------------------------------------');
        var name = request.params.name;
        var year = request.params.year;
        var query = { "name": name, "year": year };

        db.find(query, { multi: true }).exec((err, data) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            } else if (data.length >= 1) {
                delete data[0]._id;
                response.status(200).send(JSON.stringify(data[0], null, 2));
                console.log("Data sent:" + JSON.stringify(data[0], null, 2));
            } else {
                response.sendStatus(404);
                console.log("The data requested is empty");
            }
        });
    });

    //GET a un recurso (obtener dato por pais y año) usando nedb
    app.get(BASE_API_PATH_RICHPP + '/richpp/:country/:year', (request, response) => {
        console.log('-------------------------------------');
        var country = request.params.country;
        var year = request.params.year;
        var query = { "country": country, "year": year };

        db.find(query, { multi: true }).exec((err, data) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            } else if (data.length >= 1) {
                delete data[0]._id;
                response.status(200).send(JSON.stringify(data[0], null, 2));
                console.log("Data sent:" + JSON.stringify(data[0], null, 2));
            } else {
                response.sendStatus(404);
                console.log("The data requested is empty");
            }
        });
    });

    //GET a un recurso (obtener dato nombre) usando nedb
    app.get(BASE_API_PATH_RICHPP + '/richpp/:name', (request, response) => {
        console.log('-------------------------------------');
        var name = request.params.name;

        db.find({ name: name }).exec((err, data) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            } else if (data.length >= 1) {
                delete data[0]._id;
                response.status(200).send(JSON.stringify(data[0], null, 2));
                console.log("Data sent:" + JSON.stringify(data[0], null, 2));
            } else {
                response.sendStatus(404);
                console.log("The data requested is empty");
            }
        });
    });

    //POST a richhpp usando nedb
    app.post(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        console.log('-------------------------------------');
        console.log("POST a initRichpp");
        var newData = request.body;
        var top = request.body.top;
        var name = request.body.name;

        db.find({ "top": top, "name": name }).exec((err, data) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            } else if (data.length == 0) {
                if (!newData.top || !newData.name || !newData['fortune'] || !newData["age"] || !newData['country']
                    || !newData['year'] || !newData["company"] || Object.keys(newData).length != 7) {
                    console.log("The data is not correctly provided");
                    return response.sendStatus(400);
                } else {
                    console.log("Data imput:" + JSON.stringify(newData, null, 2));
                    db.insert(newData);
                    response.sendStatus(201);
                }
            } else {
                response.sendStatus(409);
                console.log("There is already a resource with that country and year in the DB");
            }
        });
    });

    //DELETE a un recurso (eliminar dato por pais y año) usando nedb
    app.delete(BASE_API_PATH_RICHPP + '/richpp/:country/:year', (request, response) => {
        console.log('-------------------------------------');
        var country = request.params.country;
        var year = request.params.year;

        db.remove({ country: country, year: year }, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            } else if (numRemoved == 0) {
                response.sendStatus(404);
                console.log("There is no such data in the database");
            } else {
                response.sendStatus(200);
                console.log("Object removed");
            }
        });
    });

    //DELETE a un recurso (eliminar dato por nombre) usando nedb
    app.delete(BASE_API_PATH_RICHPP + '/richpp/:name', (request, response) => {
        console.log('-------------------------------------');
        var name = request.params.name;

        db.remove({ name: name }, (err, numRemoved) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            } else if (numRemoved == 0) {
                response.sendStatus(404);
                console.log("There is no such data in the database");
            } else {
                response.sendStatus(200);
                console.log("Object removed");
            }
        });
    });

    //DELETE a un recurso (eliminar dato por nombre y año) usando nedb
    app.delete(BASE_API_PATH_RICHPP + '/richpp/:name/:year', (request, response) => {
        console.log('-------------------------------------');
        var name = request.params.name;
        var year = request.params.year;

        db.remove({ name: name, year: year }, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                response.sendStatus(500);
            } else if (numRemoved == 0) {
                response.sendStatus(404);
                console.log("There is no such data in the database");
            } else {
                response.sendStatus(200);
                console.log("Object removed");
            }
        });
    });

    //PUT a un recurso (actualizar dato por top y año)
    app.put(BASE_API_PATH_RICHPP + '/richpp/:top/:year', (request, response) => {
        console.log('-------------------------------------');
        var newData = request.body;
        var top = request.body.top;
        var year = request.body.year;
        var query = { "top": top, "year": year };

        if (!newData.top || !newData['name'] || !newData['fortune'] || !newData["age"] || !newData['country']
            || !newData.year || !newData["company"] || Object.keys(newData).length != 7) {
            console.log("The data is not correctly provided");
            return response.sendStatus(400);
        } else {
            db.update(query, newData, (err, datoCambio) => {
                if (err) {
                    console.error("ERROR accesing DB in PUT");
                    response.sendStatus(500);
                } else if (datoCambio == 0) {
                    response.sendStatus(404);
                    console.log("There is no such data in the database");
                } else {
                    response.sendStatus(200);
                    console.log("Database updated");
                }
            });
        }
    });

    //PUT a un recurso (actualizar dato por top y nombre)
    app.put(BASE_API_PATH_RICHPP + '/richpp/:top/:name', (request, response) => {
        console.log('-------------------------------------');
        var newData = request.body;
        var top = request.body.top;
        var name = request.body.name;
        var query = { "top": top, "name": name };

        if (!newData.top || !newData.name || !newData['fortune'] || !newData["age"] || !newData['country']
            || !newData["year"] || !newData["company"] || Object.keys(newData).length != 7) {
            console.log("The data is not correctly provided");
            return response.sendStatus(400);
        } else {
            db.update(query, newData, (err, datoCambio) => {
                if (err) {
                    console.error("ERROR accesing DB in PUT");
                    response.sendStatus(500);
                } else if (datoCambio == 0) {
                    response.sendStatus(404);
                    console.log("There is no such data in the database");
                } else {
                    response.sendStatus(200);
                    console.log("Database updated");
                }
            });
        }
    });

    //PUT a un recurso (actualizar dato por top y nombre)
    app.put(BASE_API_PATH_RICHPP + '/richpp/:name/:year', (request, response) => {
        console.log('-------------------------------------');
        var newData = request.body;
        var name = request.body.name;
        var year = request.body.year;
        var query = { "name": name, "year": year };

        if (!newData["top"] || !newData.name || !newData['fortune'] || !newData["age"] || !newData['country']
            || !newData.year || !newData["company"] || Object.keys(newData).length != 7) {
            console.log("The data is not correctly provided");
            return response.sendStatus(400);
        } else {
            db.update(query, newData, (err, datoCambio) => {
                if (err) {
                    console.error("ERROR accesing DB in PUT");
                    response.sendStatus(500);
                } else if (datoCambio == 0) {
                    response.sendStatus(404);
                    console.log("There is no such data in the database");
                } else {
                    response.sendStatus(200);
                    console.log("Database updated");
                }
            });
        }
    });

    //PUT a un recurso (actualizar dato por nombre)
    app.put(BASE_API_PATH_RICHPP + '/richpp/:name', (request, response) => {
        console.log('-------------------------------------');
        var newData = request.body;
        var name = request.body.name;
        var query = { "name": name };

        if (!newData['top'] || !newData.name || !newData['fortune'] || !newData["age"] || !newData['country']
            || !newData['year'] || !newData["company"] || Object.keys(newData).length != 7) {
            console.log("The data is not correctly provided");
            return response.sendStatus(400);
        } else {
            db.update(query, newData, (err, datoCambio) => {
                if (err) {
                    console.error("ERROR accesing DB in PUT");
                    response.sendStatus(500);
                } else if (datoCambio == 0) {
                    response.sendStatus(404);
                    console.log("There is no such data in the database");
                } else {
                    response.sendStatus(200);
                    console.log("Database updated");
                }
            });
        }
    })

    //PUT (metodo no permitido)
    app.put(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        console.log('-------------------------------------');
        console.log("PUT a resource list is not allowed");
        return response.sendStatus(405);
    });

    //POST a un recurso (metodo no permitido)
    app.post(BASE_API_PATH_RICHPP + '/richpp/:country/:year', (request, response) => {
        console.log('-------------------------------------');
        console.log("POST a resource is not allowed");
        return response.sendStatus(405);
    });

    //DELETE todo
    app.delete(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        console.log('-------------------------------------');
        db.remove({}, { multi: true }, (err, remove) => {
            if (err) {
                console.error("ERROR deleting DB resources");
                response.sendStatus(500);
            } else {
                if (remove >= 1) {
                    console.log('Deleted richmen');
                    response.sendStatus(200);
                } else {
                    response.sendStatus(404);
                    console.error("ERROR deleting DB resources");
                }
            }
        });
    });

    //POST a richhpp
    app.post(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        var newRichpp = request.body;
        console.log(`New grmy to be added: <${JSON.stringify(newRichpp, null, 2)}>`);
        initRichpp.push(newRichpp);
        response.sendStatus(201);
    });

    //GET a un recurso (obtener dato por pais y año)
    app.get(BASE_API_PATH_RICHPP + '/richpp/:name/:year', (request, response) => {
        var name = request.params.name;
        var year = request.params.year;
        console.log(`GET stat by name: <${name}> and year: <${year}>`);
        for (var stat of initRichpp) {
            if (stat.name === name && stat.year === year) {
                return response.status(200).json(stat);
            }
        }
        return response.sendStatus(404);
    });

    //GET a un recurso (obtener dato por pais y año)
    app.get(BASE_API_PATH_RICHPP + '/richpp/:country/:year', (request, response) => {
        var country = request.params.country;
        var year = request.params.year;
        console.log(`GET stat by country: <${country}> and year: <${year}>`);
        for (var stat of initRichpp) {
            if (stat.country === country && stat.year === year) {
                return response.status(200).json(stat);
            }
        }
        return response.sendStatus(404);
    });

    //DELETE a un recurso (eliminar dato por pais y año)
    app.delete(BASE_API_PATH_RICHPP + '/richpp/:country/:year', (request, response) => {
        var country = request.params.country;
        var year = request.params.year;

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
        } else {
            console.log('Richpp is empty');
            return response.sendStatus(404);
        }
    });

    //DELETE a un recurso (eliminar dato por nombre y año)
    app.delete(BASE_API_PATH_RICHPP + '/richpp/:name/:year', (request, response) => {
        var name = request.params.name;
        var year = request.params.year;

        if (initRichpp.length != 0) {
            for (var i = 0; i < initRichpp.length; i++) {
                if (initRichpp[i]["name"] == name && initRichpp[i]["year"] == year) {
                    console.log(`DELETE a resource given a name(${name}) and a year(${year})`);
                    initRichpp.splice(i, 1)
                    return response.sendStatus(200);
                }
            }
            console.log(`Not data with name(${name}) and year(${year})`);
            return response.sendStatus(404);
        } else {
            console.log('Richpp is empty');
            return response.sendStatus(404);
        }
    });

    //GET a richhpp
    app.get(BASE_API_PATH_RICHPP + '/richpp', (request, response) => {
        console.log('-------------------------------------');
        if (initRichpp.length != 0) {
            console.log("GET a richpp");
            response.send(JSON.stringify(initRichpp, null, 2));
            return response.sendStatus(200);
        } else {
            console.log("Richpp is empty");
            return response.sendStatus(404);
        }
    });

    app.use("/proxyHeroku", function(req, res) {
        console.log(`New Proxy call!`);

        var apiServeHost = "https://sos2021-22.herokuapp.com/"
        console.log(`apiServeHost = <${apiServeHost}>`);
        console.log(`url = <${url}>`);

        var url = apiServeHost + req.url;

        console.log(`piped: ${req.BASE_API_PATH_RICHPP}${req.url} -> ${url}`);

        req.pipe(request(url)).pipe(res);
    });
}
