CREATE DATABASE IF NOT EXISTS
    cogy_ecommerce_database;
USE
cogy_ecommerce_database;


CREATE TABLE ROLE
(
    ID                  VARCHAR(36) PRIMARY KEY,
    NAME                VARCHAR(50)  NOT NULL,
    DESCRIPTION         VARCHAR(100) NOT NULL
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
    ID                  VARCHAR(36) PRIMARY KEY,
    ACTIVE              BOOLEAN     DEFAULT TRUE,
    AVATAR              TEXT,
    GENDER              VARCHAR(6),
    CONFIRMATION_CODE   VARCHAR(255),
    EMAIL               VARCHAR(50) UNIQUE NOT NULL,
    FULL_NAME           VARCHAR(50)        NOT NULL,
    PASSWORD            TEXT               NOT NULL,
    PHONE               VARCHAR(12) UNIQUE NOT NULL,
    USERNAME            VARCHAR(20) UNIQUE NOT NULL,
    WALLET              DOUBLE             NOT NULL DEFAULT 0 CHECK ( WALLET >= 0 ),
    STATUS              VARCHAR(20)
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
    USER_ID             VARCHAR(36) NOT NULL,
    ROLE_ID             VARCHAR(36) NOT NULL,
    PRIMARY KEY (USER_ID, ROLE_ID)
);

CREATE TABLE USER_LOCATION
(
    ID                      VARCHAR(36) PRIMARY KEY,
    TYPE_ADDRESS            VARCHAR(20),
    IS_DEFAULT_ADDRESS      BOOLEAN,
    DEPUTY_NAME             VARCHAR(30),
    PHONE_NUMBER            VARCHAR(10),
    PROVINCE                VARCHAR(100),
    DISTRICT                VARCHAR(100),
    WARD                    VARCHAR(100),
    HAMLET                  VARCHAR(30),
    ADDRESS                 VARCHAR(100),
    USER_ID                 VARCHAR(36),
    FOREIGN KEY (USER_ID) REFERENCES USER (ID)
);

DELIMITER $$
CREATE TRIGGER USER_LOCATION_INSERT_TRIGGER
    BEFORE INSERT
    ON USER_LOCATION
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
END IF;
END$$
DELIMITER ;

CREATE TABLE SELLER
(
    ID                      VARCHAR(36) PRIMARY KEY,
    NAME                    VARCHAR(50) NOT NULL,
    IMAGE                   TEXT,
    CREATION_TIME           DATETIME DEFAULT NOW(),
    USER_ID                 VARCHAR(36) UNIQUE,
    FOREIGN KEY (USER_ID) REFERENCES USER (ID)
);

DELIMITER $$
CREATE TRIGGER SELLER_INSERT_TRIGGER
    BEFORE INSERT
    ON SELLER
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
        SET NEW.CREATION_TIME = NOW();
    ELSEIF NEW.CREATION_TIME IS NULL THEN
        SET NEW.CREATION_TIME = NOW();
END IF;
END$$
DELIMITER ;

CREATE TABLE SELLER_LOCATION
(
    ID                  VARCHAR(36) PRIMARY KEY,
    TYPE_ADDRESS        VARCHAR(20),
    IS_DEFAULT_ADDRESS  BOOLEAN,
    DEPUTY_NAME         VARCHAR(30),
    PHONE_NUMBER        VARCHAR(10),
    PROVINCE            VARCHAR(100),
    DISTRICT            VARCHAR(100),
    WARD                VARCHAR(100),
    HAMLET              VARCHAR(30),
    ADDRESS             VARCHAR(100),
    SELLER_ID           VARCHAR(36),
    FOREIGN KEY (SELLER_ID) REFERENCES SELLER (ID)
);

DELIMITER $$
CREATE TRIGGER SELLER_LOCATION_INSERT_TRIGGER
    BEFORE INSERT
    ON SELLER_LOCATION
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
END IF;
END$$
DELIMITER ;

