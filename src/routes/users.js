const express = require('express');
const router = express.Router();

const {
    getUsersHandler,
    postUsersHandler,
  } = require("../handlers/usersHandlers");


router.post("/create", postUsersHandler);
//router.get("/", getUsersHandler);

module.exports = router;