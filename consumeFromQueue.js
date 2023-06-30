const setUpRabbitMQConnection = require("./rabbitMQConnection");

// The consumer will always be "on" so as to listen and consume messages from queues.
async function consumeFromQueue() {
  const { connection, channel } = await setUpRabbitMQConnection();
  try {
    
    const msg_queue = "test";
    // to make sure the queue exits before listening for messages
    channel.assertQueue(msg_queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", msg_queue);
    channel.consume(msg_queue, function(payload) {
      // this is where the business logic will be written
      console.log(`Received: ${payload.content}`);
    }, { noAck: true });

  } catch (error) {
    console.error(`An error occured while consuming message to queue: `, error);
  }
};

consumeFromQueue();