CREATE TABLE CATEGORY
(
    ID              VARCHAR(36) PRIMARY KEY,
    NAME            VARCHAR(50) NOT NULL,
    ACTIVE          BOOLEAN DEFAULT TRUE,
    IMAGE           TEXT        NOT NULL
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
    ID                      VARCHAR(36) PRIMARY KEY,
    NAME                    VARCHAR(50) NOT NULL,
    ACTIVE                  BOOLEAN DEFAULT TRUE,
    CATEGORY_ID             VARCHAR(36),
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
    ID                    VARCHAR(36) PRIMARY KEY,
    NAME                  VARCHAR(255) NOT NULL,
    IMAGE                 TEXT,
    DESCRIPTION           LONGBLOB,
    VIEW                  BIGINT   DEFAULT 0 CHECK ( VIEW >= 0 ),
    NUMBER_OF_PURCHASE    BIGINT   DEFAULT 0 CHECK ( NUMBER_OF_PURCHASE >= 0 ),
    MIN_PRICE_OF_VARIANTS DOUBLE       NOT NULL CHECK ( MIN_PRICE_OF_VARIANTS >= 0 ),
    MAX_PRICE_OF_VARIANTS DOUBLE       NOT NULL CHECK ( MAX_PRICE_OF_VARIANTS >= 0 ),
    DEFINITION_OF_COLOR   VARCHAR(14)  NOT NULL,
    DEFINITION_OF_SIZE    VARCHAR(14)  NOT NULL,
    ACTIVE                BOOLEAN  DEFAULT TRUE,
    IS_SHOWN              BOOLEAN  DEFAULT TRUE,
    CREATION_TIME         DATETIME DEFAULT NOW(),
    SUB_CATEGORY_ID       VARCHAR(36),
    SELLER_ID             VARCHAR(36),
    FOREIGN KEY (SUB_CATEGORY_ID) REFERENCES SUB_CATEGORY (ID),
    FOREIGN KEY (SELLER_ID) REFERENCES SELLER (ID)
);

DELIMITER $$
CREATE TRIGGER PRODUCT_INSERT_TRIGGER
    BEFORE INSERT
    ON PRODUCT
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
        SET NEW.CREATION_TIME = NOW();
    ELSEIF NEW.CREATION_TIME IS NULL THEN
        SET NEW.CREATION_TIME = NOW();
END IF;
END$$
DELIMITER ;

CREATE TABLE PHOTO
(
    ID                  VARCHAR(36) PRIMARY KEY,
    URL                 TEXT,
    PRODUCT_ID          VARCHAR(36),
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
    ID                 VARCHAR(36) PRIMARY KEY,
    IMPORT_PRICE       DOUBLE      NOT NULL CHECK ( IMPORT_PRICE >= 0 ),
    SALE_PRICE         DOUBLE      NOT NULL CHECK ( SALE_PRICE >= 0 ),
    DISCOUNT_PRICE     DOUBLE      CHECK ( DISCOUNT_PRICE >= 0 ),
    STOCK              INT         NOT NULL CHECK ( STOCK >= 0 ),
    WEIGHT             BIGINT      NOT NULL CHECK ( WEIGHT > 0 ),
    NUMBER_OF_PURCHASE BIGINT      DEFAULT 0 CHECK ( NUMBER_OF_PURCHASE >= 0 ),
    ACTIVE             BOOLEAN     DEFAULT TRUE,
    IS_SHOWN           BOOLEAN     DEFAULT TRUE,
    PRODUCT_ID         VARCHAR(36),
    SIZE_ID            VARCHAR(36),
    COLOR_ID           VARCHAR(36),
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
    ID         VARCHAR(36)  PRIMARY KEY,
    QUANTITY   INT          NOT NULL CHECK ( QUANTITY >= 0 ),
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
    ID                          VARCHAR(36) PRIMARY KEY,
    BUYER_ID                    VARCHAR(36) NOT NULL,
    SELLER_ID                   VARCHAR(36) NOT NULL,
    TOTAL_PRICE                 DOUBLE      NOT NULL CHECK ( TOTAL_PRICE >= 0 ),
    SHIPPING_FEE                DOUBLE      NOT NULL CHECK ( SHIPPING_FEE >= 0 ),
    STATUS                      VARCHAR(20) NOT NULL,
    DELIVERY_SERVICE            VARCHAR(50) NOT NULL,
    COGY_ORDER_CODE             VARCHAR(50) UNIQUE,
    DELIVERY_TRACKING_CODE      VARCHAR(100),
    REQUEST_TIME                TIMESTAMP,
    CONFIRM_TIME                TIMESTAMP,
    PICK_UP_TIME                TIMESTAMP,
    COMPLETE_TIME               TIMESTAMP,
    CANCEL_TIME                 TIMESTAMP,
    FOREIGN KEY (BUYER_ID) REFERENCES USER (ID),
    FOREIGN KEY (SELLER_ID) REFERENCES SELLER (ID)
);

