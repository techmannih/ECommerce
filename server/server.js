const express = require('express');
const app = express();
const cors =require("cors")
const connectDB=require("./db/conn")
const userRoutes=require("./routes/userRoutes")
require('dotenv').config();

const port = process.env.PORT || 8880;

connectDB();

app.get('/', function (req, res) {
  res.send('Hello');
});

app.use(express.json());
app.use(cors());
app.use(userRoutes);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
