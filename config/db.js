const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://premiumvibe92_db_user:khan007@ac-6xjan1n-shard-00-00.vuofmwo.mongodb.net:27017,ac-6xjan1n-shard-00-01.vuofmwo.mongodb.net:27017,ac-6xjan1n-shard-00-02.vuofmwo.mongodb.net:27017/?ssl=true&replicaSet=atlas-ffoudk-shard-0&authSource=admin"    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;