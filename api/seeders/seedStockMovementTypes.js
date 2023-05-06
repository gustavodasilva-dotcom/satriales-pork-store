const StockMovementTypes = require('../models/stock/StockMovementTypes');

const stockMovementTypes = [{
  name: 'Entry'
}, {
  name: 'Update'
}, {
  name: 'Checkout'
}, {
  name: 'Self Buy'
}];

const exec = async () => {
  const promises = stockMovementTypes.map(async (type) => {
    const stockMovementType = await StockMovementTypes.findOne({ name: type.name });

    if (!stockMovementType) {
      return await StockMovementTypes.create({ ...type });
    } else {
      return stockMovementType.save();
    }
  });

  return Promise.all(promises);
};

module.exports = { exec };