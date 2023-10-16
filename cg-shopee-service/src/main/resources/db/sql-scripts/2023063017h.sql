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

CREATE TABLE USERS_ROLES
(
    USER_ID VARCHAR(36),
    ROLE_ID VARCHAR(36),
    PRIMARY KEY (USER_ID, ROLE_ID)
);

CREATE TABLE LOCATION
(
    ID       VARCHAR(36) PRIMARY KEY,
    PROVINCE VARCHAR(100),
    DISTRICT VARCHAR(100),
    WARD     VARCHAR(100),
    HAMLET   VARCHAR(100),
    ADDRESS  TEXT,
    IS_PICK_UP_ADDRESS BOOLEAN NOT NULL,
    IS_DELIVERY_ADDRESS BOOLEAN NOT NULL,
    USER_ID  VARCHAR(36),
    FOREIGN KEY (USER_ID) REFERENCES USER (ID)
);

CREATE TABLE SHOP
(
    ID      VARCHAR(36) PRIMARY KEY,
    NAME    VARCHAR(50) NOT NULL,
    USER_ID VARCHAR(36) unique,
    FOREIGN KEY (USER_ID) REFERENCES USER (ID)
);

CREATE TABLE CATEGORY
(
    ID     VARCHAR(36) PRIMARY KEY,
    NAME   VARCHAR(50) NOT NULL,
    ACTIVE BOOLEAN DEFAULT TRUE
);

CREATE TABLE SUB_CATEGORY
(
    ID          VARCHAR(36) PRIMARY KEY,
    NAME        VARCHAR(50) NOT NULL,
    ACTIVE      BOOLEAN DEFAULT TRUE,
    CATEGORY_ID VARCHAR(36),
    FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY (ID)
);

CREATE TABLE PRODUCT
(
    ID              VARCHAR(36) PRIMARY KEY,
    NAME            VARCHAR(255) NOT NULL,
    AVATAR           TEXT,
    DESCRIPTION     LONGBLOB,
    VIEW BIGINT DEFAULT 0 CHECK ( VIEW >= 0 ),
    NUMBER_OF_PURCHASE BIGINT DEFAULT 0 CHECK ( NUMBER_OF_PURCHASE >= 0 ),
    ACTIVE          BOOLEAN DEFAULT TRUE,
    IS_SHOWN        BOOLEAN DEFAULT TRUE,
    SUB_CATEGORY_ID VARCHAR(36),
    FOREIGN KEY (SUB_CATEGORY_ID) REFERENCES SUB_CATEGORY (ID),
    SHOP_ID         VARCHAR(36),
    FOREIGN KEY (SHOP_ID) REFERENCES SHOP (ID)
);

CREATE TABLE IMAGE
(
    ID              VARCHAR(36) PRIMARY KEY,
    URL             TEXT,
    PRODUCT_ID VARCHAR(36),
    FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCT (ID)
);

CREATE TABLE SIZE
(
    ID     VARCHAR(36) PRIMARY KEY,
    NAME   VARCHAR(25) NOT NULL,
    ACTIVE BOOLEAN DEFAULT TRUE
);

CREATE TABLE COLOR
(
    ID     VARCHAR(36) PRIMARY KEY,
    NAME   VARCHAR(25) NOT NULL,
    ACTIVE BOOLEAN DEFAULT TRUE
);

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

CREATE TABLE CART
(
    ID      VARCHAR(36) PRIMARY KEY,
    USER_ID VARCHAR(36) UNIQUE,
    FOREIGN KEY (USER_ID) REFERENCES USER (ID)
);

CREATE TABLE CART_LINE
(
    ID         VARCHAR(36) PRIMARY KEY,
    QUANTITY   INT NOT NULL CHECK ( QUANTITY >= 0 ),
    CART_ID    VARCHAR(36),
    VARIANT_ID VARCHAR(36),
    FOREIGN KEY (CART_ID) REFERENCES CART (ID),
    FOREIGN KEY (VARIANT_ID) REFERENCES VARIANT (ID)
);

CREATE TABLE ORDERS
(
    ID           VARCHAR(36) PRIMARY KEY,
    BUYER_ID VARCHAR(36),
    FOREIGN KEY (BUYER_ID) REFERENCES USER (ID),
    IS_FREE_SHIP  BOOLEAN NOT NULL,
    TOTAL_PRICE   DOUBLE CHECK ( TOTAL_PRICE >= 0 ),
    STATUS_TEXT  VARCHAR(100)
);

