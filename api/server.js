const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api/v1/register', require('./routes/register'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));