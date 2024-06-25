const mongoose = require("mongoose");

const connectDBs = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true, // SSL is enabled by default with +srv, but adding explicitly for clarity
    });

    await mongoose.connect(process.env.DATABASE_URL_SECONDARY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true, // SSL is enabled by default with +srv, but adding explicitly for clarity
    });

    console.log("Connected to databases");
  } catch (error) {
    console.error(`Error connecting to databases: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDBs;
