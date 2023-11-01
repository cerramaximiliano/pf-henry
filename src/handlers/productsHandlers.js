const {
  addProduct,
  desactivateProduct,
  activateProduct,
  getAllProducts,
  getPropiertyValues,
  findAndUpdateProduct
} = require('../controllers/productsControllers');
const imagesController = require('../controllers/uploadFirebaseController');

const addProductHandler = async (req, res) => {
  try {
    const { title, price, category, stock, sold, diet, flavor, value, type} =
      (req.body);

      const missingFields = [];

      if (!title) missingFields.push("title");
      if (!price) missingFields.push("price");
      if (!category) missingFields.push("category");
      if (stock === undefined) missingFields.push("stock");
      if (!diet) missingFields.push("diet");
      if (!flavor) missingFields.push("flavor");
  
      if (missingFields.length > 0) {
        res.status(400).json({
          ok: false,
          message: `Missing request data for fields: ${missingFields.join(", ")}`,
          failedFields: missingFields
        });

      } else {
      console.log('Image Upload')
      if( req.image ){
        const uploadImage = await imagesController.uploadImage(req);
        const newProduct = await addProduct({...req.body, weight: {type:type, value:value}, image: uploadImage})
        if (newProduct) return res.status(201).json({ ok: true, newProduct });
        else return res.status(500).json({ ok: false, error: `Server error` });
      }else {
        const newProduct = await addProduct({...req.body, weigth: {type:type, value:value}});
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
      name,
      category,
      priceMin,
      priceMax,
      diet,
      flavor,
      weightMin,
      weightMax,
      weightType,
      page = 1,
      limit = 6,
      orderBy = 'title',
      active,
    } = req.query

    response = await getAllProducts(name,
      category,
      priceMin,
      priceMax,
      diet,
      flavor,
      weightMin,
      weightMax,
      weightType,
      page,
      limit,
      orderBy,
      active)

      res.json(response)
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Error while getting the'})
  }
}

const getPropiertyValuesHandler = async (req, res) => {
  const {value} = req.params;
  try {
    if (!value || (value !== 'flavor' && value !== 'category' && value !== 'diet' && value !== 'weight.type')){
      res.status(400).json({ok: false, message: `Invalid parameter: ${value}`})
    }else{
      const findValues = await getPropiertyValues(value);
      res.status(200).json(findValues);
    }
  }catch(err){
    res.status(500).json({err: err.message, ok: false})
  }
};

const updateProducts = async (req, res) => {
  const {id} = req.params;
  const update = req.body;
  try {
    if(!update.title && 
      !update.price &&
      !update.category &&
      !update.stock &&
      !update.diet &&
      !update.flavor &&
      !update.weight.value &&
      !update.weight.type
      ) return res.status(400).json({ok: false, message: `Missing request data`})
    const updatedProduct = await findAndUpdateProduct(id, update);
    res.status(200).json({ok: true, updatedProduct});
  }catch(err){
    res.status(500).json({ok: false, err: err.message})
  }
};

module.exports = {
  addProductHandler,
  desactivateProductHandler,
  activateProductHandler,
  getProducts,
  getPropiertyValuesHandler,
  updateProducts
};
