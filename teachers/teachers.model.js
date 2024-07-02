const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Teachers = sequelize.define(
    "Teachers",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
      },
      address: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "Teachers",
      timestamps: false,
    }
  );

  return Teachers;
};
