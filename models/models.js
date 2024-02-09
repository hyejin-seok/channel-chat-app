// const { default: mongoose } = require("mongoose");
// const { connectDBs } = require("../src/db");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const messageSchema = new mongoose.Schema({
//   user: String,
//   text: String,
//   // timestamp: { type: Date, default: Date.now },
// });

// const { authDB, chat } = connectDBs();

// module.exports = {
//   userSchema: userDB.model("user", userSchema),
//   Qrcode: qrCodeDb.model("Qrcode", qrSchema),
// };
