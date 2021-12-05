const route = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const userController = require("../controllers/userControllers");

route.get("/", (req, res) => {
	res.json({
		page: "Home",
	});
});

route.post("/register", userController.register);

route.post("/login", (req, res) => {
	User.findOne({
		where: {
			name: req.body.name,
		},
	})
		.then((data) => {
			if (data === null) {
				res.status(401).json({ messege: "Invalid Credentials" });
			} else {
				let compare = bcrypt.compareSync(req.body.password, data.password);
				if (compare == true) {
					let token = jwt.sign(data.toJSON(), "ini rahasia");
					res.status(200).json({ token: token });
				} else {
					res.status(401).json({ messege: "Invalid Credentials" });
				}
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

//middleware pengecekan auth token login
route.use((req, res, next) => {
	try {
		let token = req.headers.token;
		let decoded = jwt.verify(token, "secretkey");
		User.findOne({
			where: {
				name: decoded.name,
			},
		})
			.then((data) => {
				if (data !== null) {
					next();
				} else {
					res.status(401).json({ messege: "Invalid Credentials" });
				}
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	} catch (err) {
		console.log("error nih! jwt nya manaa!");
		res.status(500).json(err);
	}
});

route.get("/users", userController.getAll);

route.get("/users/:id", userController.getOne);

route.post("/users/:id/edit", userController.edit);

route.post("/users/:id/delete", userController.delete);

module.exports = route;
