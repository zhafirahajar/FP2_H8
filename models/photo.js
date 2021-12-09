"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Photo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Photo.init(
		{
			title: {
				type: DataTypes.STRING,
				validate: {
					allowNull: false,
				},
			},
			caption: {
				type: DataTypes.TEXT,
				validate: {
					allowNull: false,
				},
			},
			poster_image_url: {
				type: DataTypes.TEXT,
				validate: {
					allowNull: false,
					isUrl: true,
				},
			},
			UserId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Photo",
		}
	);
	return Photo;
};
