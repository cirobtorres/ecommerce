import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Privileges } from "../../src/user/enum/privilege.enum";
import { Voltage } from "../../src/product/enum/voltage.enum";

export class Migrate1710982590807 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
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
            name: "userAddress",
            type: "int",
          },
          {
            name: "src",
            type: "varchar",
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

    await queryRunner.createTable(
      new Table({
        name: "user_address",
        schema: "ecommerce",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "street",
            type: "varchar",
            length: "255",
          },
          {
            name: "number",
            type: "int",
          },
          {
            name: "neighborhood",
            type: "varchar",
            length: "115",
          },
          {
            name: "city",
            type: "varchar",
            length: "115",
          },
          {
            name: "state",
            type: "varchar",
            length: "30",
          },
          {
            name: "zipCode",
            type: "varchar",
            length: "8",
          },
          {
            name: "place",
            type: "varchar",
            length: "115",
          },
          {
            name: "userId",
            type: "int",
          },
          {
            name: "defaultAddress",
            type: "boolean",
            default: false,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "product",
        schema: "ecommerce",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "code",
            type: "varchar",
            length: "20",
            isUnique: true,
          },
          {
            name: "title",
            type: "varchar",
            length: "255",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "manufacturer",
            type: "int",
          },
          {
            name: "product_src",
            type: "int",
          },
          {
            name: "password",
            type: "varchar",
            length: "127",
          },
          {
            name: "purchasePrice",
            type: "int",
          },
          {
            name: "sellingPrice",
            type: "int",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "product_src",
        schema: "ecommerce",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "src",
            type: "varchar",
          },
          {
            name: "product",
            type: "int",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "manufacturer",
        schema: "ecommerce",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "brandName",
            type: "varchar",
            length: "255",
          },
          {
            name: "legalName",
            type: "varchar",
            length: "255",
          },
          {
            name: "cnpj",
            type: "varchar",
            length: "14",
            isUnique: true,
          },
          {
            name: "ie",
            type: "varchar",
          },
          {
            name: "im",
            type: "varchar",
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
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableUserAddress = await queryRunner.getTable("user_address");
    const tableProductSrc = await queryRunner.getTable("product_src");
    const foreignKeyUserAddress = tableUserAddress.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("userId") !== -1
    );
    const foreignKeyProductSrc = tableProductSrc.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("productId") !== -1
    );
    await queryRunner.dropForeignKey("user_address", foreignKeyUserAddress);
    await queryRunner.dropForeignKey("product_src", foreignKeyProductSrc);
    await queryRunner.dropTable("user");
    await queryRunner.dropTable("user_address");
    await queryRunner.dropTable("product");
    await queryRunner.dropTable("product_src");
    await queryRunner.dropTable("manufacturer");
  }
}
