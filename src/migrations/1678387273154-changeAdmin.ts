import { MigrationInterface, QueryRunner } from "typeorm";

export class changeAdmin1678387273154 implements MigrationInterface {
    name = 'changeAdmin1678387273154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET NOT NULL`);
    }

}
