const PaymentTypes = require('../../models/payment/PaymentTypes');

const handleGetTypes = async (req, res) => {
  try {
    const paymentTypes = await PaymentTypes.find();
    if (!paymentTypes.length === 0) return res.sendStatus(204);

    res.json(paymentTypes);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { handleGetTypes };