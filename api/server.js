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
const seedPaymentTypes = require('./seeders/seedPaymentTypes');
const seedStockMovementTypes = require('./seeders/seedStockMovementTypes');
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

const API_PREFIX = '/api'
const V1_PREFIX = '/v1';
const V2_PREFIX = '/v2';

app.use(`${API_PREFIX}${V1_PREFIX}/register`, require('./routes/v1/register'));
app.use(`${API_PREFIX}${V1_PREFIX}/auth`, require('./routes/v1/auth'));
app.use(`${API_PREFIX}${V1_PREFIX}/refresh`, require('./routes/v1/refresh'));
app.use(`${API_PREFIX}${V1_PREFIX}/logout`, require('./routes/v1/logout'));
app.use(`${API_PREFIX}${V1_PREFIX}/addresses`, require('./routes/v1/address'));
app.use(`${API_PREFIX}${V1_PREFIX}/products`, require('./routes/v1/products'));
app.use(`${API_PREFIX}${V1_PREFIX}/products-categories`, require('./routes/v1/productsCategories'));

app.use(`${API_PREFIX}${V2_PREFIX}/personal-infos`, require('./routes/v2/personalInfo'));
app.use(verifyJwt);
app.use(`${API_PREFIX}${V2_PREFIX}/products`, require('./routes/v2/products'));
app.use(`${API_PREFIX}${V2_PREFIX}/products-categories`, require('./routes/v2/productsCategories'));
app.use(`${API_PREFIX}${V2_PREFIX}/stocks`, require('./routes/v2/stock'));
app.use(`${API_PREFIX}${V2_PREFIX}/persons`, require('./routes/v2/person'));
app.use(`${API_PREFIX}${V2_PREFIX}/payments`, require('./routes/v2/payment'));
app.use(`${API_PREFIX}${V2_PREFIX}/checkouts`, require('./routes/v2/checkout'));
app.use(`${API_PREFIX}${V2_PREFIX}/images`, require('./routes/v2/images'));

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');

  await seedPaymentTypes.exec();
  await seedStockMovementTypes.exec();
  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});