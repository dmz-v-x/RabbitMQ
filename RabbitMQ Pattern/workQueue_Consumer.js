const amqp = require("amqplib");

async function consumer() {
  try {
    const connection = await amqp.connect("amqp://localhost");

    const channel = await connection.createChannel();

    const queueName = "work_queue";

    await channel.assertQueue(queueName, { durable: true });

    channel.prefetch(1); // process one message at a time

    console.log("Waiting for tasks");

    channel.consume(queueName, (message) => {
      const task = JSON.parse(message.content.toString());
      console.log(`Task received: ${JSON.stringify(task)}`);

      // Simulate the processing
      new Promise((resolve) => setTimeout(resolve, 3000));

      console.log(`Task completed: ${JSON.stringify(task)}`);

      channel.ack(message);
    });
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

consumer();
