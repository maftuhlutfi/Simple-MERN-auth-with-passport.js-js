// ------------------- IMPORTS ----------------------------
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const User = require("./models/User");

// ------------------- MONGOOSE CONNECT -----------------------
mongoose.connect(
	"mongodb+srv://maftuh:10mWwnjgR6IDjH71@cluster0.xof2c.mongodb.net/<dbname>?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log("Mongoose Is Connected");
	}
);
mongoose.set("useCreateIndex", true); 

// ------------------- MIDDLEWARE ------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost:3000", // <-- location of the react app were connecting to
		credentials: true,
	})
);
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(cookieParser(process.env.SECRET))
app.use(passport.initialize());
app.use(passport.session());

// ------------------ PASSPORT CONFIG --------------------
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// ------------------ ROUTES -------------------
/*app.post('/login', (req, res) => {
	const { username, password } = req.body;
	const user = new User({
		username,
		password
	})

	console.log(user);

	req.login(user, err => {
		if (err) {
			throw err;
		} else {
			passport.authenticate("local")(req, res, (err, user, info) => {
				if (!err) {
					res.status(200).send({ success: true, msg: "Successfully login.", user })
				} else {
					res.status(200).send({ success: false, msg: "User not found." })
				}
			});
		}
	})
})*/

app.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			throw err;
		}
		if (!user) {
			res.status(401).send(info);
		}
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.redirect('/user');
			});
		}
	})(req, res, next);
});

app.post("/register", (req, res, next) => {
	const { username, password } = req.body;

	User.register({username}, password, (err, user) => {
		if (err) {
			res.status(400).send(err);
		} else {
			passport.authenticate("local")(req, res, () => {
				res.status(200).send({ msg: "Successfully created and logged in.", user })
			})
		}
	})
})

app.get("/user", (req, res) => {
	console.log(req.user);
	res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

// ----------------- SERVER ------------------
app.listen(4000, () => {
	console.log("Server started at port 4000.");
})