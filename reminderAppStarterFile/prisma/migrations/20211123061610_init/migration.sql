-- CreateTable
CREATE TABLE "loginDatabase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "pic" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Database" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Database_userID_fkey" FOREIGN KEY ("userID") REFERENCES "loginDatabase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "loginDatabase_email_key" ON "loginDatabase"("email");
