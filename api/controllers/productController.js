const data = {
  products: require('../models/products.json'),
  setProducts: function (data) { this.products = data }
};
const { v4: uuid } = require('uuid');
const fsPromises = require('fs').promises;
const path = require('path');

const handleNewProduct = async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || !price) return res.status(400).json('Name, description and price are required');
  try {
    const newProduct = {
      "uuid": uuid(),
      "name": name,
      "description": description,
      "price": parseFloat(price)
    };
    data.setProducts([...data.products, newProduct]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'products.json'),
      JSON.stringify(data.products)
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

module.exports = { handleNewProduct };