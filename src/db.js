const mongoose = require("mongoose");

const connectDBs = () => {
  try {
    const chatDB = mongoose.createConnection(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const authDB = mongoose.createConnection(
      process.env.DATABASE_URL_SECONDARY,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    return { chatDB, authDB };
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDBs };
