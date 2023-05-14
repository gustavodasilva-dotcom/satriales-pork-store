const Product = require('../../models/product/Product');
const ProductImage = require('../../models/images/ProductImage');
const Image = require('../../models/images/Image');
const Stock = require('../../models/stock/Stock');
const errorHandler = require('../../middlewares/errorHandler');

const handleGetProductByCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.find({ category: id }).populate('category');
    if (!products.length === 0) return res.sendStatus(204);

    const productsResponse = products.map(product => {
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
    });

    const productImages = productsResponse.map(async (product) => {
      const productsImages = await ProductImage.find({ product: product._id });

      const imagesPromises = productsImages.map(async (productImage) => {
        return await Image.findById(productImage.image);
      });

      const promisesResponse = await Promise.all(imagesPromises);

      const stock = await Stock.findOne({ product: product._id });

      return {
        ...product,
        "stock": stock?.quantity ?? 0,
        "images": [...promisesResponse]
      }
    });

    const productsWithImages = await Promise.all(productImages);

    res.json(productsWithImages);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleGetProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate('category');
    if (!product) return res.sendStatus(404);

    const productImages = await ProductImage.find({ product: product._id });

    const productImagesPromises = productImages.map(async (productImage) => {
      return await Image.findById(productImage.image);
    });

    const stock = await Stock.findOne({ product: product._id });

    Promise.all(productImagesPromises)
      .then(response => {
        res.json({
          ...product._doc,
          "stock": stock?.quantity ?? 0,
          "images": [...response]
        });
      })
      .catch(error => {
        errorHandler(error, res);
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  handleGetProductByCategory,
  handleGetProductById
};