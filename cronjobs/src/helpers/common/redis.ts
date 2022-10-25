import redis from "redis";
import { promisify } from "util";
import { config } from "../../config";

class RedisServer {
  public client_read: redis.RedisClient;
  public client_write: redis.RedisClient;

  constructor() {
    this.initiateConnection();
  }

  public async initiateConnection(): Promise<void> {
    
    this.client_write = redis.createClient(parseInt(config.REDIS_PORT || "6379"), config.REDIS_HOST);
    this.client_write.on("connect", () => {
      console.log("Connected to redis client successfully");
    });
  }

  public setRedisSting = async (key: string, value: number | string) => {
    this.client_write.set(key, value.toString());
  };

  public getRedisSting = async (key: string,) => {
    const getAsync = promisify(this.client_read.get).bind(this.client_read);
    const value = await getAsync(key);
    if (value) return parseInt(value);
    return null;
  };
}

const redisClient = new RedisServer();
export default redisClient;
