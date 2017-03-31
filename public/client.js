$(function () {
	var socket = io()
	var username

	var $messages = $('#messages')



	if (username != null) {
	} else {
		username = prompt("Enter your real name", "Ian Rothery")
	}
		socket.emit('add user', username)
	// tell server you are here
	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});

	// Socket events

	socket.on('chat message', function(data){
		addChatMessage(data.message, data.username)
	})
	
	socket.on('user joined', function (data) {
		addLogMessage(data.username + " joined")
	})

	 // Whenever the server emits 'login', log the login message
  	socket.on('login', function (data) {
		connected = true;
		// Display the welcome message
		var message = "Welcome to the Chat – We now have " + data.numUsers + " users"
		addLogMessage(message)
	});

	// library for outputting any message
	function addChatMessage (message, user) {
		var $el = $('<li>').addClass('chat-message').text(message);
		$messages.append($el);
	
	}
	
	function addLogMessage (message, user) {
		var $el = $('<li>').addClass('log-message').text(message);
		$messages.append($el);
	}

});

