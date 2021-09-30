import {MigrationInterface, QueryRunner} from "typeorm";

export class userUserDetailsRole1632695361889 implements MigrationInterface {
    name = 'userUserDetailsRole1632695361889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_details" ("id" SERIAL NOT NULL, "name" character varying(25), "last_name" character varying, "status" character varying NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_05b6d195a298be51e8fd56e8bc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "email" character varying NOT NULL, "password" text NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "detail_id" integer NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_9fc134ca20766e165ad650ee74" UNIQUE ("detail_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "description" text NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_by_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_7e8938d4c0caa1cbeb49abb38fe" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e99f59753c49508954ce87da2" ON "user_by_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_08e411ee60a0d0dd74f75eba55" ON "user_by_roles" ("rolesId") `);
        await queryRunner.query(`CREATE TABLE "roles_by_users" ("rolesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_2cd84b2e9ab771e8f68f6ae3fc2" PRIMARY KEY ("rolesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3702fa8eac9012d73a60d3b12d" ON "roles_by_users" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd8b485d54d5bdecc66f5ac2b7" ON "roles_by_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "users_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_by_roles" ADD CONSTRAINT "FK_8e99f59753c49508954ce87da22" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_by_roles" ADD CONSTRAINT "FK_08e411ee60a0d0dd74f75eba55f" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_by_users" ADD CONSTRAINT "FK_3702fa8eac9012d73a60d3b12d4" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_by_users" ADD CONSTRAINT "FK_fd8b485d54d5bdecc66f5ac2b7a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_by_users" DROP CONSTRAINT "FK_fd8b485d54d5bdecc66f5ac2b7a"`);
        await queryRunner.query(`ALTER TABLE "roles_by_users" DROP CONSTRAINT "FK_3702fa8eac9012d73a60d3b12d4"`);
        await queryRunner.query(`ALTER TABLE "user_by_roles" DROP CONSTRAINT "FK_08e411ee60a0d0dd74f75eba55f"`);
        await queryRunner.query(`ALTER TABLE "user_by_roles" DROP CONSTRAINT "FK_8e99f59753c49508954ce87da22"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`);
        await queryRunner.query(`DROP INDEX "IDX_fd8b485d54d5bdecc66f5ac2b7"`);
        await queryRunner.query(`DROP INDEX "IDX_3702fa8eac9012d73a60d3b12d"`);
        await queryRunner.query(`DROP TABLE "roles_by_users"`);
        await queryRunner.query(`DROP INDEX "IDX_08e411ee60a0d0dd74f75eba55"`);
        await queryRunner.query(`DROP INDEX "IDX_8e99f59753c49508954ce87da2"`);
        await queryRunner.query(`DROP TABLE "user_by_roles"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "users_details"`);
    }

}
