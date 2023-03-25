const data = {
  products: require('../models/products.json'),
  setProducts: function (data) { this.products = data }
};
const { v4: uuid } = require('uuid');
const fsPromises = require('fs').promises;
const path = require('path');

const handleGetProducts = (req, res) => {
  const products = data.products;

  if (products.length > 0) {
    res.json([...products]);
  } else {
    res.sendStatus(204);
  }
};

const handleNewProduct = async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || !price) return res.status(400).json('Name, description and price are required');

  const newProduct = {
    "uuid": uuid(),
    "name": name,
    "description": description,
    "price": parseFloat(price)
  };

  try {
    data.setProducts([...data.products, newProduct]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'products.json'),
      JSON.stringify(data.products)
    );

    res.status(201).json({ ...newProduct });
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

const handleGetProduct = (req, res) => {
  const { id } = req.params;
  const product = data.products.find(product => product.uuid === id);
  if (!product) return res.sendStatus(404);

  return res.json({ ...product });
};

const handleUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  if (!name || !description || !price) return res.status(400).json('Name, description and price are required');

  const product = data.products.find(product => product.uuid === id);
  if (!product) return res.sendStatus(404);

  const updatedProduct = {
    "uuid": product.uuid,
    "name": name,
    "description": description,
    "price": parseFloat(price)
  };

  try {
    const otherProducts = data.products.filter(product => product.uuid !== updatedProduct.uuid);
    data.setProducts([...otherProducts, updatedProduct]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'products.json'),
      JSON.stringify(data.products)
    );

    res.json({ ...updatedProduct });
  } catch (error) {
    return res.status(500).json({ 'message': error.message });
  }
};

const handleDeleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = data.products.find(product => product.uuid === id);
  if (!product) return res.sendStatus(404);

  try {
    const otherProducts = data.products.filter(product => product.uuid !== product.uuid)
    data.setProducts([...otherProducts]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'products.json'),
      JSON.stringify(otherProducts)
    );

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ 'message': error.message });
  }
};

module.exports = { handleGetProducts, handleNewProduct, handleGetProduct, handleGetProduct, handleUpdateProduct, handleDeleteProduct };