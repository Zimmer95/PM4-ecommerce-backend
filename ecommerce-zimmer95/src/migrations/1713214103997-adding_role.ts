import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingRole1713214103997 implements MigrationInterface {
    name = 'AddingRole1713214103997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying(20) NOT NULL DEFAULT 'admin'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imgUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imgUrl" SET DEFAULT 'https://res.cloudinary.com/dzupkbfvj/image/upload/fl_preserve_transparency/v1713070779/m8a8ilwpokhcb3sd9mha.jpg?_s=public-apps'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imgUrl" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imgUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
