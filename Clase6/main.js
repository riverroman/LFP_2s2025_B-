class Token {
    constructor(tipo, valor, fila, columna) {     // Constructor: recibe tipo, valor y posición (fila/columna)
        this.tipo = tipo;                         // Guarda el tipo del token (p. ej., "Numero" o "Lexema")
        this.valor = valor;                       // Guarda el valor del token (p. ej., 123 o "hola")
        this.fila = fila;                         // Guarda la fila donde se encontró
        this.columna = columna;                   // Guarda la columna donde se encontró
    }

    operar() {                                    // Método simple: podría usarse para "evaluar" el token
        return this.tipo;                         // Devuelve el tipo del token
    }
}

// Token específico para números (hereda de Token)
class Numero extends Token {
    constructor(valor, fila, columna) {           // Constructor: recibe valor numérico y posición
        super("Numero", valor, fila, columna);    // Llama al constructor de Token fijando tipo="Numero"
    }
}

// Token específico para lexemas de texto (entre comillas) y símbolos sueltos
class Lexema extends Token {
    constructor(valor, fila, columna) {           // Constructor: recibe el texto y posición
        super("Lexema", valor, fila, columna);    // Llama al constructor de Token fijando tipo="Lexema"
    }
}

// Clase para representar errores léxicos (caracteres no reconocidos)
class ErrorLexico {
    constructor(caracter, fila, columna) {        // Constructor: qué carácter causó error y su posición
        this.caracter = caracter;                 // Carácter inválido o inesperado
        this.fila = fila;                         // Fila donde ocurrió el error
        this.columna = columna;                   // Columna donde ocurrió el error
    }
}

// Analizador léxico: recorre una cadena y construye listas de tokens y errores
class Analizador {
    constructor() {                               // Constructor: inicializa tablas y contadores
        this.reserved = {                         // Tabla de reservadas/símbolos (no se usa aún en analizar)
            "RTEXTO": "Texto",                    // Ejemplo de palabra reservada mapeada a un nombre
            "COMA": ",",                          // Símbolo coma
            "PUNTO": ".",                         // Símbolo punto
            "DPUNTOS": ":",                       // Dos puntos
            "CORI": "[",                          // Corchete izquierdo
            "CORD": "]",                          // Corchete derecho
            "LLAVEI": "{",                        // Llave izquierda
            "LLAVED": "}"                         // Llave derecha
        };

        this.listaTokens = [];                    // Aquí se irán acumulando los tokens reconocidos
        this.listaErrores = [];                   // Aquí se irán acumulando los errores léxicos
        this.linea = 1;                           // Contador de línea actual (empieza en 1)
        this.columna = 1;                         // Contador de columna actual (empieza en 1)
    }

    analizar(cadena) {                            // Método principal: recibe la cadena a analizar
        let i = 0;                                // Índice para recorrer la cadena
        while (i < cadena.length) {               // Bucle hasta consumir toda la cadena
            let char = cadena[i];                 // Carácter actual

            if (char === '"') {                   // Si encuentra comillas, intenta leer un lexema de texto
                let {lexema, pos} = this.armarLexema(cadena, i+1); // Lee hasta la próxima comilla
                this.listaTokens.push(            // Agrega un token Lexema con el texto capturado
                    new Lexema(lexema, this.linea, this.columna)
                );
                this.columna += lexema.length + 2; // Avanza columna por el texto + las 2 comillas
                i = pos;                           // Salta el índice hasta justo después de la comilla de cierre
            } 
            else if (/\d/.test(char)) {           // Si inicia con dígito, intenta armar un número
                let {numero, pos} = this.armarNumero(cadena, i); // Lee dígitos (y punto) contiguos
                this.listaTokens.push(            // Agrega un token Numero con el valor numérico
                    new Numero(numero, this.linea, this.columna)
                );
                this.columna += String(numero).length; // Avanza columna según la longitud del número leído
                i = pos;                           // Avanza índice al final del número
            }
            else if (char === "[" || char === "]") { // Si es corchete, lo tokeniza como Lexema de 1 char
                this.listaTokens.push(new Lexema(char, this.linea, this.columna));
                this.columna++;                   // Avanza una columna
                i++;                              // Avanza al siguiente carácter
            }
            else if (char === "\n") {             // Si es salto de línea
                this.linea++;                     // Incrementa el contador de líneas
                this.columna = 1;                 // Reinicia la columna
                i++;                              // Avanza índice
            }
            else if (char === "\t") {             // Si es tabulador
                this.columna += 4;                // Suma 4 a la columna (convención usada aquí)
                i++;                              // Avanza índice
            }
            else if (" {}.,:\r".includes(char)) { // Si es espacio, llaves, punto, coma, dos puntos o \r
                this.columna++;                   // Los ignora como separadores y solo avanza la columna
                i++;                              // Avanza índice
            }
            else {                                // Cualquier otra cosa se considera error léxico
                this.listaErrores.push(           // Registra el error con carácter y posición
                    new ErrorLexico(char, this.linea, this.columna)
                );
                this.columna++;                   // Avanza columna
                i++;                              // Avanza índice
            }
        }

        return this.listaTokens;                  // Devuelve la lista de tokens reconocidos
    }

    armarLexema(cadena, start) {                  // Lee un texto entre comillas dobles
        let lexema = "";                          // Acumulador del texto
        let i = start;                            // Empieza justo después de la comilla inicial
        while (i < cadena.length) {               // Recorre hasta fin de cadena
            if (cadena[i] === '"') {              // Si encuentra la comilla de cierre
                return {lexema, pos: i+1};        // Devuelve el lexema y la posición siguiente a la comilla
            } else {
                lexema += cadena[i];              // Agrega el carácter al lexema
                i++;                              // Avanza índice
            }
        }
        return {lexema: null, pos: i};            // Si no hubo comilla de cierre, devuelve null y fin
    }

    armarNumero(cadena, start) {                  // Lee un número (entero o decimal)
        let numero = "";                          // Acumulador en cadena
        let i = start;                            // Índice de lectura
        let isDecimal = false;                    // Bandera para saber si lleva punto decimal

        while (i < cadena.length) {               // Recorre caracteres continuos que formen el número
            let char = cadena[i];                 // Carácter actual
            if (char === ".") {                   // Si encuentra punto
                isDecimal = true;                 // Marca que es decimal (no se restringe a un solo punto)
                numero += char;                   // Agrega el punto al acumulador
                i++;                              // Avanza
            } 
            else if (/\d/.test(char)) {           // Si es dígito
                numero += char;                   // Lo agrega
                i++;                              // Avanza
            } 
            else {                                // Cualquier otro carácter corta el número
                break;                            // Sale del bucle
            }
        }
        // Convierte la cadena acumulada a número: float si hubo punto, si no, int
        return {numero: isDecimal ? parseFloat(numero) : parseInt(numero), pos: i};
    }

} // Fin de la clase Analizador

// === Ejemplo de uso ===
let analizador = new Analizador();                // Crea una instancia del analizador
let tokens = analizador.analizar('"hola",1,2.3,@#,!*,["mar"]'); // Analiza una cadena con un texto y dos números
console.log(tokens);                              // Muestra los tokens obtenidos
console.log("Errores:", analizador.listaErrores); // Muestra si hubo errores