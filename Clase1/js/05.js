// ===== Operadores Logicos
const a = true;
const b = false;

if (a && b) {
  console.log("Ambos son verdaderos");
} else {
  console.log("Al menos uno es falso"); // Al menos uno es falso
}

if (a || b) {
  console.log("Al menos uno es verdadero"); // Al menos uno es verdadero
} else {
  console.log("Ambos son falsos");
}

if (!a) {
  console.log("a es falso"); // a es falso
} else {
  console.log("a es verdadero"); // a es verdadero
}
