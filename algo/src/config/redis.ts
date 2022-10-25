import redis from "redis";
// import { configuration } from ".";


class RedisServer {
  public client: redis.RedisClient;

  constructor() {
    this.initiateConnection();
  }

  public async initiateConnection(): Promise<void> {
    this.client = redis.createClient(parseInt(process.env.REDIS_PORT as string), process.env.REDIS_HOST);
    this.client.on("connect", () => {
      console.log("Connected to redis client successfully");
    });
  }
}

const redisClient = new RedisServer().client;
export default redisClient;
