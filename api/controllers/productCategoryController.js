const ProductCategory = require('../models/ProductCategory');

const handleGetProductsCategories = async (req, res) => {
  try {
    const productsCategories = await ProductCategory.find();
    if (!productsCategories) return res.sendStatus(204);

    res.json(productsCategories);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

const handleGetProductCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const productsCategories = await ProductCategory.findById(id);
    if (!productsCategories) return res.sendStatus(404);

    return res.json(productsCategories);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

const handleNewProductCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.sendStatus(400);

  try {
    const result = ProductCategory.create({
      "name": name
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

const handleUpdateProductCategory = async (req, res) => {
  if (!req?.body) return res.sendStatus(400);

  const { id } = req.params;

  try {
    const productCategory = await ProductCategory.findById(id);
    if (!productCategory) return res.sendStatus(404);

    if (req.body?.name) productCategory.name = req.body.name;

    const result = await productCategory.save();

    res.json(result);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

const handleDeleteProductCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const productCategory = await ProductCategory.findById(id);
    if (!productCategory) return res.sendStatus(404);

    const result = await productCategory.deleteOne();

    res.json(result);
  } catch (error) {
    res.status(500).json({ 'message': err.message });
  }
};

module.exports = {
  handleGetProductsCategories,
  handleGetProductCategory,
  handleNewProductCategory,
  handleUpdateProductCategory,
  handleDeleteProductCategory
};