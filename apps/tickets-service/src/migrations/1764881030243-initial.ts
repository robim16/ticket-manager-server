import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1764881030243 implements MigrationInterface {
    name = 'Initial1764881030243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ticket_estado_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'CLOSED')`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fecha" TIMESTAMP NOT NULL DEFAULT now(), "descripcion" character varying NOT NULL, "estado" "public"."ticket_estado_enum" NOT NULL DEFAULT 'OPEN', CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_estado_enum"`);
    }

}
