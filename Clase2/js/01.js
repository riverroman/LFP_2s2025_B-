// Clase Padre
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`Hola, me llamo ${this.nombre} y tengo ${this.edad} años.`);
  }
}

// Clase derivada (herencia)
class Estudiante extends Persona {
  constructor(nombre, edad, carrera) {
    super(nombre, edad); // Referencia a la clase padre
    this.carrera = carrera;
  }
  estudiar() {
    console.log(`${this.nombre} está estudiando ${this.carrera}.`);
  }
}

// Crear objetos -> Usando la claes Persona
const persona1 = new Persona("Juan", 30);
persona1.saludar();

// Crear objetos -> Usando la clase Estudiante
const estudiante1 = new Estudiante("Ana", 22, "Ingeniería");
// Acceder a los métodos de la clase padre y la clase hija
estudiante1.saludar();
estudiante1.estudiar();

// ======= Formas de concatenar ==========

const nombre = "River";
const nacionalidad = "Guatemalteco";

console.log(`Mi nombre es ${nombre} y mi nacionalidad es: ${nacionalidad}`); // Primera forma
console.log(nombre, nacionalidad); // Segunda forma
