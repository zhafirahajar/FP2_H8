const { User } = require("../models");
const bcrypt = require("bcrypt");

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
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		User.create(input)
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				let errCode = 500;
				if (err.name.includes("Sequelize")) {
					errCode = 400;
				}
				res.status(errCode).json(err);
			});
	}

	static async getAll(req, res) {
		console.log(req.headers.token);
		// User.findAll({
		// 	include: [Major],
		// })
		// 	.then((data) => {
		// 		res.json(data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});

		const userList = await User.findAll();
		res.json(userList);
	}

	static async getOne(req, res) {
		// User.findOne({
		// 	where: {
		// 		id: req.params.id,
		// 	},
		// })
		// 	.then((data) => {
		// 		if (data == null) {
		// 			res.status(404).json(data);
		// 		} else {
		// 			res.status(200).json(data);
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		res.status(500).json(err);
		// 	});

		const oneUser = await User.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (oneUser == null) {
			res.status(404).json({ message: "User Not Found" });
		} else {
			res.status(200).json(oneUser);
		}
	}

	static edit(req, res) {
		User.update(
			{
				name: req.body.name,
				age: req.body.age,
				major_id: req.body.major_id,
				password: req.body.password,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		)
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

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
