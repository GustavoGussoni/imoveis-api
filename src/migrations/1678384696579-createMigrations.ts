import { MigrationInterface, QueryRunner } from "typeorm";

export class createMigrations1678384696579 implements MigrationInterface {
    name = 'createMigrations1678384696579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "FK_64ed7af6aad07d6beedc540aa00"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "FK_7c3d372ffff92fca70e39d47b77"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_fbf218812039f56de7597d65fdc"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_39a75f0ad7d19e3f1238d6a4e9a"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "REL_64ed7af6aad07d6beedc540aa0"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP COLUMN "addressIdId"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP COLUMN "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "realEstateIdId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "UQ_8137b7f715382ad34dc87367d21" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "realEstateId" integer`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "FK_8137b7f715382ad34dc87367d21" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "FK_66429ecade1b04f502b6e42c7a8" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_ac3131bb922483053abebc5e9ff" FOREIGN KEY ("realEstateId") REFERENCES "realEstate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_ac3131bb922483053abebc5e9ff"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "FK_66429ecade1b04f502b6e42c7a8"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "FK_8137b7f715382ad34dc87367d21"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "realEstateId"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "UQ_8137b7f715382ad34dc87367d21"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "realEstateIdId" integer`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD "categoryIdId" integer`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD "addressIdId" integer`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "REL_64ed7af6aad07d6beedc540aa0" UNIQUE ("addressIdId")`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_39a75f0ad7d19e3f1238d6a4e9a" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_fbf218812039f56de7597d65fdc" FOREIGN KEY ("realEstateIdId") REFERENCES "realEstate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "FK_7c3d372ffff92fca70e39d47b77" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "FK_64ed7af6aad07d6beedc540aa00" FOREIGN KEY ("addressIdId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
