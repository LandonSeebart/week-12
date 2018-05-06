var mysql = require("mysql");
var inquirer = require('inquirer');
var products = require("./products")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "6TacoMoose!",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  getUserItemFrom(products);
  connection.end();
});

function getUserItemFrom(list) {

  choiceArray = productInfoArrBuilder(list);

  inquirer.prompt([
    {
    type: "list",
    name: "userItem",
    message: "What would you like to buy?",
    choices: choiceArray
    }
  ]).then(answers => {
    console.log(answers.userItem)
  });
}

function productInfoArrBuilder(arr) {

  let productInfo = []

  for (let i = 0; i < arr.length; i++) {
    productInfo.push(`${arr[i].product_name} : $${arr[i].price}`);
  }

  return (productInfo)
}