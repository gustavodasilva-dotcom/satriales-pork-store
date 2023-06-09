const errorHandler = require('../../middlewares/errorHandler');
const Product = require('../../models/product/Product');
const Images = require('../../models/images/Image');
const ProductImage = require('../../models/images/ProductImage');
const productSchema = require('../../validators/send-product');
const Stock = require('../../models/stock/Stock');

const handleGetProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    if (!products.length === 0) return res.sendStatus(204);

    const productsStock = products.map(async (product) => {
      const stockProduct = await Stock.findOne({ product: product._id });
      return {
        ...product._doc,
        stock: stockProduct?.quantity ?? 0
      };
    });

    const promisesResult = await Promise.all(productsStock);
    res.json(promisesResult);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleGetProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate('category');
    if (!product) return res.sendStatus(404);

    const stockProduct = await Stock.findOne({ product: product._id });

    const productImages = await ProductImage.find({ product: product._id });

    const productImagesPromises = productImages.map(async (productImage) => {
      return await Images.findById(productImage.image);
    });

    Promise.all(productImagesPromises)
      .then(response => {
        res.status(201).json({
          ...product._doc,
          stock: stockProduct?.quantity ?? 0,
          images: [...response]
        });
      })
      .catch(error => {
        errorHandler(error, res);
      });
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

    const result = await Product.create({
      name: validBody.name,
      description: validBody.description,
      price: validBody.price,
      category: validBody.category,
      barCode: validBody.barCode
    });
    const newProduct = await Product.findById(result._id).populate('category');

    await Stock.create({
      product: newProduct._id,
      quantity: 0
    });

    const imagesPromises = validBody.images.uploads.map(async (image) => {
      return await ProductImage.create({
        product: newProduct._id,
        image: image.id
      });
    });

    await Promise.all(imagesPromises);

    res.json(result);
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

    const imagesUploadsPromises = validBody.images.uploads.map(async (image) => {
      const imageFound = await ProductImage.findOne({ image: image.id });

      if (!imageFound) {
        return await ProductImage.create({
          product: product._id,
          image: image.id
        });
      }
    });

    const imagesDeletesPromises = validBody.images.deletes?.map(async (image) => {
      return await ProductImage.deleteOne({ image: image });
    });

    await Promise.all(imagesUploadsPromises);
    await Promise.all(imagesDeletesPromises);

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