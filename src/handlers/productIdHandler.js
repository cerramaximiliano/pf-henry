const getById = require("../controllers/getProductById.js");

const idHandler = async (req, res) => {
    let id = req.params.id; 
    try {
        const result = await getById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { idHandler };
