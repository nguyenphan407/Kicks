-- Cập nhật product_size khi tạo hoá đơn
DELIMITER $$

CREATE TRIGGER trg_ReduceProductSizeQuantity
AFTER INSERT ON Order_Items
FOR EACH ROW
BEGIN
    UPDATE Product_size
    SET quantity = quantity - NEW.quantity
    WHERE product_size_id = NEW.product_size_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_RestoreProductSizeQuantity
AFTER UPDATE ON Orders
FOR EACH ROW
BEGIN
    IF NEW.order_status = 'canceled' THEN
        UPDATE Product_size
        SET quantity = quantity + (
            SELECT SUM(oi.quantity)
            FROM Order_Items AS oi
            WHERE oi.product_size_id = Product_size.product_size_id
              AND oi.order_id = NEW.order_id
        )
        WHERE EXISTS (
            SELECT 1
            FROM Order_Items AS oi
            WHERE oi.product_size_id = Product_size.product_size_id
              AND oi.order_id = NEW.order_id
        );
    END IF;
END$$

DELIMITER ;