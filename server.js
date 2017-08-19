/*
	Imports
*/

var express 	= require('express');
var dotenv 		= require('dotenv').config();
var app 		= express();
var port 		= 3000;
var http 		= require("http").Server(app);
var path 		= require('path')
var passport 	= require('passport');
var Strategy 	= require('passport-facebook');
var db 			= require("mongojs")(process.env.MONGO_URI);
var $users 		= db.collection("users");
var $polls 		= db.collection("polls");
var bp 			= require('body-parser');
var cp 			= require('cookie-parser');
var session 	= require('express-session');
var id 			= require('ez-uuid');

/*
	DB Events
*/

db.on("connect", () => {
	console.log("[MONGO] Connected to MongoDB");
});

db.on("error", (err) => {
	console.log("[MONGO] Could not connect to MongoDb");
});

/*
	Passport
*/

passport.use(new Strategy({
	clientID: process.env.FBID,
	clientSecret: process.env.FBSECRET,
	callbackURL: "/auth/facebook/return",
	profileFields: ['email', 'first_name', 'last_name']
}, (accessstoken, refreshtoken, profile, cb) => {
	console.log(profile);
	return cb(null, profile)
}));

passport.serializeUser(function(user, cb) {
 	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
 	cb(null, obj);
});

/*
	Middlewares
*/	

app.use(cp());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(session({
	secret: process.env.SESSECRET,
	resave: true,
	saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, "dist")));
app.use(passport.initialize());
app.use(passport.session());

/* 
	Routes
*/

app.get("/", (req, res) => {

});

app.get("/auth/facebook", passport.authenticate('facebook', { scope: ['email'] }));

app.get("/auth/facebook/return", passport.authenticate('facebook', { failureRedirect: "/" }), (req, res) => {
	res.redirect("/auth/facebook/rollback");
});

app.get("/auth/facebook/rollback", (req, res, next) => {
	if(req.isAuthenticated()) {
		$users.findOne({
			email: req.user.emails[0].value
		}, (err, docs) => {
			if (err) throw err;
			if(!docs) {
				$users.insert({
					id: req.user.id,
					firstname: req.user._json.first_name,
					lastname: req.user._json.last_name,
					email: req.user._json.email
				}, (err, docs) => {
					if(err) throw err;
				});
			}
		});
	}
	res.redirect("/");
});

app.get("/auth", (req, res) => {
	if(req.isAuthenticated()) {
		res.json(req.user);
	} else {
		res.end();
	}
});

app.get("/polls", (req, res) => {
	if(req.isAuthenticated()) {
		$polls.find({
			creator: req.user.id
		}, (err, docs) => {
			if (err) {
				throw err;
			}
			res.json(docs);
		})
	} else {
		res.sendStatus(401);
	}
});

app.get("/getpost", (req, res) => {
	$polls.find({}, (err, docs) => {
		if (err) {
			throw err;
		} 
		res.json(docs);
	});
});

app.post("/newpoll", (req, res) => {
	if(req.isAuthenticated()) {
		$polls.insert({
			creator: req.body.id,
			title: req.body.title,
			id: id.alphanum({prefix: "pid", length: 50, parts: 5}),
			options: req.body.options
		}, (err, docs) => {
			if (err) throw err;
			res.status(200);
		});
	} else {
		res.sendStatus(401); // Unauth
	}
});


/* 
	Server
*/

http.listen(port, () => {
	console.log("[SERVER] Server running at port " + 3000);
});