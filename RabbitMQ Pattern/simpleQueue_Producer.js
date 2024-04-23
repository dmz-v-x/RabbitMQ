const amqpb = require("amqplib");

async function produce() {
  try {
    // 1. Setup a connection to RabbitMQ server
    const connection = await amqpb.connect("amqp://localhost");
    // the vaiable connection holds the connection object that is returned when we successfully connect to RabbitMQ

    // 2. Create a channel through which Node.js can intereact with RabbitMQ
    const channel = await connection.createChannel();

    // 3. Declare a queue that will be used in RabbitMQ
    const queueName = "simple_queue";

    // 4. Now we will assert the queue that we declared above this will create the queue in RabbitMQ if it doesn't exist already
    await channel.assertQueue(queueName);

    // 5. Sending Message to the Queue the method takes two parameters queueName and the message.
    await channel.sendToQueue(queueName, Buffer.from("Hello World!"));

    // 6. Closing the channel and the connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

produce();
