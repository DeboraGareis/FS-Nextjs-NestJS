-- AlterTable
ALTER TABLE "Mensajes" ADD CONSTRAINT "Mensajes_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Mensajes_id_key";

-- AlterTable
ALTER TABLE "Producto" ALTER COLUMN "idAdministrador" DROP DEFAULT;
