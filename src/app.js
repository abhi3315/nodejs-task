const path = require("path");
const express = require("express");
const reportRoute = require("./routes/report");
require("./db");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/reports", reportRoute);

module.exports = app;
