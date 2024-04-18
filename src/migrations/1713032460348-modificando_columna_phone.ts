import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePhoneColumnType1713032460348 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ALTER COLUMN phone TYPE numeric USING phone::numeric`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ALTER COLUMN phone TYPE varchar(255)`
    );
  }
}
