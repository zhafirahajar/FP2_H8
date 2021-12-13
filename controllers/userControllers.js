const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
	static register(req, res) {
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(req.body.password, salt);

		let input = {
			full_name: req.body.full_name,
			email: req.body.email,
			username: req.body.username,
			password: hash,
			profile_image_url: req.body.profile_image_url,
			age: req.body.age,
			phone_number: req.body.phone_number,
		};

		User.create(input)
			.then((data) => {
				res.status(201).json({
					user: {
						email: data.email,
						full_name: data.full_name,
						username: data.username,
						profile_image_url: data.profile_image_url,
						age: data.age,
						phone_number: data.phone_number,
					},
				});
			})
			.catch((err) => {
				let errCode = 500;
				let errMessages = [];
				for (let index in err.errors) {
					let errMsg = err.errors[index].message;
					errMessages.push(errMsg);
				}
				if (err.name.includes("Sequelize")) {
					errCode = 400;
				}
				res.status(errCode).json({
					error: err.name,
					// message: err.errors[0].message,
					message: errMessages,
				});
			});
	}

	static loginMiddleware(req, res, next) {
		try {
			let token = req.headers.token;
			let decoded = jwt.verify(token, "secretkey");
			User.findOne({
				where: {
					email: decoded.email,
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
			res.status(500).json(err);
		}
	}

	static login(req, res) {
		User.findOne({
			where: {
				email: req.body.email,
			},
		})
			.then((data) => {
				if (data === null) {
					res.status(401).json({ messege: "Invalid Credentials" });
				} else {
					let compare = bcrypt.compareSync(req.body.password, data.password);
					if (compare == true) {
						let token = jwt.sign(data.toJSON(), "secretkey");
						res.status(200).json({ token });
					} else {
						res.status(401).json({ messege: "Username or password invalid" });
					}
				}
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	static async edit(req, res) {
		let user_instance = await User.findOne({
			where: {
				id: req.params.id,
			},
		})
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	// WORK ON PROGRESS -zhafira
	static delete(req, res) {
		User.destroy({
			where: {
				id: req.params.id,
			},
		})
			.then((data) => {
				if (data > 0) {
					res.status(200).json(data);
				} else {
					res.status(404).json(data);
				}
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
}

module.exports = userController;
