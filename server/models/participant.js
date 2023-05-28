module.exports = (sequelize, DataTypes) => {
  const participant = sequelize.define("participants", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
  });

  return participant;
};
