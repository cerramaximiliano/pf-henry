const {
  addProduct,
  desactivateProduct,
  activateProduct,
} = require('../controllers/productsControllers');

const addProductHandler = async (req, res) => {
<<<<<<< HEAD
    const {title, price, category, stock, sold, diet, flavor, weight} = req.body;
    try {
        if(!title || !price || !category || !stock || !diet || !flavor || !weight) {
            res.status(400).json({
                ok: false,
                message: `Missing request data`
            })
        }else{
            const newProduct = await addProduct(req.body);
            console.log(newProduct);
            if(newProduct) return res.status(201).json({ok:true, newProduct})
            else return res.status(500).json({ok:false, error:`Server error`})
        }
    }catch(err){
        res.status(500).json({ok:false, error: err.message})
=======
  const { title, price, category, stock, sold, diet, flavor, weight } =
    req.body;
  try {
    if (
      !title ||
      !price ||
      !category ||
      !stock ||
      !sold ||
      !diet ||
      !flavor ||
      !weight
    ) {
      res.status(400).json({
        ok: false,
        message: `Missing request data`,
      });
    } else {
      const newProduct = await addProduct(req.body);
      console.log(newProduct);
      if (newProduct) return res.status(201).json({ ok: true, newProduct });
      else return res.status(500).json({ ok: false, error: `Server error` });
>>>>>>> 7853c9d8c0dab19dd56da9d2abc5878b4538261b
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

module.exports = {
  addProductHandler,
  desactivateProductHandler,
  activateProductHandler,
};
