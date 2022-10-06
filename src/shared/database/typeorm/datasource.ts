import { DataSource } from 'typeorm';

export const datasource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'isaiasiotti',
  password: 'isaias963',
  database: 'postgres',
  logging: true,
  entities: [__dirname + '/../../../modules/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  extra: {
    charset: 'uft8mb4_unicode_ci',
  },
});
