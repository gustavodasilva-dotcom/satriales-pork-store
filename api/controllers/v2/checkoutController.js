const errorHandler = require('../../middlewares/errorHandler');
const Checkout = require('../../models/checkout/Checkout');
const ProductCheckout = require('../../models/checkout/ProductCheckout');
const Stock = require('../../models/stock/Stock');
const StockMovement = require('../../models/stock/StockMovement');
const StockMovementTypes = require('../../models/stock/StockMovementTypes');
const saveClientSchema = require('../../validators/checkout/save-client');
const saveProductsSchema = require('../../validators/checkout/save-products');
const savePaymentSchema = require('../../validators/checkout/save-payment');

const handleGetCheckout = async (req, res) => {
  const { id } = req.params;

  try {
    const checkout = await Checkout.findById(id).populate('client');
    if (!checkout) return res.sendStatus(404);

    const products = await ProductCheckout.find({ checkout: id }).populate('product');

    return res.json({
      ...checkout._doc,
      products: [...products]
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

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
    const movementType = await StockMovementTypes.findOne({ name: 'Checkout' });

    const validBody = await saveProductsSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    });

    const checkout = await Checkout.findById(validBody.checkout);
    checkout.totalPrice = validBody.totalPrice;

    const promises = validBody.products.map(async (productCheckout) => {
      const stock = await Stock.findOne({ product: productCheckout.product });
      const newQuantity = Math.abs(stock.quantity - productCheckout.quantity);

      await StockMovement.create({
        stock: stock._id,
        product: productCheckout.product,
        stockMovementType: movementType._id,
        previousQuantity: stock.quantity,
        currentQuantity: newQuantity
      });

      stock.quantity = newQuantity;
      await stock.save();

      return await ProductCheckout.create({
        checkout: validBody.checkout,
        product: productCheckout.product,
        quantity: productCheckout.quantity
      });
    });

    const checkoutResult = await checkout.save();

    Promise.all(promises)
      .then(response => {
        const data = response;
        res.status(201).json({
          ...checkoutResult._doc,
          products: [...data]
        });
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

const handleSavePayment = async (req, res) => {
  const body = req.body;

  try {
    const validBody = await savePaymentSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    });

    const checkout = await Checkout.findById(validBody.checkout);
    checkout.paymentType = validBody.paymentType;

    const result = await checkout.save();

    const checkoutUpdated = await Checkout.findById(result._id).populate('client paymentType');

    res.json(checkoutUpdated);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  handleGetCheckout,
  handleSaveClient,
  handleSaveProducts,
  handleSavePayment
};