CREATE TABLE ORDER_DETAIL
(
    ID         VARCHAR(36) PRIMARY KEY,
    QUANTITY   INT NOT NULL CHECK ( QUANTITY >= 0 ),
    VARIANT_ID VARCHAR(36),
    FOREIGN KEY (VARIANT_ID) REFERENCES VARIANT (ID),
    ORDERS_ID  VARCHAR(36),
    FOREIGN KEY (ORDERS_ID) REFERENCES ORDERS (ID)
);

INSERT INTO ROLE (ID, NAME, DESCRIPTION)
VALUES (UUID(), 'ROLE_ADMIN', 'Quản trị viên'),
       (UUID(), 'ROLE_CUSTOMER', 'Khách hàng'),
       (UUID(), 'ROLE_SHOP', 'Nhà bán hàng')
;
SELECT ID
FROM ROLE
WHERE NAME = 'ROLE_ADMIN'
INTO @ID_ROLE_ADMIN;
INSERT INTO USER (ID, EMAIL, FULL_NAME, PHONE, USERNAME, PASSWORD)
VALUES (UUID(), 'shopee@gmail.com', 'ADMIN SHOPEE', '0999999999', 'admin',
        '$2a$10$/fEKrX3F3sRz/CMMCgIaXuYaM01ZamVlqvf4TeQxOUupGUDBkpliK');
# Mật khẩu: Huong@123
SELECT ID
FROM USER
WHERE PHONE = '0999999999'
INTO @ID_LAST_USER;
INSERT INTO USERS_ROLES (USER_ID, ROLE_ID)
VALUES (@ID_LAST_USER, @ID_ROLE_ADMIN);

INSERT INTO CATEGORY (ID, NAME)
VALUES (UUID(), 'Thời Trang Nam'),
       (UUID(), 'Điện thoại & Phụ Kiện'),
       (UUID(), 'Thiết Bị Điện Tử'),
       (UUID(), 'Máy Tính & Laptop'),
       (UUID(), 'Máy Ảnh & Máy Quay Phim'),
       (UUID(), 'Thời Trang Nữ'),
       (UUID(), 'Mẹ Và Bé'),
       (UUID(), 'Nhà Cửa & Đời Sống'),
       (UUID(), 'Sức Khỏe'),
       (UUID(), 'Đồng hồ')
;
SELECT ID
FROM CATEGORY
WHERE NAME = 'Thời Trang Nam'
INTO @ID_CATEGORY;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES (UUID(), 'Áo sơ mi', @ID_CATEGORY),
       (UUID(), 'Quần jeans', @ID_CATEGORY),
       (UUID(), 'Quần tây', @ID_CATEGORY)
;
SELECT ID
FROM CATEGORY
WHERE NAME = 'Điện thoại & Phụ Kiện'
INTO @ID_CATEGORY;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES (UUID(), 'Điện thoại', @ID_CATEGORY),
       (UUID(), 'Máy tính bảng', @ID_CATEGORY),
       (UUID(), 'Pin dự phòng', @ID_CATEGORY)
;
SELECT ID
FROM CATEGORY
WHERE NAME = 'Thiết Bị Điện Tử'
INTO @ID_CATEGORY;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES (UUID(), 'Tivi', @ID_CATEGORY),
       (UUID(), 'Loa', @ID_CATEGORY),
       (UUID(), 'Đĩa game', @ID_CATEGORY)
;
SELECT ID
FROM CATEGORY
WHERE NAME = 'Máy Tính & Laptop'
INTO @ID_CATEGORY;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES (UUID(), 'Máy tính bàn', @ID_CATEGORY),
       (UUID(), 'Màn hình', @ID_CATEGORY),
       (UUID(), 'Thiết bị mạng', @ID_CATEGORY)
;
SELECT ID
FROM CATEGORY
WHERE NAME = 'Máy Ảnh & Máy Quay Phim'
INTO @ID_CATEGORY;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES (UUID(), 'Ống kính', @ID_CATEGORY),
       (UUID(), 'Phụ kiện máy ảnh', @ID_CATEGORY),
       (UUID(), 'Thẻ nhớ', @ID_CATEGORY),
       (UUID(), 'Máy ảnh', @ID_CATEGORY)
;
SELECT ID
FROM CATEGORY
WHERE NAME = 'Thời Trang Nữ'
INTO @ID_CATEGORY;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES (UUID(), 'Quần đùi', @ID_CATEGORY),
       (UUID(), 'Chân váy', @ID_CATEGORY),
       (UUID(), 'Áo thun nữ', @ID_CATEGORY),
       (UUID(), 'Đồ lót', @ID_CATEGORY)
