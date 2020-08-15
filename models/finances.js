// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Finances = sequelize.define("Finances", {
    TotalAvailable: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ProfitLossHistorical: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TotalStocksValue: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Finances.associate = function(models) {
    Finances.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Finances;
};