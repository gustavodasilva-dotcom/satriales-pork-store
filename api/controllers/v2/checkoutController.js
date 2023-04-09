const errorHandler = require('../../middlewares/errorHandler');
const Checkout = require('../../models/checkout/Checkout');
const ProductCheckout = require('../../models/checkout/ProductCheckout');
const saveClientSchema = require('../../validators/checkout/save-client');
const saveProductsSchema = require('../../validators/checkout/save-products');

const handleSaveClient = async (req, res) => {
  const body = req.body;

  try {
    const validBody = await saveClientSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    });

    const result = await Checkout.create({ ...validBody });
    const newCheckout = await Checkout.findById(result._id).populate('client');

    res.status(201).json(newCheckout);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleSaveProducts = async (req, res) => {
  const body = req.body;

  try {
    const validBody = await saveProductsSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    });

    const promises = validBody.products.map(async (productCheckout) => {
      return await ProductCheckout.create({
        checkout: validBody.checkout,
        product: productCheckout.product,
        quantity: productCheckout.quantity
      });
    });

    Promise.all(promises)
      .then(response => {
        const data = response;
        res.status(200).json(data);
      })
      .catch(error => {
        res.status(500).json({
          'message': error.message
        });
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  handleSaveClient,
  handleSaveProducts
};