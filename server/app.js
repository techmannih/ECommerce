require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/conn');

const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://e-commerce-chi-olive.vercel.app',
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
