const yup = require('yup');
const sendStockSchema = require('./send-stock');
const StockMovementTypes = require('../../models/stock/StockMovementTypes');

const stockMovementSchema = yup.object({
  ...sendStockSchema.fields,
  stockMovementType: yup
  .string()
  .required()
  .test(async (value, ctx) => {
    const foundType = await StockMovementTypes.findById(value);

    if (!foundType) {
      return ctx.createError({
        message: 'Invalid stock movement type'
      });
    }

    return true;
  })
});

module.exports = stockMovementSchema;