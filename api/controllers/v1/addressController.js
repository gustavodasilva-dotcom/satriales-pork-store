const axios = require('axios');
require('dotenv').config();
const Street = require('../../models/address/Street');
const Neighborhood = require('../../models/address/Neighborhood');
const City = require('../../models/address/City');
const State = require('../../models/address/State');
const Country = require('../../models/address/Country');
const { removeAllSpecialCharacters } = require('../../utils/string');

const handleGetBrazilianAddressByZipCode = async (req, res) => {
  const { zipcode } = req.params;
  let streetFound = await Street.findOne({ zipCode: zipcode }).populate('neighborhood city state country');

  if (!streetFound) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
      const viaCep = response.data;
      if (!viaCep) return res.sendStatus(404);

      const country = process.env.DEFAULT_COUNTRY;
      let foundCountry = await Country.findOne({ name: country });

      if (!foundCountry) {
        try {
          foundCountry = await Country.create({
            "name": country
          });
        } catch (error) {
          return res.status(500).json({ 'message': error.message });
        }
      }

      let foundState = await State.findOne({ initials: viaCep.uf });

      if (!foundState) {
        try {
          foundState = await State.create({
            "initials": viaCep.uf,
            "country": foundCountry._id
          });
        } catch (error) {
          return res.status(500).json({ 'message': error.message });
        }
      }

      let foundCity = await City.findOne({ name: viaCep.localidade });

      if (!foundCity) {
        try {
          foundCity = await City.create({
            "name": viaCep.localidade,
            "state": foundState._id
          });
        } catch (error) {
          return res.status(500).json({ 'message': error.message });
        }
      }

      let foundNeighborhood = await Neighborhood.findOne({ name: viaCep.bairro });

      if (!foundNeighborhood) {
        try {
          foundNeighborhood = await Neighborhood.create({
            "name": viaCep.bairro,
            "city": foundCity._id
          });
        } catch (error) {
          return res.status(500).json({ 'message': error.message });
        }
      }

      let foundStreet = await Street.findOne({ zipCode: viaCep.cep });

      if (!foundStreet) {
        try {
          foundStreet = await Street.create({
            "zipCode": removeAllSpecialCharacters(viaCep.cep),
            "name": viaCep.logradouro,
            "neighborhood": foundNeighborhood._id,
            "city": foundCity._id,
            "state": foundState._id,
            "country": foundCountry._id,
            "isBrazilianAddress": true
          });
        } catch (error) {
          return res.status(500).json({ 'message': error.message });
        }
      }

      streetFound = streetFound = await Street.findOne({ zipCode: zipcode }).populate('neighborhood city state country');;
    } catch (error) {
      const axiosStatusCode = error?.response?.status;
      const statusCode = axiosStatusCode ? axiosStatusCode : 500;
      return res.sendStatus(statusCode);
    }
  }

  res.json(streetFound);
};

module.exports = { handleGetBrazilianAddressByZipCode };