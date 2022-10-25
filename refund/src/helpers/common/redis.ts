import redis from "redis";
import { promisify } from "util";
import { config } from "../../config/config";

class RedisServer {
  public client: redis.RedisClient;

  constructor() {
    this.initiateConnection();
  }

  public async initiateConnection(): Promise<void> {
    this.client = redis.createClient(parseInt(config.REDIS_PORT as string), config.REDIS_HOST);
    this.client.on("connect", () => {
      console.log("Connected to redis client successfully");
    });
  }

  public setRedisSting = async (key: string, value: number | string, mode: string, duration: number) => {
    this.client.set(key, value.toString(), mode, duration);
  };
  public deleteRedisSting = async (key: string) => {
    this.client.del(key);
  };

  public getRedisSting = async (key: string) => {
    const getAsync = promisify(this.client.get).bind(this.client);
    const value = await getAsync(key);
    if (value) return value;
    return null;
  };
}

const redisClient = new RedisServer();
export default redisClient;
