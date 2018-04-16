var express = require('express');
var bodyParser = require('body-parser');
var logService = require('./api/logService');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/list/:name', function(req, res) {			
	res.send(logService.showLogForName(req.params.name));
});

app.get('/list', function(req, res) {
    res.send(logService.showLog());
});

app.post('/message', function(req, res) {
    var messageDetails = {
        user: req.body.userName,
        message: req.body.message
    }
    logService.addMessage(messageDetails);
    res.send(messageDetails);
});

app.listen(port);