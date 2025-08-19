// Clase 
class Token{
    constructor(type, value){
        this.type = type;
        this.value = value;
    }
}

// =========================
//  Tokenizacion 
// =========================
function tokenize(code){
    const reseverd = {
        "var" : "TYPE",
        "=" : "ASSIGN",
        ";" : "SEMICOLON"
    }

    const tokens =[];
    const parts = code.split(/\s+/); // eliminar espacios en blanco, tabuladores, saltos de linea

    for(let part of parts){
        if(reseverd[part]){
            tokens.push(new Token(reseverd[part], part))
            // Si la palabra reservada var = , convertimos a su tipo
        }else if(!isNaN(part)){
            tokens.push(new Token("NUMBER", Number(part)));
            // Si el par es un numero lo guardamos como token de tipo numero
        }else if (part.endsWith(";")) {
        const ident = part.slice(0, -1); // Quita el ";"
        if (!isNaN(ident)) { // Si es un número
            tokens.push(new Token("NUMBER", Number(ident))); // Número
        } else {
            tokens.push(new Token("IDENTIFIER", ident)); // Identificador
            //Si no es reservado, ni número, ni tiene ;, lo tratamos como un IDENTIFIER (ej: nombre de variable).
        }
      tokens.push(new Token("SEMICOLON", ";")); // Punto y coma
    } else {
      tokens.push(new Token("IDENTIFIER", part)); // Identificador
    }
  }
    return tokens;
}

function interpretar(tokens){
    let i = 0; // Puntero manual

    if(tokens[i].type === "TYPE"){
        console.log("Encontramos un variable");
        i++;
    }

    const nombre = tokens[i];
    if(nombre.type === "IDENTIFIER"){
        console.log("Nombre de la variable", nombre.value)
    }

    if(tokens[i].type === "ASSIGN"){
        console.log("Encontramos un signo de asignacion (=)");
        i++;
    }

    const valor = tokens[i];
    if(valor.type === "NUMBER"){
        console.log("Valor asignado:", valor.value)
        i++;
    }

    if(tokens[i].type === "SEMICOLON"){
        console.log("Fin de la instruccion")
    }

}

// Ejemplo de Uso
const code = "var numero = 100";
const tokens = tokenize(code);

console.log("Tokens generados");
console.log(tokens);

console.log("\nRecorriendo tokens paso a paso:")
interpretar(tokens);