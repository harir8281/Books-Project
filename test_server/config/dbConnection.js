const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      `MongoDb connected: ${connect.connection.name} , ${connect.connection.host} `
    );
  } catch (error) {
    console.log(`Error :${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDb;
