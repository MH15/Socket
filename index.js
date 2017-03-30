var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

var port = process.env.PORT || 3000;
var people = {}
var numUsers = 0;

app.use(express.static(__dirname + '/public'));

server.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  console.log('/index.html');
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html')
});

io.on('connection', function(socket){
	var addedUser = false;

	socket.on('chat message', function(msg){
		// io.emit('chat message', msg)
		// echo globally (all clients) that a person has connected
   	io.emit('chat message', {
   		userName: socket.userName,
   		msg: msg
   	});
		console.log("message: " + msg)
	});

	// user added!
	socket.on('add user', function (userName) {
  		++numUsers
  		socket.userName = userName
  		console.log(userName + " joined")
   	// echo globally (all clients) that a person has connected
   	socket.broadcast.emit('user joined', {
   		userName: socket.userName,
   		numUsers: numUsers
   	});
	});

});

io.emit('some event', { for: 'everyone' })

