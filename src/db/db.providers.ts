import { createConnection } from 'typeorm';
import envProvider from './../utils/env-provider';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: envProvider.DB_ENVS.DB.HOST,
      port: envProvider.DB_ENVS.DB.PORT,
      username: envProvider.DB_ENVS.DB.USER,
      password: envProvider.DB_ENVS.DB.PASS,
      database: envProvider.DB_ENVS.DB.DB,
      entities: [
          __dirname + '/entities/*.ts',
      ],
      synchronize: true,
    }),
  },
];