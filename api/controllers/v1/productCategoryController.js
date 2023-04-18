const ProductCategory = require('../../models/product/ProductCategory');

const handleGetProductsCategories = async (req, res) => {
  try {
    const productsCategories = await ProductCategory.find();
    if (!productsCategories) return res.sendStatus(204);

    const response = productsCategories.map(category => {
      return {
        "_id": category._id,
        "name": category.name
      };
    })

    res.json(response);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

module.exports = { handleGetProductsCategories };