import server from "./server";
const express = require("express");

const app = express();

server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log("Server is running");
});
