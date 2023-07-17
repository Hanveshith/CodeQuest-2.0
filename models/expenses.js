'use strict';
const {
  Model,Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    

    static get_between_expenses({ start_date, end_date }) {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      console.log(startDate,endDate);
      console.log(new Date())
      return this.findAll({
        where: {
          Datatime: {
            [Op.gt]: startDate,
            [Op.lt]: endDate,
          },
        },
      });
    }

    static todayexpenses(){ 
      return this.findAll({ 
        where : { 
          Datatime : new Date(), 
        } 
      }) 
    }
    

    static addExpense({ExpenseHead,Amount,Description,Datatime,TotalExpense}){ 
      return this.create({ 
        Datatime:Datatime, 
        ExpenseHead,ExpenseHead, 
        Amount:Amount, 
        Description:Description, 
        TotalExpense: TotalExpense
      }); 
    }
  }
  Expenses.init({
    Datatime: DataTypes.DATE,
    ExpenseHead: DataTypes.STRING,
    Amount: DataTypes.INTEGER,
    Description: DataTypes.STRING,
    TotalExpense: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Expenses',
  });
  return Expenses;
};