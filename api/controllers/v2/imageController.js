const Image = require('../../models/images/Image');
const imageSchema = require('../../validators/send-image');
const errorHandler = require('../../middlewares/errorHandler');
const formidable = require('formidable');
const fsPromises = require('fs').promises;

const handleUploadImage = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.sendStatus(500);

    const image = files;
    const params = { ...fields, image };

    try {
      const validBody = imageSchema.validateSync(params, {
        abortEarly: false,
        stripUnknown: true
      });

      const buffer = await fsPromises.readFile(validBody.image.image.filepath);

      const result = await Image.create({
        name: validBody.name,
        image: buffer,
        contentType: validBody.contentType
      });

      res.status(201).json(result);
    } catch (error) {
      errorHandler(error, res);
    }
  });
};

const handleDeleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) return res.sendStatus(404);

    const result = await image.deleteOne();

    res.json(result);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  handleUploadImage,
  handleDeleteImage
};