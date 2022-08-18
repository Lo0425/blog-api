const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const cors = require("cors");

//LOCAL DB
// mongoose.connect("mongodb://127.0.0.1:27017/B5B6");

// ONLINE DB
mongoose.connect(
  "mongodb+srv://KaesLo:E1e4e00397@cluster0.w6knfqa.mongodb.net/blog?retryWrites=true&w=majority"
);
app.use(cors());
app.use(express.json());

app.use("/users", require("./api/users"));
app.use("/posts", require("./api/posts"));
app.use("/likes", require("./api/likes"));
app.use("/comments", require("./api/comments"));

app.listen(PORT, () => console.log("Server is running in PORT " + PORT));
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));
