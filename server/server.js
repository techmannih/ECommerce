const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require("./db/conn");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
require('dotenv').config();

const port = process.env.PORT || 8880;

connectDB();

app.get('/', function (req, res) {
  res.send('Hello');
});

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-chi-olive.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(userRoutes);
app.use(addressRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(paymentRoutes);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
