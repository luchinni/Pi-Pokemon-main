const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("types", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID, 
        primaryKey: true,
        allowNull: false
      }
    },
    { timestamps: false });
  };