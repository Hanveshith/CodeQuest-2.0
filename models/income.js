'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static enterincome({ IncomeHead, incomeAmount, incomeDescription,TotalIncome }) {
      return this.create({
        Datatime: new Date(),
        IncomeHead: IncomeHead,
        Amount: incomeAmount,
        Description: incomeDescription,
        TotalIncome: TotalIncome
      });
    }
    
  }
  Income.init({
    Datatime: DataTypes.DATE,
    IncomeHead: DataTypes.STRING,
    Amount: DataTypes.INTEGER,
    Description: DataTypes.STRING,
    TotalIncome: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Income',
  });
  return Income;
};