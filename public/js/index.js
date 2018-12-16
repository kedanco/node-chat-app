let socket = io();

socket.on("connect", () => {
	console.log("connected to server");

	socket.emit("createMessage", {
		from: "Adrian",
		text: "Daddy SHARK DUDUDUDUDUD"
	});
});

socket.on("disconnect", () => {
	console.log("disconnected from server");
});

socket.on("newMessage", message => {
	console.log("New message", message);
});
