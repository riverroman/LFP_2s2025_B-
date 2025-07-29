// === Funciones nativas

const nombre = "Juan";
console.log(nombre.toUpperCase()); // Convierte a mayúsculas
const apellido = "Pérez";
console.log(apellido.toLowerCase()); // Convierte a minúsculas

// Push y pop en arreglos
const numeros = [1, 2, 3];
console.log(numeros); // [1, 2, 3]
numeros.push(4); // Agrega un elemento al final del arreglo
numeros.push(5);
console.log(numeros); // [1, 2, 3, 4, 5]

// pop
numeros.pop(); // Elimina el último elemento del arreglo
console.log(numeros); // [1, 2, 3, 4]

// Fecha
const date = new Date().getFullYear(); // New Date funcion nativa de JavaScript
const time = new Date().toTimeString(); // toTimeString devuelve la hora actual en formato de cadena
console.log(date); // Muestra la fecha y hora actual
console.log(time); // Muestra la hora actual
