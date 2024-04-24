const amqp = require("amqplib");

// Connection URL for RabbitMQ server
const amqpUrl = "amqp://localhost";

// Function to publish a message
async function publishMessage(exchange, routingKey, message) {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();

    // Assert the exchange
    await channel.assertExchange(exchange, "direct", { durable: false });

    // Publish the message to the exchange with the specified routing key
    channel.publish(exchange, routingKey, Buffer.from(message));

    console.log(`Message sent: '${message}'`);

    // Close the connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Usage example
const exchangeName = "direct_exchange";
const routingKey = "direct_routing_key";
const message = "Hello, RabbitMQ!";

publishMessage(exchangeName, routingKey, message);
