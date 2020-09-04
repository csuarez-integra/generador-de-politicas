const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
var body_parser = require("body-parser");
const fs = require("fs");

app.use(body_parser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/html/index.html"));
});

app.post("/generar", (req, res) => {
    let nombre = req.body.nombre || "";
    let tel = req.body.tel || "";
    let direccion = req.body.direccion || "";
    let registro = req.body.registro || "";
    let email = req.body.email || "";
    let cif = req.body.cif || "";

    let archivo = fs.readFileSync("aviso.txt", "utf-8");
    archivo = archivo.split("%nombre%").join(nombre);
    archivo = archivo.split("%direccion%").join(direccion);
    archivo = archivo.split("%tel%").join(tel);
    archivo = archivo.split("%registro%").join(registro);
    archivo = archivo.split("%email%").join(email);
    archivo = archivo.split("%cif%").join(cif);
    //console.log(archivo);
    res.send(archivo);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});