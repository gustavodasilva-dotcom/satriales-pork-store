const yup = require('yup');

const imageSchema = yup.object({
	name: yup
		.string()
		.required(),
	image: yup
		.mixed()
		.required(),
	contentType: yup
		.string()
		.required(),
});

module.exports = imageSchema;