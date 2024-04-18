import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv";
import { registerAs } from "@nestjs/config";

dotenvConfig({ path: ".env.development" });
const TypeOrmConfig = {
  database: "postgres",
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ["dist/entities/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  autoLoadEntities: true,
  synchronize: false,
  logging: true,
};

export default registerAs("typeorm", () => TypeOrmConfig);

export const conectionSource = new DataSource(
  TypeOrmConfig as DataSourceOptions
);
