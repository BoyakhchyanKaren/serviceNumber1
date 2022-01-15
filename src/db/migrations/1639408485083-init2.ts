import {MigrationInterface, QueryRunner} from "typeorm";

export class init21639408485083 implements MigrationInterface {
    name = 'init21639408485083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "rating_quantity"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "rating_quantity" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "rating_quantity"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "rating_quantity" bigint NOT NULL DEFAULT '0'`);
    }

};

