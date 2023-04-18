const errorHandler = require('../../middlewares/errorHandler');
const Product = require('../../models/product/Product');

const handleGetProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    if (!products.length === 0) return res.sendStatus(204);

    const response = products.map(product => {
      return {
        "_id": product._id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "category": {
          "_id": product.category._id,
          "name": product.category.name
        }
      };
    })

    res.json(response);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleGetProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate('category');
    if (!product) return res.sendStatus(404);

    const response = {
      "_id": product._id,
      "name": product.name,
      "description": product.description,
      "price": product.price,
      "category": {
        "_id": product.category._id,
        "name": product.category.name
      }
    };

    res.json(response);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  handleGetProducts,
  handleGetProduct
};