const {
    createUser,
  } = require("../controllers/UserController");

const postUsersHandler = async (req, res) => {
    try {
      const { given_name, family_name, email, email_verified, sub, picture} = req.body;
      console.log(req.body);
      await createUser(given_name, family_name, email, email_verified, sub, picture);
      res.status(201).send("User creado exitosamente");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const getUsersHandler = async (req, res) => {
    try {
      const all = await getUser();
      res.status(200).send(all);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    postUsersHandler,
  };
  