import { MigrationInterface, QueryRunner } from "typeorm";

export class linkStudentAndOfferedClass1682251697377 implements MigrationInterface {
    name = 'linkStudentAndOfferedClass1682251697377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "entered" integer NOT NULL, "grade" integer NOT NULL, CONSTRAINT "PK_fca1c1cc9adc7aea54a40e70e88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "offered_class_entity" ("code" integer NOT NULL, "name" character varying NOT NULL, "hours" integer NOT NULL, CONSTRAINT "PK_5eff6b5547498e37fff3974b236" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "student_entity_classes_offered_class_entity" ("studentEntityId" integer NOT NULL, "offeredClassEntityCode" integer NOT NULL, CONSTRAINT "PK_dc29a7e73f623c3ec5e8a8e25f5" PRIMARY KEY ("studentEntityId", "offeredClassEntityCode"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf3def2c7c34bfea418bfc6194" ON "student_entity_classes_offered_class_entity" ("studentEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_92bac7c5a15bdf13dbda4aba1c" ON "student_entity_classes_offered_class_entity" ("offeredClassEntityCode") `);
        await queryRunner.query(`ALTER TABLE "student_entity_classes_offered_class_entity" ADD CONSTRAINT "FK_cf3def2c7c34bfea418bfc6194c" FOREIGN KEY ("studentEntityId") REFERENCES "student_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "student_entity_classes_offered_class_entity" ADD CONSTRAINT "FK_92bac7c5a15bdf13dbda4aba1c7" FOREIGN KEY ("offeredClassEntityCode") REFERENCES "offered_class_entity"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_entity_classes_offered_class_entity" DROP CONSTRAINT "FK_92bac7c5a15bdf13dbda4aba1c7"`);
        await queryRunner.query(`ALTER TABLE "student_entity_classes_offered_class_entity" DROP CONSTRAINT "FK_cf3def2c7c34bfea418bfc6194c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92bac7c5a15bdf13dbda4aba1c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf3def2c7c34bfea418bfc6194"`);
        await queryRunner.query(`DROP TABLE "student_entity_classes_offered_class_entity"`);
        await queryRunner.query(`DROP TABLE "offered_class_entity"`);
        await queryRunner.query(`DROP TABLE "student_entity"`);
    }

}
