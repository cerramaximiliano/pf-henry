const express = require("express");
const connectDB = require('./db');
const db = connectDB();


const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const server = express();

server.use(morgan("dev"));
server.use(express.json({extended: false}, {limit: '50mb'}));
server.use(express.urlencoded({limit: '50mb'}));
server.use(cors());

server.use(router);

module.exports = server;