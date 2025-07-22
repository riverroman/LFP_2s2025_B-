//  === Funciones en js
function saludar(nombre) {
  console.log("Hola, " + nombre + "!");
}

saludar("Juan"); // Hola, Juan!

// 2 parametros en una funcion
function sumar(a, b) {
  console.log("La suma de " + a + " y " + b + " es: " + (a + b));
}

const number = 10;
const number2 = 20;

sumar(number2, number); // La suma de 5 y 10 es: 15

// ====== Ciclor For
let i; // Variable de control del bucle
for (i = 0; i <= 5; i++) {
  console.log("Iteración " + i); // Iteración 0, Iteración 1, Iteración 2, Iteración 3, Iteración 4
}

// === Ciclos While
let j = 0; // Variable de control del bucle
while (j <= 10) {
  console.log("Iteración " + j);
  j++;
}
