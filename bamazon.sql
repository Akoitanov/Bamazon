DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;


CREATE TABLE products (
    product_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (product_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Jabra Wireless Earbuds', 'Music and More', 189.99, 300),
('Marshall Portable Speaker', 'Music and More', 249.99, 150),
('Yamaha Acoustic Guitar', 'Music and More', 149.99, 250),
('Boosted Electric Skateboard', 'All Gifts', 999.00, 150),
('Swagtron Hoverboard', 'All Gifts', 399.99, 375),
('Rocktape Knee Sleeves', 'Sports', 59.99, 768),
('Swees Leather Bands', 'Accessories', 13.99, 379),
('Smatiful Blaze Bands', 'Accessories', 18.99, 157),
('LOL Surprise Doll', 'Toys', 13.24, 572),
('LOL Bling Series Doll', 'Toys', 10.99, 146);
