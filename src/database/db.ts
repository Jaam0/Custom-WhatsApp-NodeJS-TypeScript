import { Sequelize } from 'sequelize';
import { config } from '../helpers/config.helper';

const Source = new Sequelize({
  dialect: 'mariadb',
  host: config.db.host,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  logging: false,
});

async function ProveConexionDB() {
  try {
    await Source.authenticate()
      .then(() => {
        console.log('Database conexion has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Database conexion initialization', err);
      });
  } catch (error) {
    console.error('Something wrong hapen trying to conect to the database!!!');
  }
}

export { ProveConexionDB, Source };
