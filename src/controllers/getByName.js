const Product = require('../models/products');

async function getByName(name) {
  try {
    const words = name.split(' ');
    const regex = words.map(word => `(?=.*${word})`).join('');
    const regexPattern = new RegExp(regex, 'i');
    const resultados = await Product.find({ title: regexPattern });
    if (resultados.length > 0) {
      return resultados;
    } else {
      return 'No se encontraron coincidencias';
    }
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = getByName;