;
SELECT ID
FROM CATEGORY
WHERE NAME = 'Mẹ Và Bé'
INTO @ID_CATEGORY;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES (UUID(), 'Đồ ăn dặm', @ID_CATEGORY),
       (UUID(), 'Đồ chơi', @ID_CATEGORY),
       (UUID(), 'Phụ kiện cho mẹ', @ID_CATEGORY),
       (UUID(), 'Tã và bỉm', @ID_CATEGORY)
;
SELECT ID
FROM CATEGORY
WHERE NAME = 'Nhà Cửa & Đời Sống'
INTO @ID_CATEGORY;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES (UUID(), 'Chăn ga gối nệm', @ID_CATEGORY),
       (UUID(), 'Đồ nội thất', @ID_CATEGORY),
       (UUID(), 'Đồ dùng nhà bếp', @ID_CATEGORY),
       (UUID(), 'Trang trí nhà cửa', @ID_CATEGORY)
;
SELECT ID
FROM CATEGORY
WHERE NAME = 'Sức Khỏe'
INTO @ID_CATEGORY;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES (UUID(), 'Vật tư y tế', @ID_CATEGORY),
       (UUID(), 'Thực phẩm chức năng', @ID_CATEGORY),
       (UUID(), 'Hỗ trợ tình dục', @ID_CATEGORY),
       (UUID(), 'Hỗ trợ làm đẹp', @ID_CATEGORY)
;
SELECT ID
FROM CATEGORY
WHERE NAME = 'Đồng hồ'
INTO @ID_CATEGORY;
INSERT INTO SUB_CATEGORY (ID, NAME, CATEGORY_ID)
VALUES (UUID(), 'Đồng hồ nam', @ID_CATEGORY),
       (UUID(), 'Đồng hồ nữ', @ID_CATEGORY),
       (UUID(), 'Đồng hồ trẻ em', @ID_CATEGORY),
       (UUID(), 'Phụ kiện đồng hồ', @ID_CATEGORY)
;
SELECT ID
FROM SUB_CATEGORY
WHERE NAME = 'Áo sơ mi'
    INTO @ID_CATEGORY;
INSERT INTO cogy_ecommerce_database.user (ID, ACTIVE, EMAIL, FULL_NAME, PASSWORD, PHONE, USERNAME, WALLET) VALUES ('12bfcc13-1715-11ee-bac4-00ac6b5af6ae', 1, 'minh@gmail.com', 'CUSTOMER', '$2a$10$/fEKrX3F3sRz/CMMCgIaXuYaM01ZamVlqvf4TeQxOUupGUDBkpliK', '0911355979', 'minh', 0);
INSERT INTO cogy_ecommerce_database.shop (ID, NAME, USER_ID) VALUES ('g26fcc13-1715-11ee-bac4-00ac6b5af6ae', 'renekots', '12bfcc13-1715-11ee-bac4-00ac6b5af6ae');
INSERT INTO cogy_ecommerce_database.product (ID, NAME, AVATAR, DESCRIPTION, ACTIVE, IS_SHOWN, SUB_CATEGORY_ID, SHOP_ID) VALUES ('332b8182-1715-11ee-bac4-00ac6b5af6ae', 'Áo sơ mi rẻ tiền', 'ap.png', null, 1, 1, @ID_CATEGORY, 'g26fcc13-1715-11ee-bac4-00ac6b5af6ae');
INSERT INTO cogy_ecommerce_database.variant (ID, IMPORT_PRICE, SALE_PRICE, QUANTITY, WEIGHT, ACTIVE, IS_SHOWN, PRODUCT_ID, SIZE_ID, COLOR_ID) VALUES ('332b8182-1715-11ee-bac4-00ac6b5af6za', 500, 1000, 1, 1, 1, 1, '332b8182-1715-11ee-bac4-00ac6b5af6ae', null, null);
INSERT INTO cogy_ecommerce_database.cart (ID, USER_ID) VALUES ('12bfcc13-1715-11ee-bac4-11ac6b5a6hff', '12bfcc13-1715-11ee-bac4-00ac6b5af6ae');
INSERT INTO cogy_ecommerce_database.cart_line (ID, QUANTITY, CART_ID, VARIANT_ID) VALUES ('332b8789-1715-11ee-bac4-00ac6b5af6za', 1, '12bfcc13-1715-11ee-bac4-11ac6b5a6hff', '332b8182-1715-11ee-bac4-00ac6b5af6za');





