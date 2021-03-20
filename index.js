var cool = require('cool-ascii-faces');
var express = require('express');
var path = require('path');

var app = express();

var port = (process.env.port || 10000);

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/cool', (request, response) => {
    response.send(cool());
    console.log('New request to /cool has arrived');
});

app.get('/index', (request, response) => {
    response.send(express());       
    console.log('New request to /idex has arrived');
});

app.listen(port, () => {
    console.log(`Server ready listenig on port ${port}`);
});
