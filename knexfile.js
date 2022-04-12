// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'client_app',
      user:     'postgres',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host:'ec2-44-194-4-127.compute-1.amazonaws.com',
      database: 'db0omom3vru8qh',
      user:     'ojdpsaujhhivvb',
      password: '9c393c4272023cb196148af91744ad696e16091916f5b5a6f2aed0ab58d6a45e',
      ssl:{ rejectUnauthorized:true }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
