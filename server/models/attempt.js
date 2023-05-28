module.exports = (sequelize, DataTypes) => {
  const attempt = sequelize.define("attempts", {
    participant_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return attempt;
};
