const mongoose = require("mongoose");

const connectDBs = async () => {
  try {
    const chatDB = await mongoose.createConnection(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const authDB = await mongoose.createConnection(
      process.env.DATABASE_URL_SECONDARY,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to databases");
    return { chatDB, authDB };
  } catch (error) {
    console.error(`Error connecting to databases: ${error.message}`);
    throw error; // Ensure the error is propagated
  }
};

module.exports = { connectDBs };
