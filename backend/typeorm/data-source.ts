import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config({
  path: process.env.ENV === "test" ? ".env.test" : ".env",
});

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  schema: process.env.POSTGRES_SCHEMA,
  migrations: [`${__dirname}/migrations/**/*.ts`],
});

export default dataSource;
