const {
  createUser,
  getUsers
} = require("../controllers/UserController");

const postUsersHandler = async (req, res) => {
  try {
    const { given_name, family_name, email, email_verified, sub, picture } = req.body;
    console.log('Body', req.body);
    const user = await createUser(given_name, family_name, email, email_verified, sub, picture);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersHandler = async (req, res) => {
  try {
    const {userId, page = 1, limit = 10, orderBy = 'email'} = req.query
    const all = await getUsers(userId, page, limit, orderBy);
    res.status(200).send(all);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  postUsersHandler,
  getUsersHandler
};
