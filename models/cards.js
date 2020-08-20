// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Cards = sequelize.define("Cards", {
    longNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expire: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastThree: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Cards.associate = function(models) {
    Cards.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Cards;
};
