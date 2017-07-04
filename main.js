var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 3000;


app.use("/", express.static(__dirname + '/site/'));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/site/index.html');
});

io.sockets.on('connection', function (socket) {
	console.log("New connection");
});

app.listen(port, function () {
	console.log("live");
})