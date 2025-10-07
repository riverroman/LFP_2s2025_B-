// ============================================================
// Importaciones de las clases y utilidades principales
// ============================================================
import { Lexer } from "./Lexer/lexer.js";               // Analizador léxico
import { Parser } from "./Parser/parser.js";             // Analizador sintáctico
import { generarDot } from "./Utils/GraphvizGenerator.js"; // Generador de archivo DOT para visualizar el AST

// ============================================================
// Código de entrada a analizar
// ============================================================
// Este código simula un pequeño lenguaje con asignaciones y prints
const codigo = `
a = 34;
b = 4;
c = 12;
print(10+500);
print(8+1);
print(6+4);
print(1+2);
print(11+12);
`;

// ============================================================
// 1. ANÁLISIS LÉXICO
// ============================================================
// Se crea una instancia del analizador léxico con el código fuente
const lexer = new Lexer(codigo);

// El método analizar() recorre todo el código y genera los tokens válidos
const tokens = lexer.analizar();

// ============================================================
// 2. ANÁLISIS SINTÁCTICO
// ============================================================
// Se crea una instancia del parser con la lista de tokens generados
const parser = new Parser(tokens);

// El método parse() construye el Árbol Sintáctico Abstracto (AST)
const ast = parser.parse();

// ============================================================
// 3. GENERACIÓN DEL ARCHIVO DOT (Graphviz)
// ============================================================
// Convierte el AST a formato DOT para su visualización con Graphviz
generarDot(ast);

// ============================================================
// Resultado:
// - Los tokens se generan y se validan.
// - Se construye el árbol sintáctico.
// - Se exporta el archivo 'ast.dot' para visualizar el árbol.
// ============================================================