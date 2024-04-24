const amqp = require("amqplib");

// Connection URL for RabbitMQ server
const amqpUrl = "amqp://localhost";

// Function to consume messages
async function consumeMessages(exchange, queueName, bindingKey) {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();

    // Assert the exchange
    await channel.assertExchange(exchange, "direct", { durable: false });

    // Assert the queue
    await channel.assertQueue(queueName);

    // Bind the queue to the exchange with the specified routing key
    await channel.bindQueue(queueName, exchange, bindingKey);

    // Consume messages from the queue
    console.log(`Waiting for messages in ${queueName}. To exit press CTRL+C`);
    channel.consume(queueName, (message) => {
      if (message !== null) {
        console.log(`Received message: ${message.content.toString()}`);
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Usage example
const exchangeName = "direct_exchange";
const queueName = "direct_queue";
const bindingKey = "direct_routing_key";

consumeMessages(exchangeName, queueName, bindingKey);
