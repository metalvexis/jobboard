import amqplib from "amqplib";
import { Buffer } from "buffer";

export const publishToQueue = async (queue: string, data: string) => {
  if (!process.env.RABBITMQ_URL) {
    throw new Error("RABBITMQ_URL not found in env");
  }

  const conn = await amqplib.connect(process.env.RABBITMQ_URL, {
    clientProperties: { connection_name: "JobBoardWebServer" },
  });

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue, {
    durable: true,
  });

  ch1.sendToQueue(queue, Buffer.from(data), {
    persistent: true,
  });

  console.log("published to queue", queue, data);

  setTimeout(() => {
    conn.close();
  });
};
