-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_idAdministrador_fkey";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_idAdministrador_fkey" FOREIGN KEY ("idAdministrador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
