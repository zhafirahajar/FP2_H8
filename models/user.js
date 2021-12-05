"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			full_name: {
				type: DataTypes.STRING,
				validate: { notNull: true },
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					isEmail: true,
					unique: true,
					notNull: true,
				},
			},
			username: {
				type: DataTypes.STRING,
				validate: {
					notNull: true,
					unique: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					notNull: true,
				},
			},
			profile_image_url: {
				type: DataTypes.TEXT,
				validate: {
					isUrl: true,
					notNull: true,
				},
			},
			age: {
				type: DataTypes.INTEGER,
				validate: {
					notNull: true,
					isInt: true,
				},
			},
			phone_number: {
				type: DataTypes.INTEGER,
				validate: {
					notNull: true,
					isInt: true,
				},
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