DELIMITER $$
CREATE TRIGGER ORDERS_INSERT_TRIGGER
    BEFORE INSERT
    ON ORDERS
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
        SET NEW.REQUEST_TIME = NOW();
        SET NEW.COGY_ORDER_CODE = CONCAT(DATE_FORMAT(NOW(), '%y%m%d%H%i%s'), SUBSTRING(NEW.ID, 1, 8));
    ELSEIF NEW.REQUEST_TIME IS NULL THEN
        SET NEW.REQUEST_TIME = NOW();
END IF;
IF NEW.COGY_ORDER_CODE IS NULL THEN
        SET NEW.COGY_ORDER_CODE = CONCAT(DATE_FORMAT(NOW(), '%y%m%d%H%i%s'), SUBSTRING(NEW.ID, 1, 8));
END IF;
END$$
DELIMITER ;

CREATE TABLE ORDER_DETAIL
(
    ID         VARCHAR(36) PRIMARY KEY,
    QUANTITY   INT         NOT NULL CHECK ( QUANTITY >= 0 ),
    VARIANT_ID VARCHAR(36),
    ORDERS_ID  VARCHAR(36),
    FOREIGN KEY (VARIANT_ID) REFERENCES VARIANT (ID),
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

CREATE TABLE STATUS
(
    ID     VARCHAR(36) PRIMARY KEY,
    NAME   VARCHAR(25) NOT NULL
);

DELIMITER $$
CREATE TRIGGER STATUS_INSERT_TRIGGER
    BEFORE INSERT
    ON STATUS
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
END IF;
END$$
DELIMITER ;

CREATE TABLE VOUCHER
(
    ID              VARCHAR(36) PRIMARY KEY,
    NAME_PROMOTION  VARCHAR(100) NOT NULL,
    CODE            VARCHAR(25) NOT NULL,
    VALUE           BIGINT NOT NULL CHECK ( VALUE > 0 ),
    TYPE            VARCHAR(25) NOT NULL,
    TIME_CREATE     TIMESTAMP NOT NULL,
    TIME_START      TIMESTAMP NOT NULL,
    TIME_END        TIMESTAMP NOT NULL,
    MAX_USED        INT NOT NULL CHECK ( MAX_USED > 0 ),
    REQUIREMENT       BIGINT CHECK ( REQUIREMENT > 0 ),
    STATUS_ID       VARCHAR(36),
    SELLER_ID       VARCHAR(36),
    FOREIGN KEY (STATUS_ID) REFERENCES STATUS (ID),
    FOREIGN KEY (SELLER_ID) REFERENCES SELLER (ID)
);

DELIMITER $$
CREATE TRIGGER VOUCHER_INSERT_TRIGGER
    BEFORE INSERT
    ON VOUCHER
    FOR EACH ROW
BEGIN
    IF NEW.ID IS NULL THEN
        SET NEW.ID = UUID();
END IF;
END$$
DELIMITER ;

CREATE TABLE VOUCHERS_PRODUCTS
(
    VOUCHER_ID   VARCHAR(36) NOT NULL,
    PRODUCT_ID   VARCHAR(36) NOT NULL,
    PRIMARY KEY (VOUCHER_ID, PRODUCT_ID),
    FOREIGN KEY (VOUCHER_ID) REFERENCES VOUCHER (ID),
    FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCT (ID)
);
