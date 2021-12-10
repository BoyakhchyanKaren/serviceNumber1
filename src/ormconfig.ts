import * as path from 'path';
import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import { ServiceEntity } from './entities/Service';
import { CommentEntity } from './entities/Comment';
import { QuestionEntity } from './entities/Question';

dotenv.config();

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DATABASE || 'pinkTeam',
  ssl: { rejectUnauthorized: false },
  entities: [ServiceEntity, CommentEntity, QuestionEntity],
  logging: 'all',
  synchronize: true,
};
export default config;
