CREATE
    DATABASE cogy_ecommerce_database;
USE
    cogy_ecommerce_database;


CREATE TABLE ROLE
(
    ID          VARCHAR(36) PRIMARY KEY,
    NAME        VARCHAR(50)  NOT NULL,
    DESCRIPTION VARCHAR(100) NOT NULL
);

DELIMITER $$
CREATE TRIGGER ROLE_INSERT_TRIGGER
    BEFORE INSERT
    ON ROLE
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE USER
(
    ID        VARCHAR(36) PRIMARY KEY,
    ACTIVE    BOOLEAN                     DEFAULT TRUE,
    EMAIL     VARCHAR(50) UNIQUE NOT NULL,
    FULL_NAME VARCHAR(50)        NOT NULL,
    PASSWORD  TEXT               NOT NULL,
    PHONE     VARCHAR(12) UNIQUE NOT NULL,
    USERNAME  VARCHAR(20) UNIQUE NOT NULL,
    WALLET    DOUBLE             NOT NULL DEFAULT 0 CHECK ( WALLET >= 0 )
);

DELIMITER $$
CREATE TRIGGER USER_INSERT_TRIGGER
    BEFORE INSERT
    ON USER
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE USERS_ROLES
(
    USER_ID VARCHAR(36),
    ROLE_ID VARCHAR(36),
    PRIMARY KEY (USER_ID, ROLE_ID)
);

CREATE TABLE LOCATION
(
    ID                  VARCHAR(36) PRIMARY KEY,
    PROVINCE            VARCHAR(100),
    DISTRICT            VARCHAR(100),
    WARD                VARCHAR(100),
    HAMLET              VARCHAR(100),
    ADDRESS             TEXT,
    IS_PICK_UP_ADDRESS  BOOLEAN NOT NULL,
    IS_DELIVERY_ADDRESS BOOLEAN NOT NULL,
    USER_ID             VARCHAR(36),
    FOREIGN KEY (USER_ID) REFERENCES USER (ID)
);

DELIMITER $$
CREATE TRIGGER LOCATION_INSERT_TRIGGER
    BEFORE INSERT
    ON LOCATION
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE SHOP
(
    ID      VARCHAR(36) PRIMARY KEY,
    NAME    VARCHAR(50) NOT NULL,
    USER_ID VARCHAR(36) unique,
    FOREIGN KEY (USER_ID) REFERENCES USER (ID)
);

DELIMITER $$
CREATE TRIGGER SHOP_INSERT_TRIGGER
    BEFORE INSERT
    ON SHOP
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE CATEGORY
(
    ID     VARCHAR(36) PRIMARY KEY,
    NAME   VARCHAR(50) NOT NULL,
    ACTIVE BOOLEAN DEFAULT TRUE
);

DELIMITER $$
CREATE TRIGGER CATEGORY_INSERT_TRIGGER
    BEFORE INSERT
    ON CATEGORY
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE SUB_CATEGORY
(
    ID          VARCHAR(36) PRIMARY KEY,
    NAME        VARCHAR(50) NOT NULL,
    ACTIVE      BOOLEAN DEFAULT TRUE,
    CATEGORY_ID VARCHAR(36),
    FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY (ID)
);

DELIMITER $$
CREATE TRIGGER SUB_CATEGORY_INSERT_TRIGGER
    BEFORE INSERT
    ON SUB_CATEGORY
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE PRODUCT
(
    ID                 VARCHAR(36) PRIMARY KEY,
    NAME               VARCHAR(255) NOT NULL,
    IMAGE             TEXT,
    DESCRIPTION        LONGBLOB,
    VIEW               BIGINT  DEFAULT 0 CHECK ( VIEW >= 0 ),
    NUMBER_OF_PURCHASE BIGINT  DEFAULT 0 CHECK ( NUMBER_OF_PURCHASE >= 0 ),
    ACTIVE             BOOLEAN DEFAULT TRUE,
    IS_SHOWN           BOOLEAN DEFAULT TRUE,
    SUB_CATEGORY_ID    VARCHAR(36),
    FOREIGN KEY (SUB_CATEGORY_ID) REFERENCES SUB_CATEGORY (ID),
    SHOP_ID            VARCHAR(36),
    FOREIGN KEY (SHOP_ID) REFERENCES SHOP (ID)
);

