const express = require('express');
const router = express.Router();

const {
  getUsersHandler,
  postUsersHandler,
} = require('../handlers/usersHandlers');

const {
  desactivateUser,
  activateUser,
} = require('../controllers/UserController');

router.post('/create', postUsersHandler);
router.get("/", getUsersHandler);
router.put('/desactivate/:userId', desactivateUser);
router.put('/activate/:userId', activateUser);

module.exports = router;
