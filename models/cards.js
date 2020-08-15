// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Cards = sequelize.define("Cards", {
    LongCarNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expirer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ThreeDigit: {
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
