import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDefaultValueForRole1713226902945 implements MigrationInterface {
    name = 'ChangeDefaultValueForRole1713226902945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'admin'`);
    }

}
