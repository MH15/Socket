$(function () {
	var socket = io();
	var userName;
	if (userName != null) {
	} else {
		userName = prompt("Enter your real name", "Ian Rothery")
	}
		socket.emit('add user', userName)
	// tell server you are here
	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});
	socket.on('chat message', function(data){
		log(data.userName + ": " + data.msg)
	});
		// Adds the visual chat typing message
	socket.on('user joined', function (data) {
		log(data.userName + " joined")
	})


});

// library for outputting any message
function log (message) {
	$('#messages').append($('<li>').text(message))
}