const mongoose = require("mongoose");

import { config } from "dotenv";
config();

//DB uri
var uri = process.env.DB_URI;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

module.exports = connection;
