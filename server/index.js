import server from "./server";
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "..", "web", "build")));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "web", "build", "index.html"));
});

server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log("Server is running");
});
