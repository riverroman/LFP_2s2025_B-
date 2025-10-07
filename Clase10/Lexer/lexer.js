// Importación de la clase Token desde el módulo Token.js
import { Token } from "../Token/Token.js";
// Importación de la clase ErrorL desde el módulo Error.js
import { ErrorL } from "../Error/Error.js";

// ============================================================
// Definición de la clase principal del analizador léxico (Lexer)
// ============================================================
class Lexer {
  // Constructor que inicializa los atributos del analizador
  constructor(code) {
    this.code = code;       // Código fuente a analizar
    this.tokens = [];       // Lista donde se almacenarán los tokens válidos
    this.errors = [];       // Lista donde se almacenarán los errores léxicos
    this.line = 1;          // Número de línea actual
    this.column = 1;        // Columna actual dentro de la línea
    this.position = 0;      // Posición actual dentro del código fuente
  }

  // ============================================================
  // Función que verifica si un carácter es una letra o guion bajo
  // ============================================================
  esLetra(c) {
    // Retorna true si el carácter está entre 'a'-'z', 'A'-'Z' o es '_'
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
  }

  // ============================================================
  // Función que verifica si un carácter es un número
  // ============================================================
  esDigito(c) {
    // Retorna true si el carácter está entre '0' y '9'
    return c >= '0' && c <= '9';
  }

  // ============================================================
  // Función que avanza una posición en el código fuente
  // ============================================================
  avanzar() {
    this.position++; // Avanza un carácter en la posición global
    this.column++;   // Avanza una columna dentro de la línea actual
  }

  // ============================================================
  // Función principal que realiza el análisis léxico
  // ============================================================
  analizar() {
    // Recorre todo el código mientras haya caracteres disponibles
    while (this.position < this.code.length) {
      // Obtiene el carácter actual
      let c = this.code[this.position];

      // ------------------------------------------------------------
      // Ignorar espacios en blanco y tabulaciones
      // ------------------------------------------------------------
      if (c === " " || c === "\t") {
        this.avanzar(); // Simplemente avanza una posición
        continue;       // Pasa al siguiente ciclo
      }

      // ------------------------------------------------------------
      // Manejar saltos de línea
      // ------------------------------------------------------------
      if (c === "\n") {
        this.line++;        // Incrementa el número de línea
        this.column = 1;    // Reinicia la columna
        this.avanzar();     // Avanza a la siguiente posición
        continue;           // Pasa al siguiente ciclo
      }

      // ------------------------------------------------------------
      // === IDENTIFICADORES o PALABRAS CLAVE ===
      // ------------------------------------------------------------
      if (this.esLetra(c)) {
        let inicio = this.position; // Guarda la posición inicial (opcional)
        let valor = "";             // Acumulador para construir la palabra

        // Recorre mientras haya letras o dígitos válidos
        while (this.position < this.code.length && 
              (this.esLetra(this.code[this.position]) || this.esDigito(this.code[this.position]))) {
          valor += this.code[this.position]; // Agrega el carácter al valor
          this.avanzar();                    // Avanza una posición
        }

        // Determina si el valor es una palabra reservada (print) o un identificador
        let tipo = valor === "print" ? "PRINT" : "IDENTIFICADOR";

        // Agrega el token a la lista de tokens válidos
        this.tokens.push(new Token(tipo, valor, this.line, this.column));
        continue; // Continúa con el siguiente carácter
      }

      // ------------------------------------------------------------
      // === NÚMEROS ===
      // ------------------------------------------------------------
      if (this.esDigito(c)) {
        let valor = ""; // Acumulador para el número

        // Recorre mientras el carácter actual sea un dígito
        while (this.position < this.code.length && this.esDigito(this.code[this.position])) {
          valor += this.code[this.position]; // Agrega el dígito
          this.avanzar();                    // Avanza una posición
        }

        // Agrega el token de tipo NUMERO
        this.tokens.push(new Token("NUMERO", valor, this.line, this.column));
        continue; // Continúa con el siguiente carácter
      }

      // ------------------------------------------------------------
      // === SÍMBOLOS ===
      // ------------------------------------------------------------
      const simbolos = {
        "=": "ASIGNACION",
        "+": "MAS",
        "(": "PAR_ABRE",
        ")": "PAR_CIERRA",
        ";": "PUNTOYCOMA",
      };

      // Si el carácter actual es un símbolo reconocido
      if (simbolos[c]) {
        // Crea un nuevo token con el tipo correspondiente
        this.tokens.push(new Token(simbolos[c], c, this.line, this.column));
        this.avanzar(); // Avanza una posición
        continue;       // Continúa con el análisis
      }

      // ------------------------------------------------------------
      // === ERROR LÉXICO ===
      // ------------------------------------------------------------
      // Si el carácter no coincide con ningún patrón válido
      this.errors.push(
        new ErrorL(
          "Léxico",                              // Tipo de error
          `Carácter no reconocido: '${c}'`,       // Descripción del error
          this.line,                              // Línea actual
          this.column                             // Columna actual
        )
      );

      // Avanza una posición después del error
      this.avanzar();
    }

    // Devuelve la lista de tokens generados al finalizar el análisis
    return this.tokens;
  }
}

// ============================================================
// Exporta la clase Lexer para poder usarla en otros módulos
// ============================================================
export { Lexer };