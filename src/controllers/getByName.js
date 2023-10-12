const Product = require('../models/products');

async function getByName(name) {
  try {
    const resultados = await Product.find({ title:  { $regex: name, $options: 'i' }  });
    if (resultados.length > 0) {
      return resultados;
    } else {
      return 'No se encontraron coincidencias';
    }
  } catch (err) {
    console.error('Error al buscar en la base de datos:', err);
    throw new Error(err)
  }
}

module.exports = getByName;
