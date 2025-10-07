// ============================================================
// Importación de la clase ASTNode (nodo del Árbol Sintáctico)
// ============================================================
import { ASTNode } from "../Ast/ASTNode.js";
// ============================================================
// Clase principal Parser — Analizador Sintáctico
// ============================================================
class Parser {
  // ------------------------------------------------------------
  // Constructor del parser
  // Recibe una lista de tokens producidos por el lexer
  // ------------------------------------------------------------
  constructor(tokens) {
    this.tokens = tokens;               // Lista de tokens de entrada
    this.pos = 0;                       // Índice actual dentro del arreglo de tokens
    this.astRoot = new ASTNode("Programa"); // Nodo raíz del árbol sintáctico (AST)
  }

  // ------------------------------------------------------------
  // Retorna el token actual sin avanzar la posición
  // ------------------------------------------------------------
  actual() {
    return this.tokens[this.pos];
  }

  // ------------------------------------------------------------
  // Verifica si el token actual coincide con un tipo esperado
  // Si coincide, avanza una posición y retorna el token
  // ------------------------------------------------------------
  coincidir(tipo) {
    const t = this.actual(); // Token actual
    if (t && t.type === tipo) {
      this.pos++;            // Avanza al siguiente token
      return t;              // Retorna el token coincidente
    }
    return null;             // Retorna null si no coincide
  }

  // ------------------------------------------------------------
  // Función principal de análisis
  // Recorre todos los tokens y construye el AST
  // ------------------------------------------------------------
  parse() {
    // Mientras existan tokens por analizar
    while (this.pos < this.tokens.length) {
      const node = this.instruccion(); // Intenta reconocer una instrucción

      // Si la instrucción es válida, la agrega al árbol
      if (node) {
        this.astRoot.addChild(node);
      } 
      // Si no se pudo reconocer, muestra error sintáctico
      else {
        const t = this.actual();
        console.error(
          `Error sintáctico cerca de '${t?.value ?? "EOF"}' (línea ${t?.line ?? "?"}, columna ${t?.column ?? "?"})`
        );
        break; // Detiene el análisis ante un error
      }
    }

    // Devuelve el árbol sintáctico final
    return this.astRoot;
  }

  // ------------------------------------------------------------
  // Analiza una instrucción (asignación o print)
  // ------------------------------------------------------------
  instruccion() {
    const t = this.actual(); // Token actual
    if (!t) return null;     // Si no hay token, termina

    // Si la instrucción empieza con un identificador, puede ser una asignación
    if (t.type === "IDENTIFICADOR") return this.asignacion();
    // Si empieza con "print", analiza una instrucción de impresión
    if (t.type === "PRINT") return this.print();

    // Si no coincide con ninguna estructura válida
    return null;
  }

  // ------------------------------------------------------------
  // Analiza una instrucción de asignación:
  // Ejemplo: x = 10;
  // ------------------------------------------------------------
  asignacion() {
    const nodo = new ASTNode("Asignacion"); // Nodo raíz de la instrucción
    const id = this.coincidir("IDENTIFICADOR"); // Variable
    const igual = this.coincidir("ASIGNACION"); // Signo '='
    const valor = this.coincidir("NUMERO");     // Valor numérico
    const fin = this.coincidir("PUNTOYCOMA");   // Punto y coma final

    // Si la secuencia es válida (x = 10;)
    if (id && igual && valor && fin) {
      // Agrega hijos al nodo principal
      nodo.addChild(new ASTNode(id.value));    // Variable
      nodo.addChild(new ASTNode(valor.value)); // Valor
      console.log("Asignación válida");        // Mensaje de depuración
      return nodo;                             // Retorna el nodo al AST
    }

    // Si falta algún elemento, retorna null (error)
    return null;
  }

  // ------------------------------------------------------------
  // Analiza una instrucción print:
  // Ejemplo: print(10 + 2);
  // ------------------------------------------------------------
  print() {
    const nodo = new ASTNode("Print");      // Nodo raíz para la instrucción print
    const p = this.coincidir("PRINT");      // Palabra clave print
    const pa = this.coincidir("PAR_ABRE");  // Paréntesis de apertura '('
    const exp = this.expresion();           // Expresión interna
    const pc = this.coincidir("PAR_CIERRA");// Paréntesis de cierre ')'
    const fin = this.coincidir("PUNTOYCOMA");// Punto y coma ';'

    // Si la estructura completa es correcta
    if (p && pa && exp && pc && fin) {
      nodo.addChild(exp);                  // Agrega la expresión como hijo
      console.log("Print válido");         // Mensaje de depuración
      return nodo;                         // Retorna el nodo para agregarlo al AST
    }

    // Si no cumple la sintaxis, retorna null
    return null;
  }

  // ------------------------------------------------------------
  // Analiza expresiones simples:
  // Soporta valores numéricos y sumas (ej. 5 + 2)
  // ------------------------------------------------------------
  expresion() {
    const left = this.coincidir("NUMERO"); // Captura el primer número

    // Si no hay número, la expresión no es válida
    if (!left) return null;

    // Si hay un operador '+' después del número
    if (this.actual()?.type === "MAS") {
      this.coincidir("MAS");                // Consume el token '+'
      const right = this.coincidir("NUMERO");// Obtiene el número derecho

      // Crea un nodo operador "+"
      const opNode = new ASTNode("+");
      opNode.addChild(new ASTNode(left.value));  // Hijo izquierdo
      opNode.addChild(new ASTNode(right.value)); // Hijo derecho

      // Retorna el nodo compuesto (+ con dos hijos)
      return opNode;
    }

    // Si no hay operador, retorna el número solo
    return new ASTNode(left.value);
  }
}

// ============================================================
// Exportación de la clase Parser para uso en otros módulos
// ============================================================
export { Parser };