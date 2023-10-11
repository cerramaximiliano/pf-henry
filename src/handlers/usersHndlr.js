const {createUserCtrl, getUserCtrl} = require("../controllers/userCtrlr");

const createUser = async (req, res) => {
    try {
        const data = req.body;
        const newUser = await createUserCtrl(data)
        res.json(newUser)    
    } catch (error) {
        res.status(500).json(error.message)
    }
  };

  const getUser = async (req, res) => {
    const {id} = req.params
    try {
        user = await getUserCtrl(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json(error.message)
    }
    
  }

  module.exports = {createUser, getUser}