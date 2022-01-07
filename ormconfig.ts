import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import { ServiceEntity } from './src/entities/Service';
import { CommentEntity } from './src/entities/Comment';
import { QuestionEntity } from './src/entities/Question';
import { userEntity } from './src/entities/Users';
import { tokenEntity } from './src/entities/Tokens';
import { ruleEntity } from './src/entities/Rule';

dotenv.config();

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DATABASE || 'pinkTeam',
  ssl: { rejectUnauthorized: false },
  entities: [ServiceEntity, CommentEntity, QuestionEntity, userEntity, tokenEntity, ruleEntity],
  logging: 'all',
  synchronize: true,
  // migrationsRun: true,
  // migrations:[
  //   path.join(__dirname, "src/db/migrations/**/*.ts")
  // ],
  // cli:{
  //   migrationsDir:path.join(__dirname, "src/db/migrations"),
  //   entitiesDir:path.join(__dirname, "src/entities")
  // }
};
export default config;
