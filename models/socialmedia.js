"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class SocialMedia extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			//relasi social media -> user
			//SocialMedia.belongsTo(models.User, {foreignKey: "Userid"})
		}
	}
	SocialMedia.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "name required",
					},
					notEmpty: {
						args: true,
						msg: "name cannot be empty",
					},
				},
			},
			social_media_url: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isUrl: {
						args: true,
						msg: "Invalid URL format",
					},
					notNull: {
						msg: "URL required",
					},
					notEmpty: {
						args: true,
						msg: "URL cannot be empty",
					},
				},
			},
			Userid: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "SocialMedia",
		}
	);
	return SocialMedia;
};
