const express = require('express');
const {createUser, getUser} = require('../handlers/usersHndlr');
const router = express.Router();



router.get('/', (req,res) => {
    console.log('Get All Users')
    res.send(`Users route`)
});

router.post('/register', createUser)
router.get('/:id', getUser)

module.exports = router;