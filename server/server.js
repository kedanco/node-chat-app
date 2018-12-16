const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
console.log(__dirname + "../public");
console.log(publicPath);

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
	console.log("new user connected");

	socket.emit("newMessage", {
		from: "Admin",
		text: "Welcome to Node Chat App",
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit("newMessage", {
		from: "Admin",
		text: "A new user has joined the chat",
		createdAt: new Date().getTime()
	});

	// socket.on("createMessage", message => {
	// 	console.log("createMessage", message);
	// 	// io.emit("newMessage", {
	// 	// 	from: message.from,
	// 	// 	text: message.text,
	// 	// 	createdAt: new Date().getTime()
	// 	// });

	// 	socket.broadcast.emit("newMessage", {
	// 		from: message.from,
	// 		text: message.text,
	// 		createdAt: new Date().getTime()
	// 	});
	// });

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});
