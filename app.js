const express = require("express");
const app = express();
const path = require("path");
const bodypaser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodypaser.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request,response) => {
    response.render('Home');
})
module.exports = app;