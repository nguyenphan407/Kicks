-- INSERT INTO users (first_name, last_name, email, phone_number, password, role, avatar, created_at, updated_at)
-- VALUES 
-- ('Quan', 'Vo Dinh', 'vodinhquan2707.it@gmail.com', '1234567890', SHA2('password123', 256), 'customer', NULL, NOW(), NOW()),
-- ('Nguyen', 'Phan Hoang', 'nguyen@example.com', '0987654321', SHA2('password456', 256), 'admin', NULL, NOW(), NOW());


-- Insert data into the categories table
INSERT INTO categories (category_name) 
VALUES 
('Casual shoes'),
('Runners'),
('Sandals'),
('Hiking'),
('Sneaker'),
('Basketball'),
('Golf'),
('Outdoor');
-- Xóa tất cả các bản ghi trong bảng products
-- DELETE FROM products;

-- Đặt lại AUTO_INCREMENT về 1
-- ALTER TABLE products AUTO_INCREMENT = 1;

