const Users = require('../models/users');

const createUser = async (given_name, family_name, email, email_verified, sub, picture) => {
    try {
        const findUser = await Users.findOne({ email: email });
        if (!findUser) {
            const data = {}
            if (given_name) data.given_name = given_name
            if (family_name) data.family_name = family_name
            if (email) data.email = email
            if (email_verified) data.email_verified = email_verified
            if (sub) data.sub = sub
            if (picture) data.picture = picture
            const newUser = new Users(data)
            const createdUser = await newUser.save()
            return createdUser
        }else {
            return findUser
        }
    }catch(err) {
        throw new Error(err)
    }


}

module.exports = { createUser }