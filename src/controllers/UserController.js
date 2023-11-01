const Users = require('../models/users');
const axios = require("axios");

function blockUserAuth(user_id, active) {
  let token = ''
  const blocked = JSON.stringify({
    "blocked": active,
  });
  const options = {
    method: 'post',
    url: process.env.AUTH_TOKEN_URL,
    headers: { 'content-type': 'application/json' },
    data: {
      client_id: process.env.AUTH_CLIENT_ID,
      client_secret: process.env.AUTH_CLIENT_SECRET,
      audience: process.env.AUTH_AUDIENCE,
      grant_type: 'client_credentials',
    },
  };
  axios(options)
  .then(response => {
    const token_json = response.data.access_token;
    //const token = JSON.stringify(token_json);
    console.log(token_json);
    console.log("user id " + user_id);
    const config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${process.env.AUTH_AUDIENCE}/users/${user_id}`,
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${token_json}`
      },
      data : blocked
    };
    axios.request(config).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  })
  .catch(error => {
    console.error(error);
  });
  return
}



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
    const user = await Users.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const data = blockUserAuth(user.sub, true)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar el usuario' });
  }
}

// Controlador para activar un usuario
async function activateUser(req, res) {
  try {
    const userId = req.params.userId;
    //const user = await Users.findById(userId);
    const user = await Users.findByIdAndUpdate(
      userId,
      { isActive: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    blockUserAuth(user.sub, false)
    res.status(200).json({ message: 'Usuario activado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al activar el usuario' });
  }
}

const getUsers = async (userId, page, limit, orderBy) => {
  try {
      if (userId) {
        const user = await Users.find({ _id: userId });
        return user
      } 
      const totalCount = await Users.countDocuments();
      const skip = (page - 1) * limit
      const users = await Users.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort(orderBy)

      const totalPages = Math.ceil(totalCount / limit)
      
      result = { users, totalPages, currentPage: parseInt(page), totalResults: totalCount }
      return result
  } catch (error) {
      throw error
  }
}

module.exports = { createUser, desactivateUser, activateUser, getUsers };


// will10@gmail db id 65386b2f0735abb993e8d521  sub auth0|65322105456e092d4d7f3caa