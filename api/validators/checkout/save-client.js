const yup = require('yup');
const NaturalPerson = require('../../models/NaturalPerson');

const saveClientSchema = yup.object({
  useClient: yup
    .boolean()
    .required(),
  client: yup
    .string()
    .when('useClient', {
      is: false,
      then: s => s.strip()
    })
}).test(async (value, ctx) => {
  if (value.useClient && !value.client) {
    return ctx.createError({
      message: 'A client is required'
    });
  }
  
  if (value.useClient) {
    const foundClient = await NaturalPerson.findById(value.client);

    if (!foundClient) {
      return ctx.createError({
        message: 'Invalid user'
      });
    }
  }

  return true;
});

module.exports = saveClientSchema;