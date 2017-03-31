var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

var port = process.env.PORT || 3000;
var people = {}
var numUsers = 0;

app.use(express.static(__dirname + '/public'));

server.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html')
});

io.on('connection', function(socket){
	var addedUser = false;

  // user added!
  socket.on('add user', function (username) {
    ++numUsers
    socket.username = username
    console.log("NEW USER: @" + username + " joined")
    
    socket.emit('login', {
      numUsers: numUsers
    });

    // send to everyone except current user
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });


	socket.on('chat message', function(msg){
		// io.emit('chat message', msg)
		// echo globally (all clients) that a person has sent a message
   	io.sockets.emit('chat message', {
   		username: socket.username,
   		message: msg
   	});
		console.log("NEW MESSAGE: @" + socket.userNnme + ": " + msg)
	});

	
  

});

io.emit('some event', { for: 'everyone' })

