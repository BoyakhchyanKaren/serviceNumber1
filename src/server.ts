import 'reflect-metadata';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import config from '../ormconfig';
import { getApplication } from './app';

dotenv.config();
const app = getApplication();

(async () => {
  try {
    await createConnection(config);
  } catch (e) {
    console.error('💥 ERROR: Database connection failed!!', e);
    process.exit(1);
  }
  console.log('DB connected...');
  const { PORT } = process.env;
  app.listen(PORT, () => {
    console.log(`Starting listen server on port ${PORT}...`);
  });
})();
