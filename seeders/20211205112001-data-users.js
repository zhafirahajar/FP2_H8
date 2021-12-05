"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let data = {
			full_name: "",
			email: "",
			username: "",
			password: "",
			profile_image_url: "",
			age: "",
			phone_number: "",
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await queryInterface.bulkInsert("Users", data);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
