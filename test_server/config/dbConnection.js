const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      `MongoDb connected: ${conn.connection.name} , ${conn.connection.host} `
    );
  } catch (error) {
    console.log(`Error :${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDb;
