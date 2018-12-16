let socket = io();

socket.on("connect", () => {
	console.log("connected to server");
});

socket.on("disconnect", () => {
	console.log("disconnected from server");
});

socket.on("newMessage", message => {
	console.log("New message", message);

	let li = jQuery("<li></li>");
	li.text(`${message.from}: ${message.text}`);

	jQuery("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
	let li = jQuery("<li></li>");
	let anchor = jQuery('<a target="_blank">My current location</a>');

	li.text(`${message.from}: `);
	anchor.attr("href", message.url);
	li.append(anchor);
	jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e) {
	e.preventDefault();

	let messageTextBox = jQuery("[name=message]");

	socket.emit(
		"createMessage",
		{
			from: "User",
			text: messageTextBox.val()
		},
		function() {
			messageTextBox.val("");
		}
	);
});

let locationButton = jQuery("#send-location");
locationButton.on("click", function(e) {
	if (!navigator.geolocation) {
		return alert("Geolocation not supported by your browser.");
	}

	locationButton.attr("disabled", "disabled").text("Sending Location...");

	navigator.geolocation.getCurrentPosition(
		function(position) {
			locationButton.removeAttr("disabled").text("Send Location");
			socket.emit("createLocationMessage", {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		},
		function(err) {
			locationButton.removeAttr("disabled").text("Send Location");
			alert("Unable to fetch location");
		}
	);
});