DELIMITER $$
CREATE TRIGGER PRODUCT_INSERT_TRIGGER
    BEFORE INSERT
    ON PRODUCT
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE PHOTO
(
    ID         VARCHAR(36) PRIMARY KEY,
    URL        TEXT,
    PRODUCT_ID VARCHAR(36),
    FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCT (ID)
);

DELIMITER $$
CREATE TRIGGER PHOTO_INSERT_TRIGGER
    BEFORE INSERT
    ON PHOTO
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE SIZE
(
    ID     VARCHAR(36) PRIMARY KEY,
    NAME   VARCHAR(25) NOT NULL,
    ACTIVE BOOLEAN DEFAULT TRUE
);

DELIMITER $$
CREATE TRIGGER SIZE_INSERT_TRIGGER
    BEFORE INSERT
    ON SIZE
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE COLOR
(
    ID     VARCHAR(36) PRIMARY KEY,
    NAME   VARCHAR(25) NOT NULL,
    ACTIVE BOOLEAN DEFAULT TRUE
);
DELIMITER $$
CREATE TRIGGER COLOR_INSERT_TRIGGER
    BEFORE INSERT
    ON COLOR
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE VARIANT
(
    ID           VARCHAR(36) PRIMARY KEY,
    IMPORT_PRICE DOUBLE NOT NULL CHECK ( IMPORT_PRICE >= 0 ),
    SALE_PRICE   DOUBLE NOT NULL CHECK ( SALE_PRICE >= 0 ),
    QUANTITY     INT    NOT NULL CHECK ( QUANTITY >= 0 ),
    WEIGHT       DOUBLE NOT NULL CHECK ( WEIGHT > 0 ),
    ACTIVE       BOOLEAN DEFAULT TRUE,
    IS_SHOWN     BOOLEAN DEFAULT TRUE,
    PRODUCT_ID   VARCHAR(36),
    SIZE_ID      VARCHAR(36),
    COLOR_ID     VARCHAR(36),
    FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCT (ID),
    FOREIGN KEY (SIZE_ID) REFERENCES SIZE (ID),
    FOREIGN KEY (COLOR_ID) REFERENCES COLOR (ID)
);

DELIMITER $$
CREATE TRIGGER VARIANT_INSERT_TRIGGER
    BEFORE INSERT
    ON VARIANT
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE CART
(
    ID      VARCHAR(36) PRIMARY KEY,
    USER_ID VARCHAR(36) UNIQUE,
    FOREIGN KEY (USER_ID) REFERENCES USER (ID)
);

DELIMITER $$
CREATE TRIGGER CART_INSERT_TRIGGER
    BEFORE INSERT
    ON CART
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE CART_LINE
(
    ID         VARCHAR(36) PRIMARY KEY,
    QUANTITY   INT NOT NULL CHECK ( QUANTITY >= 0 ),
    CART_ID    VARCHAR(36),
    VARIANT_ID VARCHAR(36),
    FOREIGN KEY (CART_ID) REFERENCES CART (ID),
    FOREIGN KEY (VARIANT_ID) REFERENCES VARIANT (ID)
);

DELIMITER $$
CREATE TRIGGER CART_LINE_INSERT_TRIGGER
    BEFORE INSERT
    ON CART_LINE
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE ORDERS
(
    ID           VARCHAR(36) PRIMARY KEY,
    BUYER_ID     VARCHAR(36),
    FOREIGN KEY (BUYER_ID) REFERENCES USER (ID),
    IS_FREE_SHIP BOOLEAN NOT NULL,
    TOTAL_PRICE  DOUBLE CHECK ( TOTAL_PRICE >= 0 ),
    STATUS_TEXT  VARCHAR(100)
);

DELIMITER $$
CREATE TRIGGER ORDERS_INSERT_TRIGGER
    BEFORE INSERT
    ON ORDERS
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

CREATE TABLE ORDER_DETAIL
(
    ID         VARCHAR(36) PRIMARY KEY,
    QUANTITY   INT NOT NULL CHECK ( QUANTITY >= 0 ),
    VARIANT_ID VARCHAR(36),
    FOREIGN KEY (VARIANT_ID) REFERENCES VARIANT (ID),
    ORDERS_ID  VARCHAR(36),
    FOREIGN KEY (ORDERS_ID) REFERENCES ORDERS (ID)
);

