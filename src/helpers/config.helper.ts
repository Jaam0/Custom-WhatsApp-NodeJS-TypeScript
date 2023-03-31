export const config = {
  db: {
    type: process.env.TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    url: process.env.REDIS_URL || 'redis://localhost:6379/0',
    nameKey: process.env.REDIS_NAME_KEY || 'CONTACT',
  },
};
