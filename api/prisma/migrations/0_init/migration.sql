-- CreateTable
CREATE TABLE "burger_ingredients" (
    "id_ingredient_burger" SERIAL NOT NULL,
    "id_ingredient" INTEGER,
    "id_burger" INTEGER,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "burger_ingredients_pkey" PRIMARY KEY ("id_ingredient_burger")
);

-- CreateTable
CREATE TABLE "menu" (
    "id_burger" SERIAL NOT NULL,
    "burger_name" VARCHAR(50) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id_burger")
);

-- CreateTable
CREATE TABLE "orders" (
    "id_order" SERIAL NOT NULL,
    "id_burger" INTEGER,
    "quantity" INTEGER NOT NULL,
    "order_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "stock" (
    "id_ingredient" SERIAL NOT NULL,
    "ingredient_name" VARCHAR(50) NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id_ingredient")
);

-- AddForeignKey
ALTER TABLE "burger_ingredients" ADD CONSTRAINT "burger_ingredients_id_burger_fkey" FOREIGN KEY ("id_burger") REFERENCES "menu"("id_burger") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "burger_ingredients" ADD CONSTRAINT "burger_ingredients_id_ingredient_fkey" FOREIGN KEY ("id_ingredient") REFERENCES "stock"("id_ingredient") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_burger_fkey" FOREIGN KEY ("id_burger") REFERENCES "menu"("id_burger") ON DELETE NO ACTION ON UPDATE NO ACTION;

