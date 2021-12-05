'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SocialMedia.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notNull: true
      }
    },
    social_media_url: {
      type: DataTypes.STRING,
      validate:{
        notNull: true,
        isUrl: true
      }
    },
    Userid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SocialMedia',
  });
  return SocialMedia;
};