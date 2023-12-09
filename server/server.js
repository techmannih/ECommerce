const express = require('express');
const app = express();
const connectDB=require("./db/conn")

const port = process.env.PORT || 8880;

connectDB();

app.get('/', function (req, res) {
  res.send('Hello');
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
