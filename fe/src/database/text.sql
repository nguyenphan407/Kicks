INSERT INTO users (first_name, last_name, email, phone_number, password, role, avatar, created_at, updated_at)
VALUES 
('bin', 'cute', 'admin@uit.edu.vn', '0332770502', SHA2('admin', 256), 'admin', NULL, NOW(), NOW());


-- Insert data into the categories table
-- INSERT INTO categories (category_name) 
-- VALUES 
-- ('Casual shoes'),
-- ('Runners'),
-- ('Sandals'),
-- ('Hiking'),
-- ('Sneaker'),
-- ('Basketball'),
-- ('Golf'),
-- ('Outdoor');
-- Xóa tất cả các bản ghi trong bảng products
-- DELETE FROM product_size;
-- DELETE FROM product_image;
-- DELETE FROM products;

SET FOREIGN_KEY_CHECKS = 1;  -- Bật lại kiểm tra ràng buộc khóa ngoại



-- Đặt lại AUTO_INCREMENT về 1
-- ALTER TABLE products AUTO_INCREMENT = 1;


