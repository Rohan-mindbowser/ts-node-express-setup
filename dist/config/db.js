"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
//DB uri
var uri = process.env.DB_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
module.exports = connection;
