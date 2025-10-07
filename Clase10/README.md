
---

## Funcionamiento general

### **Lexer (Analizador Léxico)**

Archivo: `Lexer/lexer.js`

El **lexer** recorre el código fuente **carácter por carácter**, generando una lista de **tokens**.  
Cada token tiene información de tipo, valor, línea y columna.

#### Reconoce los siguientes tipos:
- **IDENTIFICADOR** → Ejemplo: `a`, `b`, `variable`
- **NUMERO** → Ejemplo: `10`, `500`
- **PRINT** → Palabra reservada `print`
- **SÍMBOLOS** → `=`, `+`, `(`, `)`, `;`

#### Manejo de errores:
Si el lexer encuentra un carácter desconocido, genera un objeto `ErrorL` con información de línea y columna.

#### Ejemplo de salida de tokens:

    ```js
    [
    Token { type: 'IDENTIFICADOR', value: 'a', line: 1, column: 1 },
    Token { type: 'ASIGNACION', value: '=', line: 1, column: 3 },
    Token { type: 'NUMERO', value: '34', line: 1, column: 5 },
    Token { type: 'PUNTOYCOMA', value: ';', line: 1, column: 7 },
    ...
    ]


## Parser (`Parser/parser.js`)

El **Parser** recibe la lista de tokens del Lexer y construye el **Árbol Sintáctico Abstracto (AST)** conforme a una gramática sencilla (asignaciones y `print` con suma).

### Gramática (EBNF)

    ```
    ebnf
    Programa       ::= Instruccion* ;
    Instruccion    ::= Asignacion | Print ;

    Asignacion     ::= IDENTIFICADOR ASIGNACION NUMERO PUNTOYCOMA ;
    Print          ::= PRINT PAR_ABRE Expresion PAR_CIERRA PUNTOYCOMA ;

    Expresion      ::= NUMERO ( MAS NUMERO )? ;


Para el codigo

a = 34;
print(10+500);

El ast generado seria 

    Programa
    ├── Asignacion
    │   ├── a
    │   └── 34
    └── Print
        └── +
            ├── 10
            └── 500