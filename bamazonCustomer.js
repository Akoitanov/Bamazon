var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'NodeUser',

    password: '',
    database: 'bamazon'
});

function productsBuy() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'product_id',
            massage: 'Please enter SKU of the product you would like to buy',
            // validate: 'validateInput',
            filter: Number

        },
        {
            type: 'input',
            name: 'quantity',
            massage: 'How many units of the product you would like to buy',
            // validate: 'validateInput',
            filter: Number
        }
    ]).then(function(input) {

        var product = input.product_id;
        var quantity = input.quantity;

        var queryStr = 'SELECT * FROM products WHERE ?';
        
        connection.query(queryStr, {product_id: product}, function(err, data) {
            if (err) throw err;  
            console.log(err, data);
            if(data.length === 0) {
                console.log('Invalid product ID.')
               
                displayInventory();
            } else {
                var productData = data[0];

                if (quantity <= productData.stock_quantity) {
                    console.log('Order has been placed!!!');

                    var updateQueryStr = 'UPDATE products SET stock_quantity =' + (productData.stock_quantity - quantity) + ' WHERE product_id = ' + product;
                
                    connection.query(updateQueryStr, function(err, data) {
                        if (err) throw err;

                        console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                        console.log("\n---------------------------------------\n");
                        connection.end();
                    })
                } else {
                        console.log('Sorry, Insufficient quantity!');
                        console.log('Check something else');
                        console.log("\n---------------------------------------\n");
        
                        displayInventory();
                    }
                }
            })
        })
    }
 function displayInventory() {

    queryStr = 'SELECT * FROM products';

    connection.query(queryStr, function(err, data) {
        if (err) {
            console.log("error", err);
        }


        console.log('Existing Inventory: ');
        console.log('..................\n');

        var strOut = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Product ID: ' + data[i].product_id + ' // ';
            strOut += 'Product Name: ' + data[i].product_name + ' // ';
            strOut += 'Department: ' + data[i].department_name + ' // ';
            strOut += 'Price: $' + data[i].price + '\n';

            console.log(strOut);
        }

        console.log("-------------------------------------------------\n");

        
        
    })

 }
      productsBuy(); 
      displayInventory(); 
      