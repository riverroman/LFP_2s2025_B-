// =============================================================
// Importaciones necesarias para el manejo del analizador Lexico
// =============================================================
import { Token, ReservedWords } from "../Token/token.js";
import { Error } from "../Error/Error.js";

// ============================
// Clase Lexer 
// ============================
export class Lexer {
    // ============================
    // constructor inicial 
    // ============================
    constructor(texto) {
        this.texto = texto;
        this.pos = 0;
        this.linea = 1;
        this.columna = 1;
        this.tokens = [];
        this.errors = [];
        this.recorrido = [];
    }

    // =========================================================
    // Funcion auxiliar para avanzar en columna como en posicion
    // =========================================================
    avanzar() {
        this.pos++;
        this.columna++;
    }

    // =====================================
    // Analizamos
    // =====================================
    analizar() {
        while (this.pos < this.texto.length) {
            let char = this.texto[this.pos];

            // ======================================
            // Ignoramos saltos de linea y tabulacion
            // ======================================
            if (char === " " || char === "\t") { this.avanzar(); continue; }
            if (char === "\n") { this.linea++; this.columna = 1; this.avanzar(); continue; }

            // ============================
            // Iniciamos en el estado 0
            // ============================
            if (this.esLetra(char)) {
                this.recorrerIdentificador();
                continue;
            }

            if (this.esDigito(char)) {
                this.recorrerNumero();
                continue;
            }

            if (char === '"') {
                this.recorrerCadena();
                continue;
            }

            if (char === "'") {
                this.recorrerCaracter();
                continue;
            }

            if (this.esSimbolo(char)) {
                this.recorrerSimbolo();
                continue;
            }

            // =======================================
            // Si existen errores lo pushamos al array
            // =======================================
            this.errors.push(new Error("Léxico", char, "Carácter no reconocido", this.linea, this.columna));
            this.avanzar();
        }

        return this.tokens;
    }

    // =====================================
    // Si es un identificador los recorremos
    // =====================================
    recorrerIdentificador() {
        let inicioCol = this.columna;
        let buffer = "";
    
        // ===============================
        // Recolectamos el lexema completo
        // ===============================
        while (
            this.pos < this.texto.length &&
            (this.esLetra(this.texto[this.pos]) || this.esDigito(this.texto[this.pos]))
        ) {
            buffer += this.texto[this.pos];
            this.recorrido.push({
                estado: "ID",
                char: this.texto[this.pos],
                next: "ID"
            });
            this.avanzar();
        }
    
        // ===========================================
        // Verificación manual de si es palabra reservada
        // ===========================================
        let esReservada = false;
        let tipoReservada = "";
    
        for (let palabra in ReservedWords) {
            if (palabra === buffer) {
                esReservada = true;
                tipoReservada = ReservedWords[palabra];
                // ===========================
                // ya encontramos coincidencia
                // ===========================
                break; 
            }
        }
    
        // ========================
        // Agregamos el Token final
        // ========================
        if (esReservada) {
            this.tokens.push(new Token(tipoReservada, buffer, this.linea, inicioCol));
        } else {
            this.tokens.push(new Token("IDENTIFICADOR", buffer, this.linea, inicioCol));
        }
    }
    
    // ============================
    // Si un numero los recorremos
    // ============================
    recorrerNumero() {
        let inicioCol = this.columna;
        let buffer = "";
        let esDecimal = false;
        while (this.pos < this.texto.length && (this.esDigito(this.texto[this.pos]) || this.texto[this.pos] === ".")) {
            if (this.texto[this.pos] === ".") {
                if (esDecimal) break;
                esDecimal = true;
            }
            buffer += this.texto[this.pos];
            this.recorrido.push({ estado: "NUM", char: this.texto[this.pos], next: "NUM" });
            this.avanzar();
        }
        // ==================================================
        // Se pushea el numero se usa el operador ternario ?
        // Para la verificacion si es un int, o double
        // ==================================================
        this.tokens.push(new Token(esDecimal ? "DOUBLE" : "INT", buffer, this.linea, inicioCol));
    }

    // ============================
    // Si un string lo recorremos
    // ============================
    recorrerCadena() {
        let inicioCol = this.columna;
        let buffer = "";
        this.avanzar(); 
        while (this.pos < this.texto.length && this.texto[this.pos] !== '"') {
            buffer += this.texto[this.pos];
            this.avanzar();
        }
        if (this.pos >= this.texto.length) {
            this.errors.push(new Error("Léxico", buffer, "Cadena sin cerrar", this.linea, inicioCol));
            return;
        }
        this.avanzar();
        this.tokens.push(new Token("STRING", buffer, this.linea, inicioCol));
    }

    // =============================
    // Si un caracter los recorremos
    // =============================
    recorrerCaracter() {
        let inicioCol = this.columna;
        let buffer = "";
        this.avanzar();
        if (this.pos < this.texto.length) {
            buffer = this.texto[this.pos];
            this.avanzar();
        }
        if (this.texto[this.pos] !== "'") {
            this.errors.push(new Error("Léxico", buffer, "Carácter mal formado", this.linea, inicioCol));
            return;
        }
        this.avanzar();
        this.tokens.push(new Token("CHAR", buffer, this.linea, inicioCol));
    }

    // =============================
    // Si un operador los recorremos
    // =============================
    recorrerSimbolo() {
        let inicioCol = this.columna;
        let char = this.texto[this.pos];
        let next = this.texto[this.pos + 1] || "";

        // ==================================================
        // Vefificacion del tipo Operador si es de dos chars
        // ==================================================
        if ((char === "=" && next === "=") || (char === "!" && next === "=") ||
            (char === ">" && next === "=") || (char === "<" && next === "=") ||
            (char === "+" && next === "+") || (char === "-" && next === "-")) {
            this.tokens.push(new Token("OPERADOR", char + next, this.linea, inicioCol));
            this.avanzar();
            return;
        }

        // ==================================================
        // Vefificacion del tipo Operador si es de un char
        // ==================================================
        if (char === "=" || char === "+" || char === "-" || 
            char === "*" || char === "/" || char === "%" || 
            char === ">" || char === "<" || char === "!") {
            this.tokens.push(new Token("OPERADOR", char, this.linea, inicioCol));
            this.avanzar();
            return;
        }
        this.tokens.push(new Token("SIMBOLO", char, this.linea, inicioCol));
        this.avanzar();
    }

    // =============================
    // Si un simbolo lo recorremos
    // =============================
    esSimbolo(c) {
        switch (c) {
            case '{': case '}':
            case '(': case ')':
            case '[': case ']':
            case ';': case ',':
            case '.': case ':':
            case '=': case '+':
            case '-': case '*':
            case '/': case '%':
            case '^': case '&':
            case '|': case '!':
            case '>': case '<':
                return true;
            default:
                return false;
        }
    }
    // ====================================
    // Retorno de numero, letras y simbolos
    // ====================================
    esLetra(c) { return (c >= "A" && c <= "Z") || (c >= "a" && c <= "z"); }
    esDigito(c) { return (c >= "0" && c <= "9"); }
}