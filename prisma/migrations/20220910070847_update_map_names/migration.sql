/*
  Warnings:

  - You are about to drop the `cart_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_product_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_shopping_session_id_fkey";

-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_payment_details_id_fkey";

-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_details_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_product_id_fkey";

-- DropTable
DROP TABLE "cart_item";

-- DropTable
DROP TABLE "order_details";

-- DropTable
DROP TABLE "order_items";

-- DropTable
DROP TABLE "payment_details";

-- DropTable
DROP TABLE "verificationTokens";

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "cart_items" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "shopping_session_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments_details" (
    "id" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_details" (
    "id" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "payment_details_id" TEXT,

    CONSTRAINT "orders_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_items" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "order_details_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "orders_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_shopping_session_id_fkey" FOREIGN KEY ("shopping_session_id") REFERENCES "shopping_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_details" ADD CONSTRAINT "orders_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_details" ADD CONSTRAINT "orders_details_payment_details_id_fkey" FOREIGN KEY ("payment_details_id") REFERENCES "payments_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_order_details_id_fkey" FOREIGN KEY ("order_details_id") REFERENCES "orders_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