DELIMITER $$
CREATE TRIGGER ORDER_DETAIL_INSERT_TRIGGER
    BEFORE INSERT
    ON ORDER_DETAIL
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
    END IF;
END$$
DELIMITER ;

INSERT INTO ROLE (ID, NAME, DESCRIPTION)
VALUES ('5a8eb69c-1818-11ee-a323-902b34728d5d', 'ROLE_ADMIN', 'Quản trị viên'),
       ('5a8eddc3-1818-11ee-a323-902b34728d5d', 'ROLE_CUSTOMER', 'Khách hàng'),
       ('5a8ee04f-1818-11ee-a323-902b34728d5d', 'ROLE_SHOP', 'Nhà bán hàng')
;

INSERT INTO USER (ID, EMAIL, FULL_NAME, PHONE, USERNAME, PASSWORD)
VALUES ('5a95a5f3-1818-11ee-a323-902b34728d5d', 'shopee@gmail.com', 'ADMIN SHOPEE', '0999999999', 'admin',
        '$2a$10$/fEKrX3F3sRz/CMMCgIaXuYaM01ZamVlqvf4TeQxOUupGUDBkpliK');
INSERT INTO USERS_ROLES (USER_ID, ROLE_ID)
VALUES ('5a95a5f3-1818-11ee-a323-902b34728d5d', '5a8eb69c-1818-11ee-a323-902b34728d5d');
# Username admin : admin
# Mật khẩu: Huong@123

INSERT INTO CATEGORY (ID, NAME)
VALUES ('ec961743-181a-11ee-a323-902b34728d5d', 'Thời Trang Nam'),
       ('ec961d20-181a-11ee-a323-902b34728d5d', 'Điện thoại & Phụ Kiện'),
       ('ec961ee8-181a-11ee-a323-902b34728d5d', 'Thiết Bị Điện Tử'),
       ('ec9620c7-181a-11ee-a323-902b34728d5d', 'Máy Tính & Laptop'),
       ('ec96229a-181a-11ee-a323-902b34728d5d', 'Máy Ảnh & Máy Quay Phim'),
       ('ec962488-181a-11ee-a323-902b34728d5d', 'Thời Trang Nữ'),
       ('ec9625eb-181a-11ee-a323-902b34728d5d', 'Mẹ Và Bé'),
       ('ec9627aa-181a-11ee-a323-902b34728d5d', 'Nhà Cửa & Đời Sống'),
       ('ec9629ab-181a-11ee-a323-902b34728d5d', 'Sức Khỏe'),
       ('ec962b68-181a-11ee-a323-902b34728d5d', 'Đồng hồ');


INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES ('2224f8fd-181f-11ee-a323-902b34728d5d', 'Áo sơ mi', 'ec961743-181a-11ee-a323-902b34728d5d'),
       ('2224ffc7-181f-11ee-a323-902b34728d5d', 'Quần jeans', 'ec961743-181a-11ee-a323-902b34728d5d'),
       ('22250276-181f-11ee-a323-902b34728d5d', 'Quần tây', 'ec961743-181a-11ee-a323-902b34728d5d')
;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES ('8b1ad1a1-181f-11ee-a323-902b34728d5d', 'Điện thoại', 'ec961d20-181a-11ee-a323-902b34728d5d'),
       ('8b1ad8ec-181f-11ee-a323-902b34728d5d', 'Máy tính bảng', 'ec961d20-181a-11ee-a323-902b34728d5d'),
       ('8b1adadd-181f-11ee-a323-902b34728d5d', 'Pin dự phòng', 'ec961d20-181a-11ee-a323-902b34728d5d')
;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES ('a1482d67-181f-11ee-a323-902b34728d5d', 'Tivi', 'ec961ee8-181a-11ee-a323-902b34728d5d'),
       ('a1483742-181f-11ee-a323-902b34728d5d', 'Loa', 'ec961ee8-181a-11ee-a323-902b34728d5d'),
       ('a14839d2-181f-11ee-a323-902b34728d5d', 'Đĩa game', 'ec961ee8-181a-11ee-a323-902b34728d5d')
;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES ('d1c39e6c-181f-11ee-a323-902b34728d5d', 'Máy tính bàn', 'ec9620c7-181a-11ee-a323-902b34728d5d'),
       ('d1c3a632-181f-11ee-a323-902b34728d5d', 'Màn hình', 'ec9620c7-181a-11ee-a323-902b34728d5d'),
       ('d1c3a810-181f-11ee-a323-902b34728d5d', 'Thiết bị mạng', 'ec9620c7-181a-11ee-a323-902b34728d5d')
