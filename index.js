const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
var body_parser = require("body-parser");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/html/index.html"));
});

app.post("/generar", (req, res) => {
    let nombre = req.body.nombre || "";
    let tel = req.body.tel || "";
    let direccion = req.body.direccion || "";
    let registro = req.body.registro || "";
    let email = req.body.email || "";
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});