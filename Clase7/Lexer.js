import { Token } from "./Token.js";

export class Lexer {
    constructor(texto) {
        this.texto = texto;   
        this.pos = 0;         
        this.linea = 1;      
        this.columna = 1;    
        this.tokens = [];    
    }
    
    analizar() {
        while (this.pos < this.texto.length) {
            let char = this.texto[this.pos];

            switch (char) {
                case "{":
                    this.tokens.push(new Token("LLAVE_IZQ", "{", this.linea, this.columna));
                    break;
                case "}":
                    this.tokens.push(new Token("LLAVE_DER", "}", this.linea, this.columna));
                    break;
                case "(":
                    this.tokens.push(new Token("PAR_IZQ", "(", this.linea, this.columna));
                    break;
                case ")":
                    this.tokens.push(new Token("PAR_DER", ")", this.linea, this.columna));
                    break;
                case "[":
                    this.tokens.push(new Token("CORCHETE_IZQ", "[", this.linea, this.columna));
                    break;
                case "]":
                    this.tokens.push(new Token("CORCHETE_DER", "]", this.linea, this.columna));
                    break;
                case "\n":
                    this.linea++;
                    this.columna = 0;
                    break;
                case " ": 
                case "\t":
                    break;
                default:
                    break;
            }
            this.pos++;
            this.columna++;
        }
        return this.tokens;
    }
}