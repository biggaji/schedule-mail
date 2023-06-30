const { config } = require("dotenv");
if (process.env.NODE_ENV !== "production") {
	config();
}
const amqp = require("amqplib");

async function setUpRabbitMQConnection() {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    console.error(`An error occured while setting up rabbitmq connection: `, error);
  }
};

module.exports = setUpRabbitMQConnection;