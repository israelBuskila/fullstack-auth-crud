import { drizzle } from 'drizzle-orm/mysql2';
import { config } from '../../config';

const db = drizzle(config.databaseUrl);

export default db
