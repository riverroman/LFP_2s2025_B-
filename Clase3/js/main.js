import fs from "fs"; // module
import readline from "readline"; // module

let datos = [
  // Aca se almacena el contenido del archivo
]; // Almacenar los datos cargados

// Js - JavaScript

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Java - Scanner keyboard = new Scanner(System.in);

function mostrarMenu() {
  console.log("==== Bienvenido al Sistema de Banco ====");
  console.log("1. Cargar archivo");
  console.log("2. Ver Nombres");
  console.log("3. Ver Edades");
  console.log("4. Salir");

  rl.question("Elige un opcion:  ", (opcion) => {
    switch (opcion) {
      case "1":
        cargarArchivo();
        break;
      case "2":
        verNombres();
        break;
      case "3":
        verEdades();
        break;
      case "4":
        console.log("Salir");
        rl.close(); // Cerrar el readline
        return;
      default:
        console.log("Opcion no valida");
        mostrarMenu();
        break;
    }
  });
}

// Funcion que nos permite la carga de un archivo
function cargarArchivo() {
  // La ruta debe ser relativa // Descargas, Documentos, Escritorio
  const ruta = "./entry.txt";

  fs.readFile(ruta, "utf8", (err, contenido) => {
    if (err) {
      console.log("Error al leer el archivo: ", err.message);
    } else {
      const lineas = contenido.trim().split("\n");
      const encabezados = lineas[0].split(",");

      datos = lineas.splice(1).map((linea) => {
        const valores = linea.split(",");
        return {
          [encabezados[0]]: valores[0].trim(),
          [encabezados[1]]: valores[1].trim(),
          // trim -> elimina los espacios en blanco
        };
      });
      console.log(" ==== Archivo cargado exitosamente ====");
    }
    mostrarMenu();
  });
}

function verNombres() {
  // El array datos ya contiene los datos previamente cargados
  if (datos.length === 0) {
    console.log("Debes de cargar el archivo");
  } else {
    console.log("===== Listando los Nombres ===== ");
    datos.forEach((persona) => console.log(persona.nombre));
  }
  mostrarMenu();
}

function verEdades() {
  if (datos.length === 0) {
    console.log("Debes de cargar el archivo");
  } else {
    console.log("===== Listando las Edades ===== ");
    datos.forEach((persona) => console.log(persona.edad));
    // datos.forEach itera los datos que estan almacenados en al array
    // persona -> { nombre: "Juan", edad: 30 }
  }
  mostrarMenu();
}

// Llamando la funcion para ejeuctar mi programa
mostrarMenu();
