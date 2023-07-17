const express = require("express");
const app = express();
const path = require("path");
const bodypaser = require("body-parser");
const {Income,Expenses} = require('./models');
const { INTEGER } = require("sequelize");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodypaser.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',async (request,response) => {
    const todayincomerows = await Income.findAll();
    const lastIncome = await Income.findOne({
        order: [['Datatime', 'DESC']],
      });
    const todayexpenses = await Expenses.findAll();

    response.render('Home',{
        incomevalues: todayincomerows,
        lastIncome,
        todayexpenses
    });
})

app.get('/report', async (request,response) => {
    response.render('report');
})

app.post('/addincome',async (request,response) => {
    console.log(request.body);
    const lastIncome = await Income.findOne({
        order: [['Datatime', 'DESC']],
      });
    const lastExpenses = await Expenses.findOne({
        order: [['Datatime', 'DESC']],
      });
    try{
        const incomedata = await Income.enterincome({
            IncomeHead: request.body.IncomeHead,
            incomeAmount: request.body.incomeAmount,
            incomeDescription: request.body.incomeDescription,
            TotalIncome: (lastIncome && lastIncome.TotalIncome || 0) + parseInt(request.body.incomeAmount, 10)
          });
          
        console.log(incomedata);
        response.redirect('/');
    }catch(err){
        console.log(err);
    }

})
app.get('/getreport', async (request,response) => {
    const start_date = request.query.date1;
    const end_date = request.query.date2;
    console.log(start_date,end_date);
    const between_income = await Income.get_between_incomes({start_date,end_date});
    const between_expense = await Expenses.get_between_expenses({start_date,end_date});
    response.render("reportk",{
        between_expense,
        between_income
    })

})



app.post("/addexpense", async (request,response) => {
    const expense_head = request.body.expense_head;
    const expense_amount = request.body.expense_amount;
    const expense_description = request.body.expense_description;
    console.log(expense_head,expense_amount,expense_description);
    const lastIncome = await Income.findOne({
        order: [['Datatime', 'DESC']],
      });
    const lastExpenses = await Expenses.findOne({
        order: [['Datatime', 'DESC']],
      });
    try {
        await Expenses.addExpense({
            ExpenseHead: expense_head,
            Amount: expense_amount,
            Description: expense_description,
            Datatime: new Date(),
            TotalExpense: (lastIncome && lastIncome.TotalIncome || 0) - (parseInt(request.body.expense_amount, 10))
        })
       
        
       return response.redirect("/");
    }
    catch(error) {
        console.log(error);
        return response.status(422).json(error);
    }
    
});
module.exports = app;