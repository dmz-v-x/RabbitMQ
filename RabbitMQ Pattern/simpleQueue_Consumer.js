const amqpb = require("amqplib");

async function consume() {
  try {
    const connection = await amqpb.connect("amqp://localhost");

    const channel = await connection.createChannel();

    const queueName = "simple_queue";

    await channel.assertQueue(queueName);

    // Consuming message from the queue

    await channel.consume(queueName, (message) => {
      console.log("Received Message: ", message.content.toString());
      // Acknowledge the message
      channel.ack(message);
    });
    console.log("Consumer started");
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

consume();
