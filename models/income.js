'use strict';
const {
  Model,Op
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

  static get_between_incomes({start_date,end_date}){
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    console.log(startDate,endDate);
    console.log(new Date())
    return this.findAll({
      where: {
        Datatime: {
          [Op.gt]: startDate,
        },
        Datatime: {
          [Op.lt]: endDate,
        }
      }
    })
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