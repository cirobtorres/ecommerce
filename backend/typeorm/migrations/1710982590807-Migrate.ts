import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Privileges } from "../../src/user/enum/privilege.enum";

export class Migrate1710982590807 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        schema: "ecommerce",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "firstName",
            type: "varchar",
            length: "63",
          },
          {
            name: "lastName",
            type: "varchar",
            length: "115",
            isNullable: true,
          },
          {
            name: "cpf",
            type: "varchar",
            length: "11",
            isUnique: true,
          },
          {
            name: "phone",
            type: "varchar",
            length: "11",
          },
          {
            name: "email",
            type: "varchar",
            length: "127",
            isUnique: true,
          },
          {
            name: "birthAt",
            type: "date",
            isNullable: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "127",
          },
          {
            name: "createdAt",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "privacyPolicy",
            type: "boolean",
          },
          {
            name: "privileges",
            type: "int",
            default: Privileges.User,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
