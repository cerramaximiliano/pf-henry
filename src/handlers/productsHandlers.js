const {
  addProduct,
  desactivateProduct,
  activateProduct,
  getAllProducts
} = require('../controllers/productsControllers');
const imagesController = require('../controllers/uploadFirebaseController');

const addProductHandler = async (req, res) => {
  try {
    const { title, price, category, stock, sold, diet, flavor, weight} =
      (req.body);
    if (
      !title ||
      !price ||
      !category ||
      !stock ||
      !diet ||
      !flavor
    ) {
      res.status(400).json({
        ok: false,
        message: `Missing request data`,
      });
    } else {
      console.log('Image Upload')
      if( req.image ){
        const uploadImage = await imagesController.uploadImage(req);
        console.log(uploadImage)
        const newProduct = await addProduct({...req.body, image: uploadImage})
        if (newProduct) return res.status(201).json({ ok: true, newProduct });
        else return res.status(500).json({ ok: false, error: `Server error` });
      }else {
        const newProduct = await addProduct(req.body);
        if (newProduct) return res.status(201).json({ ok: true, newProduct });
        else return res.status(500).json({ ok: false, error: `Server error` });
      }
    }
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

const desactivateProductHandler = async (req, res) => {
  const productId = req.params.id;

  try {
    const desactivatedProduct = await desactivateProduct(productId);

    res.json({ ok: true, desactivatedProduct });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const activateProductHandler = async (req, res) => {
  const productId = req.params.id;

  try {
    const updatedProduct = await activateProduct(productId);

    res.json({ ok: true, updatedProduct });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const getProducts = async (req,res) => {
  try {
    const{
      category,
      priceMin,
      priceMax,
      diet,
      flavor,
      weightMin,
      weightMax,
      weightType,
      page = 1,
      limit = 10,
      orderBy = 'title'
    } = req.query

    response = await getAllProducts(category,
      priceMin,
      priceMax,
      diet,
      flavor,
      weightMin,
      weightMax,
      weightType,
      page,
      limit,
      orderBy)

      res.json(response)
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Error while getting the'})
  }
}


module.exports = {
  addProductHandler,
  desactivateProductHandler,
  activateProductHandler,
  getProducts
};
