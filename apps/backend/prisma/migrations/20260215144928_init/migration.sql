-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('BROKERAGE', 'BANK', 'CRYPTO_EXCHANGE', 'PENSION', 'OTHER');

-- CreateEnum
CREATE TYPE "AssetCategory" AS ENUM ('DOMESTIC', 'FOREIGN', 'BOND', 'SAVINGS', 'CASH', 'GOLD', 'CRYPTO', 'REAL_ESTATE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('BUY', 'SELL', 'DEPOSIT', 'WITHDRAWAL', 'DIVIDEND', 'INTEREST');

-- CreateEnum
CREATE TYPE "OcrScanStatus" AS ENUM ('PENDING', 'PROCESSING', 'REVIEW_PENDING', 'CONFIRMED', 'FAILED');

-- CreateEnum
CREATE TYPE "MarketType" AS ENUM ('DOMESTIC', 'FOREIGN');

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "institution" TEXT,
    "accountNumber" TEXT,
    "accountType" "AccountType" NOT NULL,
    "description" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT,
    "category" "AssetCategory" NOT NULL,
    "symbol" TEXT,
    "name" TEXT NOT NULL,
    "quantity" DECIMAL(20,8) NOT NULL,
    "currency" TEXT NOT NULL,
    "lastPriceUpdate" TIMESTAMP(3),
    "dividendYield" DECIMAL(5,2),
    "dividendMonth" INTEGER[],
    "targetPrice" DECIMAL(20,2),
    "memo" TEXT,
    "identifier" TEXT NOT NULL,
    "exchangeRate" DECIMAL(10,4),
    "currentPrice" DECIMAL(20,2),
    "purchasePrice" DECIMAL(20,2),
    "totalPrice" DECIMAL(20,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT,
    "assetId" TEXT,
    "assetName" TEXT,
    "assetSymbol" TEXT,
    "assetCategory" "AssetCategory",
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(20,2) NOT NULL,
    "quantity" DECIMAL(20,8),
    "price" DECIMAL(20,2),
    "currency" TEXT NOT NULL,
    "exchangeRate" DECIMAL(10,4),
    "transactionDate" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ocr_scans" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT,
    "imageUrl" TEXT NOT NULL,
    "geminiRawResponse" TEXT,
    "parsedJson" JSONB,
    "status" "OcrScanStatus" NOT NULL DEFAULT 'PENDING',
    "errorMessage" TEXT,
    "appSource" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ocr_scans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ocr_scan_items" (
    "id" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT,
    "category" "AssetCategory",
    "quantity" DECIMAL(20,8),
    "price" DECIMAL(20,2),
    "totalValue" DECIMAL(20,2),
    "currency" TEXT DEFAULT 'KRW',
    "profitLoss" DECIMAL(20,2),
    "profitLossRate" DECIMAL(10,2),
    "rawText" TEXT,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "linkedAssetId" TEXT,
    "confidence" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ocr_scan_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_goals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetAmount" DECIMAL(20,2) NOT NULL,
    "currentAmount" DECIMAL(20,2) NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_histories" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "price" DECIMAL(20,2) NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exchange_rates" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "rate" DECIMAL(20,8) NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exchange_rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "market" TEXT,
    "marketType" "MarketType" NOT NULL,
    "sector" TEXT,
    "industry" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_userId_name_key" ON "accounts"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "assets_userId_accountId_identifier_key" ON "assets"("userId", "accountId", "identifier");

-- CreateIndex
CREATE UNIQUE INDEX "exchange_rates_currency_date_key" ON "exchange_rates"("currency", "date");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_symbol_key" ON "stocks"("symbol");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ocr_scans" ADD CONSTRAINT "ocr_scans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ocr_scans" ADD CONSTRAINT "ocr_scans_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ocr_scan_items" ADD CONSTRAINT "ocr_scan_items_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "ocr_scans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_goals" ADD CONSTRAINT "asset_goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_histories" ADD CONSTRAINT "price_histories_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
