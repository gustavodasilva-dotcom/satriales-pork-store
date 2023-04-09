const errorHandler = require('../../middlewares/errorHandler');
const Product = require('../../models/product/Product');
const productSchema = require('../../validators/send-product');

const handleGetProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    if (!products.length === 0) return res.sendStatus(204);

    res.json(products);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleGetProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate('category');
    if (!product) return res.sendStatus(404);

    res.json(product);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleNewProduct = async (req, res) => {
  const body = req.body;

  try {
    const validBody = productSchema.validateSync(body, {
      abortEarly: false,
      stripUnknown: true
    });

    const productFound = await Product.findOne({ barCode: validBody.barCode });
    if (productFound) return res.status(409).json({ 'message': `There is already a product with the bar code ${validBody.barCode}` });

    const result = await Product.create({ ...validBody });
    const newProduct = await Product.findById(result._id).populate('category');

    res.status(201).json(newProduct);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleUpdateProduct = async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.sendStatus(404);

    const validBody = productSchema.validateSync(body, {
      abortEarly: false,
      stripUnknown: true
    });

    product.name = validBody.name;
    product.description = validBody.description;
    product.price = validBody.price;
    product.category = validBody.category;
    product.barCode = validBody.barCode;

    const result = await product.save();

    res.json(result);
  } catch (error) {
    errorHandler(error, res);
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
    errorHandler(error, res);
  }
};

module.exports = {
  handleGetProducts,
  handleGetProduct,
  handleNewProduct,
  handleUpdateProduct,
  handleDeleteProduct
};