// ============================
// Clase Token
// ============================
export class Token{
    constructor(type, value, line, column){
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }
}

export const ReservedWords = {
    "public": "PUBLIC",
    "class": "CLASS",
    "static": "STATIC",
    "void": "VOID",
    "main": "MAIN",
    "String": "STRING_TYPE",
    "args": "ARGS",
    "int": "INT_TYPE",
    "double": "DOUBLE_TYPE",
    "char": "CHAR_TYPE",
    "boolean": "BOOLEAN_TYPE",
    "true": "TRUE",
    "false": "FALSE",
    "if": "IF",
    "else": "ELSE",
    "for": "FOR",
    "while": "WHILE",
    "System": "SYSTEM",
    "out": "OUT",
    "println": "PRINTLN"
};

export const Symbols = {
    "{": "LLAVE_IZQ",
    "}": "LLAVE_DER",
    "(": "PAR_IZQ",
    ")": "PAR_DER",
    "[": "CORCHETE_IZQ",
    "]": "CORCHETE_DER",
    ";": "SEMICOLON",
    ",": "COMMA",
    ".": "DOT",
    "=": "EQUAL",
    "+": "PLUS",
    "-": "MINUS",
    "*": "MULTIPLY",
    "/": "DIVIDE",
    "==": "EQUAL_EQUAL",
    "!=": "NOT_EQUAL",
    ">": "GREATER",
    "<": "LESS",
    ">=": "GREATER_EQUAL",
    "<=": "LESS_EQUAL",
    "++": "INCREMENT",
    "--": "DECREMENT"
};