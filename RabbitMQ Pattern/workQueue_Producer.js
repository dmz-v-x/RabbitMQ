const amqp = require("amqplib");

async function producer(task) {
  try {
    const connection = await amqp.connect("amqp://localhost");

    const channel = await connection.createChannel();

    const queueName = "work_queue";

    channel.assertQueue(queueName, { durable: true });

    const message = JSON.stringify(task);

    channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });

    console.log(`Task sent: ${message}`);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {}
}

producer({ taskName: "Task 1", payload: { data: "some data" } });
