require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const verifyJwt = require('./middlewares/verifyJwt');
const cookieParser = require('cookie-parser');
const credentials = require('./middlewares/credentials');
const corsOptions = require('./config/configOptions');
const mongoose = require('mongoose');
const connectDb = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

connectDb();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/api/v1/register', require('./routes/v1/register'));
app.use('/api/v1/auth', require('./routes/v1/auth'));
app.use('/api/v1/refresh', require('./routes/v1/refresh'));
app.use('/api/v1/logout', require('./routes/v1/logout'));
app.use('/api/v1/address', require('./routes/v1/address'));

app.use('/api/v2/personalInfo', require('./routes/v2/personalInfo'));
app.use(verifyJwt);
app.use('/api/v2/products', require('./routes/v2/products'));
app.use('/api/v2/productsCategories', require('./routes/v2/productsCategories'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});