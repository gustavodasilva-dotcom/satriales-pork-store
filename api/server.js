const express = require('express');
const app = express();
const cors = require('cors');
const verifyJwt = require('./middlewares/verifyJwt');
const cookieParser = require('cookie-parser');
const credentials = require('./middlewares/credentials');
const corsOptions = require('./config/configOptions');
const PORT = process.env.PORT || 3500;

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('/api/v1/register', require('./routes/v1/register'));
app.use('/api/v1/auth', require('./routes/v1/auth'));
app.use('/api/v1/refresh', require('./routes/v1/refresh'));
app.use('/api/v1/logout', require('./routes/v1/logout'));

app.use(verifyJwt);
app.use('/api/v2/products', require('./routes/v2/products'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));