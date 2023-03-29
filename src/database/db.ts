import { Sequelize, Dialect } from 'sequelize';
import { config } from '../helpers/config.helper';

export class DataBase {
  private host: string = `${config.db.host}`;
  private dialect: Dialect = 'mariadb';
  private username: string = `${config.db.username}`;
  private password: string = `${config.db.password}`;
  private database: string = `${config.db.database}`;
  private logging: boolean = false;

  constructor() {}

  Source(): Sequelize {
    return new Sequelize({
      dialect: this.dialect,
      host: this.host,
      username: this.username,
      password: this.password,
      database: this.database,
      logging: this.logging,
    });
  }

  async ProveConexionDB(): Promise<void> {
    try {
      await this.Source()
        .authenticate()
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
}
