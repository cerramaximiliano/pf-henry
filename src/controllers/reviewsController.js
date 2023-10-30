const express = require('express');
const router = express.Router();
const Reviews = require('../models/reviews'); // Asegúrate de que la importación sea correcta
const Product = require('../models/products');
const Order = require('../models/orders');

router.post('/create', async (req, res) => {
  try {
    const { userId, productId, rating, comments, orderId } = req.body;
    console.log(orderId);

    
    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: orderId,
        'products.productId': productId
      },
      { $set: { 'products.$.review': true } },
      { new: true }
    );


    // Crear una nueva revisión sin el campo "__v"
    const newReview = new Reviews({ userId, productId, rating, comments });

    // Guardar la revisión en la base de datos
    const savedReview = await newReview.save();

    // Asociar la revisión con el producto
    const product = await Product.findById(productId);
    product.reviews.push(savedReview._id);
    await product.save();

    // Utiliza .lean() para obtener una versión sin el campo "__v"
    const savedReviewWithoutV = await Reviews.findById(savedReview._id).lean();

    res.status(201).json(savedReviewWithoutV);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la revisión.' });
  }
});

// Ruta para obtener reseñas de un producto por su ID
router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Buscar todas las reseñas para un producto específico
    const reviews = await Reviews.find({ productId });

    if (reviews.length === 0) {
      res
        .status(404)
        .json({ error: 'No se encontraron reseñas para este producto.' });
    } else {
      res.json(reviews);
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las reseñas.' });
  }
});

// Ruta para obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
    // Buscar todas las reseñas
    const reviews = await Reviews.find();

    if (reviews.length === 0) {
      res.status(404).json({ error: 'No se encontraron reseñas.' });
    } else {
      res.json(reviews);
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las reseñas.' });
  }
});

// Ruta para obtener todas las reseñas de un usuario por su ID
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Buscar todas las reseñas del usuario por su ID
    const reviews = await Reviews.find({ userId });

    if (reviews.length === 0) {
      res
        .status(404)
        .json({ error: 'No se encontraron reseñas para este usuario.' });
    } else {
      res.json(reviews);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'No se pudieron obtener las reseñas del usuario.' });
  }
});

// Ruta para eliminar una revisión por su ID, para los 2 rangos (admin y user) (el user  puede borrar su propia review y el admin puede borrar cualquier review)
router.delete('/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    // Eliminar la revisión por su ID
    const result = await Reviews.findByIdAndRemove(reviewId);

    if (!result) {
      return res.status(404).json({ error: 'La revisión no se encontró.' });
    }

    res.json({ message: 'La revisión se eliminó correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar la revisión.' });
  }
});

module.exports = router;
