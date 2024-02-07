import amqplib from "amqplib";
import { zWorkzag } from "./zods";

export const validateWorkzag = (data: unknown) => {
  return zWorkzag.safeParse(data);
};

export const snakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const camelCase = (str: string) => {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const toSnakeCase = (json: Record<string, unknown>) => {
  const snakeCased: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(json)) {
    snakeCased[snakeCase(key)] = value;
  }
  return snakeCased;
};

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
