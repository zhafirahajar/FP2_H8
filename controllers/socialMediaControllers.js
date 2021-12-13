const { User, SocialMedia } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class socialMediaController {
	static create(req, res) {
		let token = req.headers.token;
		let user = jwt.verify(token, "secretkey");
		let input = {
			name: req.body.name,
			social_media_url: req.body.social_media_url,
			UserId: user.id,
		};
		SocialMedia.create(input)
			.then((data) => {
				res.status(201).json({
					social_media: {
						id: data.id,
						name: data.name,
						social_media_url: data.social_media_url,
						UserId: data.UserId,
						updatedAt: data.updatedAt,
						createdAt: data.createdAt,
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

				if (err.errors) {
					res.status(errCode).json({
						error: err.name,
						message: errMessages,
					});
				} else {
					res.status(errCode).json({
						error: err.name,
						message: err.message,
					});
				}
			});
	}

	static read(req, res) {
		let token = req.headers.token;
		let user = jwt.verify(token, "secretkey");
		SocialMedia.findAll({
			include: {
				model: User,
				attributes: ["id", "username", "profile_image_url"],
			},
			where: {
				UserId: user.id,
			},
		})
			.then((data) => {
				res.status(200).json({
					social_media: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	static update(req, res) {}

	static delete(req, res) {}
}

module.exports = socialMediaController;
