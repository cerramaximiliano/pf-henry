const Users = require('../models/users');

const createUser = async (
  given_name,
  family_name,
  email,
  email_verified,
  sub,
  picture
) => {
  try {
    const findUser = await Users.findOne({ email: email });
    if (!findUser) {
      const data = {};
      if (given_name) data.given_name = given_name;
      if (family_name) data.family_name = family_name;
      if (email) data.email = email;
      if (email_verified) data.email_verified = email_verified;
      if (sub) data.sub = sub;
      if (picture) data.picture = picture;
      const newUser = new Users(data);
      const createdUser = await newUser.save();
      return createdUser;
    } else {
      return findUser;
    }
  } catch (err) {
    throw new Error(err);
  }
};

// Controlador para desactivar un usuario
async function desactivateUser(req, res) {
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.isActive = false;
    await user.save();

    res.status(200).json({ message: 'Usuario desactivado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar el usuario' });
  }
}

// Controlador para activar un usuario
async function activateUser(req, res) {
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.isActive = true;
    await user.save();

    res.status(200).json({ message: 'Usuario activado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al activar el usuario' });
  }
}

module.exports = { createUser, desactivateUser, activateUser };
