import * as amqp from "amqplib/callback_api";
import { LogsConstants } from "../../constants/logs.constants";
import { RabbitMQQueues } from "../../constants/rabbitMqQueues.constants"
// import { RABBIT_MQ } from "../../config/stage";
import { ErrorMessages } from "../../constants";

class RabbitMq {
  public channel: amqp.Channel;

  constructor() {
    console.log("Starting RabbitMQ Server");
    this.startServer();
  }

  public startServer = async () => {
    try {
      await this.connect();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  public connect = async () => {
    amqp.connect(process.env.RABBIT_MQ || "", (err, conn) => {
      if (err) console.log(LogsConstants.RABBIT_MQ_CONNECTION_FAILED, err);
      console.log(LogsConstants.RABBIT_MQ_CONNECTED);

      conn.createChannel((err, ch) => {
        if (err) console.log(LogsConstants.RABBIT_MQ_CHANNEL_FAILED, err);
        this.channel = ch;

        console.log(LogsConstants.RABBIT_MQ_CHANNEL_CREATED);
      });
    });
  };

  public assertQueue = async (queueName: RabbitMQQueues) => {
    this.channel.assertQueue(queueName, { durable: false }, (err, res) => {
      if (err) console.log(`${LogsConstants.ASSERT_QUEUE_FAILED} ${queueName}`);
    });
  };

  public sendToQueue = async (queueName: RabbitMQQueues, msg: Buffer) => {
    this.channel.sendToQueue(queueName, msg);
  };

  public consumeQueue = async (
    queueName: RabbitMQQueues,
    cb: (data: any) => Promise<void>
  ) => {
    console.log("CONSUME QUEUE WORKING HERE");
    this.channel.prefetch(1);
    this.channel.consume(queueName, async (msg) => {
      if (!msg) return;
      const data: any = JSON.parse(msg.content.toString());
      await cb(data);
      this.channel.ack(msg);
    });
  };
}

export default new RabbitMq();
