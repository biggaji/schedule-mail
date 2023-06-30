const setUpRabbitMQConnection = require("./rabbitMQConnection");

async function sendToQueue(msg) {
  const { connection, channel } = await setUpRabbitMQConnection();
  try {
    
    const msg_queue = "test";
    // creates the queue if not already exist
    channel.assertQueue(msg_queue, {
      durable: false
    });

    channel.sendToQueue(msg_queue, Buffer.from(msg, "utf-8"));
    console.log(" [x] Sent %s", msg)

  } catch (error) {
    console.error(`An error occured while sending message to queue: `, error);
  } finally {
    setTimeout(async function () {
      // always close both the channel and connection
      // await channel.close();
      await connection.close();
    }, 1000);
  }
};

sendToQueue("how're ya?");
sendToQueue(JSON.stringify({ user: "john" }));