const express = require("express");
const router = require("./router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", router);

module.exports = app;
