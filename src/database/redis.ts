import * as redis from 'redis';
import { config } from '../helpers/config.helper';

export class Redis {
  private readonly urlConection: string = config.redis.url;
  private readonly nameKey: string = config.redis.nameKey;
  redisClient: any = redis.createClient({
    url: this.urlConection,
  });

  constructor(private from?: string, private answer?: string, private status?: string) {}

  async Caching(): Promise<void> {
    try {
      await this.redisClient.connect().catch((err) => {
        console.error(`Something happen trying to connect to redis (Caching) - Error:${err}`);
      });
      await this.redisClient.set(
        `${this.nameKey}:${this.from}`,
        JSON.stringify({ to: this.from, answer: this.answer, status: this.status })
      );
      await this.redisClient.disconnect();
    } catch (err) {
      console.error(`Something happen trying to caching on redis (Caching) - Error:${err}`);
    }
  }
  async GetKey() {
    try {
      await this.redisClient.connect().catch((err) => {
        console.error(`Something happen trying to connect to redis (Caching) - Error:${err}`);
      });
      const res = await this.redisClient.get(`${this.nameKey}:${this.from}`);
      await this.redisClient.disconnect();
      return res;
    } catch (err) {
      console.error(`Something happen trying to caching on redis (Caching) - Error:${err}`);
    }
  }
  async ProveConexionRedis() {
    return await this.redisClient
      .connect()
      .then(() => {
        console.log(`Redis conexion has been initialized!`);
      })
      .catch((err) => {
        console.error(`Something happen trying to connect to redis - Error:${err}`);
      });
  }
  async CloseConexionRedis() {
    return await this.redisClient
      .disconnect()
      .then(() => {
        console.log(`Redis conexion has been disconnected!`);
      })
      .catch((err) => {
        console.error(`Something happen trying to disconnect to redis - Error:${err}`);
      });
  }
}
