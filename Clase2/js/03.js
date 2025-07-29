// ==== Funciones
function saludar(nombre) {
  console.log(`Hola, ${nombre}!`);
}

saludar("Juan"); // Llamada a la función saludar

// Return, continue

for (let i = 1; i <= 5; i++) {
  if (i === 2) {
    continue; // Salta la iteración actual cuando i es igual a 2
  }
  console.log(i); // Imprime los números del 0 al 4, excepto el 2
}

console.log("====== Return ========");

// Comentar el codigo para la ejecucion de la funcion usando el return
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    return; // Termina la ejecución de la función cuando i es igual a 3
  }
  console.log(i); // Imprime los números del 1 al 5
}

/// Return en una funcion
console.log("====== Return en una funcion ========");

function sumar(a, b) {
  return a + b; // Devuelve la suma de a y b
}

const suma1 = sumar(3, 4); // 7 Llama a la función sumar y muestra el resultado en la consola
console.log(suma1); // Imprime el resultado de la suma
