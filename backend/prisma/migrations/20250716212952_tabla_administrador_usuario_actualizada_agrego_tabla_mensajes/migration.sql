-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "idAdministrador" TEXT NOT NULL DEFAULT 'd56e0c2e-46da-40a6-aa0f-13f98dfd974a';

-- CreateTable
CREATE TABLE "Mensajes" (
    "id" TEXT NOT NULL,
    "idEmisor" TEXT NOT NULL,
    "idReceptor" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "fechaHora" TEXT NOT NULL,
    "leido" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Mensajes_id_key" ON "Mensajes"("id");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_idAdministrador_fkey" FOREIGN KEY ("idAdministrador") REFERENCES "Administrador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
