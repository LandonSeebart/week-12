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
  getUserSelectionFrom(products)
});

function getUserSelectionFrom(list) {

  choiceArray = productInfoArrBuilder(list);

  inquirer.prompt([
    {
    type: "list",
    name: "item",
    message: "What would you like to buy?",
    choices: choiceArray
    },
    {
      type: "input",
      name: "quantity",
      message: "How many?"
    }
  ]).then(answers => {
   let userSelection = userSelectionCleaner(answers.item)
   console.log(userSelection);
   let stockAvailible = getProductQuantity(userSelection)

   if (stockAvailible - answers.quantity < 1) {
    console.log("Insufficient quantity!");
    } else {
      console.log("done!");
    }
  });
}

function productInfoArrBuilder(arr) {

  let productInfo = []
  for (let i = 0; i < arr.length; i++) {
    productInfo.push(`${arr[i].product_name} : $${arr[i].price}`);
  }

  return (productInfo)
}

function userSelectionCleaner(arg) {

  let userItemArr = arg.split(':')
  let userItemName = userItemArr[0]
  return(userItemName);

}

function getProductQuantity(productName) {
  const query = `SELECT stock_quantity FROM products WHERE ?`;
    connection.query(query, { product_name: productName  }, function(err, res) {
        if (err) throw err;
        console.log(res[0].stock_quantity)
    });
}