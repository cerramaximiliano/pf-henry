const express = require("express");
const connectDB = require('./db');
const db = connectDB();


const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const server = express();

server.use(morgan("dev"));
server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({extended: false}, {limit: '50mb'}));
server.use(cors({
    origin: '*'
}));

server.use(router);

module.exports = server;