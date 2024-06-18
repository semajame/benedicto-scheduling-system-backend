const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sub_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      units: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      to: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "schedules",
      timestamps: false,
    }
  );

  return Schedule;
};
