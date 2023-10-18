const Products = require('../models/products');
const {initializeApp} = require('firebase/app');
const { ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const { getStorage } = require('firebase/storage');
const {firebaseConfig} = require('../config/firebase');

exports.uploadImageById = async (req, res) => {
    if( !req.body._id ) return res.status(400).json({ok: false, message: `Missing request data _id`})

  try {
    const product = await Products.findOne({_id: req.body._id});
    if ( !product ) return res.status(400).json({ok:false, message: `Product not found`});
    initializeApp(firebaseConfig);
    const storage = getStorage();
    const storageRef = ref(storage, `files/${req.file.originalname}`);
    const metadata = {
      contentType: req.file.mimetype
    };
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    const updateProduct = await Products.findOneAndUpdate({_id: req.body._id}, {image: downloadURL}, {returnDocument: "after"})
    console.log(updateProduct)
    return res.json({
      ok: true,
      message: 'File uploaded to Firebase Storage',
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: downloadURL
    });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
};


exports.uploadImage = async (req, res) => {
    try{
        initializeApp(firebaseConfig);
        const storage = getStorage();
        const storageRef = ref(storage, `files/${req.file.originalname}`);
        const metadata = {
          contentType: req.file.mimetype
        };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL
    }catch(err){
        throw new Error(err)
    }
};