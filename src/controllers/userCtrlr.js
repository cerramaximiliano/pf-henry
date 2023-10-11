const User = require("../models/users");

const createUserCtrl = async (data) => {
    try {
        const findUser = await User.findOne({ email: data.email });
        if (!findUser) {
            const newUser = await User.create(data);
            return newUser
          } else {
            throw new Error("User Already Exists");
          }
        
    } catch (error) {
        throw error
    }
}

const getUserCtrl = async (id) => {
    try {
        const userFound = await User.findById(id)
        return userFound
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {createUserCtrl, getUserCtrl}