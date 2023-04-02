const Product = require('../../models/Product');

const handleGetProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    if (!products) return res.sendStatus(204);

    res.json(products);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

const handleGetProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate('category');
    if (!product) return res.sendStatus(404);

    return res.json(product);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

const handleNewProduct = async (req, res) => {
  const { name, description, price, category, barCode } = req.body;
  if (!name || !description || !price || !category || !barCode) return res.sendStatus(400);

  try {
    const result = Product.create({
      "name": name,
      "description": description,
      "price": parseFloat(price),
      "category": category,
      "barCode": barCode
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

const handleUpdateProduct = async (req, res) => {
  if (!req?.body) return res.sendStatus(400);

  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.sendStatus(404);

    if (req.body?.name) product.name = req.body.name;
    if (req.body?.description) product.description = req.body.description;
    if (req.body?.price) product.price = parseFloat(req.body.price);
    if (req.body?.category) product.category = req.body.category;
    if (req.body?.barCode) product.barCode = req.body.barCode;

    const result = await product.save();

    res.json(result);
  } catch (error) {
    res.status(500).json({ 'message': err.message });
  }
};

const handleDeleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.sendStatus(404);

    const result = await product.deleteOne();

    res.json(result);
  } catch (error) {
    res.status(500).json({ 'message': err.message });
  }
};

module.exports = {
  handleGetProducts,
  handleNewProduct,
  handleGetProduct,
  handleGetProduct,
  handleUpdateProduct,
  handleDeleteProduct
};