;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES ('0de5cbcb-1820-11ee-a323-902b34728d5d', 'Ống kính', 'ec96229a-181a-11ee-a323-902b34728d5d'),
       ('0de5d34a-1820-11ee-a323-902b34728d5d', 'Phụ kiện máy ảnh', 'ec96229a-181a-11ee-a323-902b34728d5d'),
       ('0de5d54b-1820-11ee-a323-902b34728d5d', 'Thẻ nhớ', 'ec96229a-181a-11ee-a323-902b34728d5d'),
       ('0de5d74f-1820-11ee-a323-902b34728d5d', 'Máy ảnh', 'ec96229a-181a-11ee-a323-902b34728d5d')
;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES ('2b7fe3c3-1822-11ee-a323-902b34728d5d', 'Quần đùi', 'ec962488-181a-11ee-a323-902b34728d5d'),
       ('2b7fea8f-1822-11ee-a323-902b34728d5d', 'Chân váy', 'ec962488-181a-11ee-a323-902b34728d5d'),
       ('2b7fec8f-1822-11ee-a323-902b34728d5d', 'Áo thun nữ', 'ec962488-181a-11ee-a323-902b34728d5d'),
       ('2b7fee25-1822-11ee-a323-902b34728d5d', 'Đồ lót', 'ec962488-181a-11ee-a323-902b34728d5d')
;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES ('55229250-1822-11ee-a323-902b34728d5d', 'Đồ ăn dặm', 'ec9625eb-181a-11ee-a323-902b34728d5d'),
       ('5522993a-1822-11ee-a323-902b34728d5d', 'Đồ chơi', 'ec9625eb-181a-11ee-a323-902b34728d5d'),
       ('55229b27-1822-11ee-a323-902b34728d5d', 'Phụ kiện cho mẹ', 'ec9625eb-181a-11ee-a323-902b34728d5d'),
       ('55229ccc-1822-11ee-a323-902b34728d5d', 'Tã và bỉm', 'ec9625eb-181a-11ee-a323-902b34728d5d')
;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES ('8b1cffac-1822-11ee-a323-902b34728d5d', 'Chăn ga gối nệm', 'ec9627aa-181a-11ee-a323-902b34728d5d'),
       ('8b1d07bd-1822-11ee-a323-902b34728d5d', 'Đồ nội thất', 'ec9627aa-181a-11ee-a323-902b34728d5d'),
       ('8b1d09e2-1822-11ee-a323-902b34728d5d', 'Đồ dùng nhà bếp', 'ec9627aa-181a-11ee-a323-902b34728d5d'),
       ('8b1d0b7b-1822-11ee-a323-902b34728d5d', 'Trang trí nhà cửa', 'ec9627aa-181a-11ee-a323-902b34728d5d')
;

insert into sub_category (ID, NAME, ACTIVE, CATEGORY_ID)
values  ('b8ed32e5-1822-11ee-a323-902b34728d5d', 'Vật tư y tế', 1, 'ec9629ab-181a-11ee-a323-902b34728d5d'),
        ('b8ed3a98-1822-11ee-a323-902b34728d5d', 'Thực phẩm chức năng', 1, 'ec9629ab-181a-11ee-a323-902b34728d5d'),
        ('b8ed3c8e-1822-11ee-a323-902b34728d5d', 'Hỗ trợ tình dục', 1, 'ec9629ab-181a-11ee-a323-902b34728d5d'),
        ('b8ed3ea7-1822-11ee-a323-902b34728d5d', 'Hỗ trợ làm đẹp', 1, 'ec9629ab-181a-11ee-a323-902b34728d5d');

insert into sub_category (ID, NAME, ACTIVE, CATEGORY_ID)
values  ('02d288e9-1823-11ee-a323-902b34728d5d', 'Đồng hồ nam', 1, 'ec962b68-181a-11ee-a323-902b34728d5d'),
        ('02d2902a-1823-11ee-a323-902b34728d5d', 'Đồng hồ nữ', 1, 'ec962b68-181a-11ee-a323-902b34728d5d'),
        ('02d29227-1823-11ee-a323-902b34728d5d', 'Đồng hồ trẻ em', 1, 'ec962b68-181a-11ee-a323-902b34728d5d'),
        ('02d29405-1823-11ee-a323-902b34728d5d', 'Phụ kiện đồng hồ', 1, 'ec962b68-181a-11ee-a323-902b34728d5d');

