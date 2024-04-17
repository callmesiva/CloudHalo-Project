const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const db = require("./dbConfig");
const helmet = require("helmet");
const socketIo = require("socket.io");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:1234",
  })
);
const server = http.createServer(app);
const io = socketIo(server);

// Health check API
app.get("/app/status", async (req, res) => {
  if (db.readyState === 1) {
    res
      .status(200)
      .json({ serverStatus: "OK", database: "Connection successful" });
  } else {
    res.status(500).json({ serverStatus: "Error", error: "Connection error" });
  }
});

const loginInfo = require("./SRC/route/loginRoute");
const taskInfo = require("./SRC/route/taskCrudRoute");

app.use("/", loginInfo, taskInfo);

const PORT = process.env.PORT || 3800;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT} `);
});

setInterval(() => {
  io.emit("notification", { message: "New notification!" });
}, 30000);
