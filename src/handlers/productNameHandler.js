const getByName = require("../controllers/getByName.js");

const nameHandler = async (req, res) => {
    let name = req.params.name; 
    try {
        const result = await getByName(name);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { nameHandler };
