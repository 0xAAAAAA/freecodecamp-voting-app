var express = require('express');
var dotenv = require('dotenv').config();
var app = express();
var port = 3000;
var http = require("http").Server(app);
var path = require('path')
var passport = require('passport');
var Strategy = require('passport-facebook');
var db = require("mongojs")(process.env.MONGO_URI);
var $users = db.collection("users");
var $polls = db.collection("polls");
var io = require('socket.io')(http);


io.on("connect", (socket) => {
	console.log("[SOCKET] A User connected");



	socket.on("disconnect", () => {
		console.log("[SOCKET] A User Disconnected");
	});
})

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {

});










http.listen(port, () => {
	console.log("[SERVER] Server running at port " + 3000);
});