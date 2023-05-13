const Stock = require('../../models/stock/Stock');
const StockMovement = require('../../models/stock/StockMovement');
const StockMovementTypes = require('../../models/stock/StockMovementTypes');
const stockMovementSchema = require('../../validators/stock/send-stock-movement');
const errorHandler = require('../../middlewares/errorHandler');

const handleGetStockMovementTypes = async (req, res) => {
  try {
    const stockMovementTypes = await StockMovementTypes.find();
    
    if (stockMovementTypes.length === 0) return res.sendStatus(204);

    res.json(stockMovementTypes);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleGetStockMovements = async (req, res) => {
  const { productId } = req.params;

  try {
    const stockMovements = await StockMovement
      .find({ product: productId })
      .populate('stock product stockMovementType');

    if (stockMovements.length === 0) return res.sendStatus(204);

    res.json(stockMovements);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleStockMovement = async (req, res) => {
  const body = req.body;

  try {
    const validBody = await stockMovementSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    });

    let productStock = await Stock.findOne({ product: validBody.product });

    if (!productStock) {
      const { stockMovementType, ...rest } = validBody;
      productStock = await Stock.create(rest);
    }

    productStock.quantity = validBody.quantity;
    await productStock.save();

    const result = await StockMovement.create({
      stock: productStock._id,
      product: validBody.product,
      stockMovementType: validBody.stockMovementType
    });

    res.status(201).json(result);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  handleGetStockMovementTypes,
  handleGetStockMovements,
  handleStockMovement
};