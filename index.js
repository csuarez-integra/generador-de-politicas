const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
var body_parser = require("body-parser");
const fs = require("fs");

//Utilizar body parse para recojer los datos por metodo post
app.use(body_parser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/html/index.html"));
});

app.post("/generar", (req, res) => {
    //Recojemos todos los datos proporcionados mediante post y le añadimos el texto que contienen cada uno

    let nombre = req.body.nombre || "";
    let tel = " Teléfono: " + req.body.tel || "";
    let direccion = "con domicilio en " + req.body.direccion || "";
    let registro =
        ", está inscrita en el Registro Mercantil de " + req.body.registro || "";
    let email = " Email: " + req.body.email || "";
    let cif = " y con CIF " + req.body.cif || "";
    let tienda = req.body.tienda || "";

    //leemos la plantilla de aviso.txt
    let archivo = fs.readFileSync("aviso.txt", "utf-8");

    /*
    
    reemplazamos todas las variables que tiene el aviso.txt(%nombre%, %direccion%, %tel%,
    %registro%, %email%, %cif%) por el nombre que hallamos introducido

     */
    archivo = archivo.split("%nombre%").join(nombre);
    archivo = archivo.split("%direccion%").join(direccion);
    archivo = archivo.split("%tel%").join(tel);
    archivo = archivo.split("%email%").join(email);

    //Antes de cambiar el registro y el cif comprobamos si se ha introducido

    if (registro.trim() !== ", está inscrita en el Registro Mercantil de") {
        archivo = archivo.split("%registro%").join(registro);
    } else {
        archivo = archivo.split("%registro%").join("");
    }
    if (cif.trim() !== "y con CIF") {
        archivo = archivo.split("%cif%").join(cif);
    } else {
        archivo = archivo.split("%cif%").join("");
    }

    //Comprueba que sea una tienda

    if (tienda !== "") {
        //Si lo es añade el apartado para tienda online
        archivo = archivo.concat(fs.readFileSync("tienda.txt", "utf-8"));
    }

    //Añade el ultimo trozo que es un script y una vuelta atras
    archivo = archivo.concat(fs.readFileSync("final.txt", "utf-8"));

    //Envia el html

    res.send(archivo);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});