require('dotenv').config({
  path: __dirname + '/../../environment/dev.env',
  debug: false
});


module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
      ssl: {
        rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'true',
      },
    },
    migrations: {
      directory: '../migrations'
    },
    seeds: {
      directory: '../seeds'
    }
  }
};
