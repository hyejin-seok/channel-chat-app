const mongoose = require("mongoose");

const connectDBs = () => {
  try {
    const chatDB = mongoose.createConnection(process.env.DATABASE_URL);
    const authDB = mongoose.createConnection(
      process.env.DATABASE_URL_SECONDARY
    );
    return { chatDB, authDB };
  } catch (error) {
    console.error(`Error connecting to databases: ${error.message}`);
    throw error; // Alternatively, re-throw the error to handle it elsewhere
  }
};

module.exports = { connectDBs };
