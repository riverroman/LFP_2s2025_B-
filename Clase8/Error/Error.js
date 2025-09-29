// ==================================================
// Clase Error para almacenamiento de Errores Lexicos
// ==================================================
export class Error{
    constructor(type, value, message, line, column){
        this.type = type;
        this.value = value;
        this.message = message;
        this.line = line;
        this.column = column;
    }
}