// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Stocks = sequelize.define("Stocks", {
    Code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PurchasePrice: {
      type: DataTypes.STRING,
      allowNull: false
    },
    SoldPrice: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Units: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Watched: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    }
  });
  Stocks.associate = function(models) {
    Stocks.belongsToMany(models.User, {
      through: "UserStocks",
      as: "User",
      foreignKey: "StockId",
      otherKey: "UserId"
    });
  };

  return Stocks;
};