INSERT INTO USER (ID, EMAIL, FULL_NAME, PHONE, USERNAME, PASSWORD)
VALUES ('3d7998a6-1767-11ee-a323-902b34728d5d', 'huong@gmail.com', 'Đoàn Hưởng', '0888888888', 'huong',
        '$2a$10$/fEKrX3F3sRz/CMMCgIaXuYaM01ZamVlqvf4TeQxOUupGUDBkpliK');
# Mật khẩu: Huong@123

INSERT INTO USERS_ROLES (USER_ID, ROLE_ID)
VALUES ('3d7998a6-1767-11ee-a323-902b34728d5d', '5a8eddc3-1818-11ee-a323-902b34728d5d');#role customer

INSERT INTO USERS_ROLES (USER_ID, ROLE_ID)
VALUES ('3d7998a6-1767-11ee-a323-902b34728d5d', '5a8ee04f-1818-11ee-a323-902b34728d5d');#role shop

INSERT INTO user (ID, ACTIVE, EMAIL, FULL_NAME, PASSWORD, PHONE, USERNAME, WALLET)
VALUES ('c5ac5ee0-181d-11ee-a323-902b34728d5d', 1, 'khach@gmail.com', 'Minh Nhựa',
        '$2a$10$/fEKrX3F3sRz/CMMCgIaXuYaM01ZamVlqvf4TeQxOUupGUDBkpliK', '0777777777', 'minh', 0);

INSERT INTO USERS_ROLES (USER_ID, ROLE_ID)
VALUES ('c5ac5ee0-181d-11ee-a323-902b34728d5d', '5a8eddc3-1818-11ee-a323-902b34728d5d');#role customer

INSERT INTO SHOP (ID, NAME, USER_ID)
VALUES ('43f3bf79-181c-11ee-a323-902b34728d5d', 'Shop của Hưởng', '3d7998a6-1767-11ee-a323-902b34728d5d');
INSERT INTO PRODUCT (ID, NAME, IMAGE, DESCRIPTION, VIEW, NUMBER_OF_PURCHASE, ACTIVE, IS_SHOWN, SUB_CATEGORY_ID, SHOP_ID)
VALUES ('d1ce1b77-181c-11ee-a323-902b34728d5d', 'Quần đùi',
        'https://encrypted-tbn0.gstatic.com/photos?q=tbn:ANd9GcSCV3swAC9hXBua5Y-o5iPru59Bv9g0dsZlDQ&usqp=CAU', null,
        0, 0, 1, 1, '2b7fe3c3-1822-11ee-a323-902b34728d5d', '43f3bf79-181c-11ee-a323-902b34728d5d');
INSERT INTO size (ID, NAME, ACTIVE) VALUES ('27d0d51c-181d-11ee-a323-902b34728d5d', 'XL', 1);
INSERT INTO color (ID, NAME, ACTIVE) VALUES ('40f76f02-181d-11ee-a323-902b34728d5d', 'Xanh dương', 1);
INSERT INTO variant (ID, IMPORT_PRICE, SALE_PRICE, QUANTITY, WEIGHT, ACTIVE, IS_SHOWN, PRODUCT_ID, SIZE_ID, COLOR_ID)
VALUES ('762e4db8-181d-11ee-a323-902b34728d5d', 10000, 12000, 10, 100, 1, 1,'d1ce1b77-181c-11ee-a323-902b34728d5d',
        '27d0d51c-181d-11ee-a323-902b34728d5d', '40f76f02-181d-11ee-a323-902b34728d5d');
INSERT INTO cart (ID, USER_ID)
VALUES ('77cedea1-181e-11ee-a323-902b34728d5d', 'c5ac5ee0-181d-11ee-a323-902b34728d5d');#cart của Minh nhựa
INSERT INTO cart_line (ID, QUANTITY, CART_ID, VARIANT_ID)
VALUES ('b2843002-181e-11ee-a323-902b34728d5d', 2, '77cedea1-181e-11ee-a323-902b34728d5d',
        '762e4db8-181d-11ee-a323-902b34728d5d');