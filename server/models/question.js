module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define("questions", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    is_private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("mcq", "open-ended", "matching", "true-false"),
      allowNull: false,
    },
  });

  return question;
};
