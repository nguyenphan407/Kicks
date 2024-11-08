-- use kicks;

-- delete from users where user_id = 1 or user_id = 2;

-- select * from users;

-- select * from `users` where `email` = 'nguyen12345@gmail.com' limit 1;

-- select * from products;

-- select * from personal_access_tokens;

-- Insert data into the locations table
INSERT INTO locations (user_id, address, province, district, city) 
VALUES 
(1, '123 Main St', 'Province 1', 'District 1', 'City A'),
(2, '456 High St', 'Province 2', 'District 2', 'City B');

-- Insert data into the categories table
INSERT INTO categories (category_name) 
VALUES 
('Sneakers'),
('Boots'),
('Sandals');

-- Insert data into the products table
INSERT INTO products (name, brand, description, price, stock_quantity, size, color, category_id, image, created_at, updated_at) 
VALUES 
('Air Max 90', 'Nike', 'Classic sneakers with cushioning.', 120.00, 50, '10', 'Red', 1, 'airmax90.jpg', NOW(), NOW()),
('Classic Boots', 'Timberland', 'Durable and stylish boots.', 150.00, 30, '9', 'Brown', 2, 'classicboots.jpg', NOW(), NOW()),
('Beach Sandals', 'Havaianas', 'Comfortable sandals for summer.', 25.00, 100, '8', 'Blue', 3, 'beachsandals.jpg', NOW(), NOW()),
('Air Jordan 1', 'Nike', 'Iconic high-top sneakers.', 140.00, 40, '10', 'Black', 1, 'airjordan1.jpg', NOW(), NOW()),
('UltraBoost', 'Adidas', 'High-performance running shoes.', 180.00, 20, '9', 'White', 1, 'ultraboost.jpg', NOW(), NOW()),
('Chuck Taylor All Star', 'Converse', 'Classic canvas sneakers.', 55.00, 80, '8', 'Black', 1, 'chucktaylor.jpg', NOW(), NOW()),
('Gel-Kayano', 'Asics', 'Stability running shoes with cushioning.', 160.00, 35, '11', 'Blue', 1, 'gelkayano.jpg', NOW(), NOW()),
('Gel-Quantum 180', 'Asics', 'Advanced technology running shoes.', 170.00, 25, '10', 'Green', 1, 'gelquantum180.jpg', NOW(), NOW()),
('Classic Slip-On', 'Vans', 'Low-top slip-on shoes.', 50.00, 60, '8', 'White', 1, 'vansslipon.jpg', NOW(), NOW()),
('Old Skool', 'Vans', 'Signature skate shoes.', 60.00, 55, '10', 'Black', 1, 'oldskool.jpg', NOW(), NOW()),
('ZoomX Vaporfly', 'Nike', 'Performance marathon shoes.', 250.00, 15, '11', 'Pink', 1, 'zoomxvaporfly.jpg', NOW(), NOW()),
('Gel-Lyte III', 'Asics', 'Retro running shoes with split tongue.', 120.00, 45, '9', 'Orange', 1, 'gellyte.jpg', NOW(), NOW()),
('Trail Blazers', 'Merrell', 'Rugged hiking shoes.', 110.00, 25, '9', 'Brown', 2, 'trailblazers.jpg', NOW(), NOW());

-- Insert data into the orders table
INSERT INTO orders (user_id, order_status, amount, shipping_address, payment_status, created_at, updated_at) 
VALUES 
(1, 'pending', 120.00, '123 Main St, City A', 'pending', NOW(), NOW()),
(2, 'shipped', 150.00, '456 High St, City B', 'paid', NOW(), NOW());

-- Insert data into the order_items table
INSERT INTO order_items (order_id, product_id, quantity, price) 
VALUES 
(1, 1, 1, 120.00),
(2, 2, 1, 150.00);

-- Insert data into the payments table
INSERT INTO payments (order_id, payment_method, amount, payment_status, created_at, updated_at) 
VALUES 
(1, 'credit_card', 120.00, 'pending', NOW(), NOW()),
(2, 'cod', 150.00, 'successful', NOW(), NOW());

-- Insert data into the reviews table
INSERT INTO reviews (product_id, user_id, rating, review_text, created_at, updated_at) 
VALUES 
(1, 1, 5, 'Amazing sneakers! Very comfortable.', NOW(), NOW()),
(2, 2, 4, 'Stylish boots, but a bit expensive.', NOW(), NOW());

-- Insert data into the carts table
INSERT INTO carts (user_id, product_id, quantity, created_at, updated_at) 
VALUES 
(1, 1, 2, NOW(), NOW()),
(2, 3, 1, NOW(), NOW());



