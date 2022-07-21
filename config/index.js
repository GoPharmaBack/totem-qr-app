const config = {
  DEV: process.env.NODE_ENV !== 'production',
  PORT: process.env.PORT || 3000,
  SECRET: process.env.AUTH_JWT_SECRET || 'secret',
  CLIENT_URL: process.env.URL || 'http://localhost:3000',
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

module.exports = { config };
