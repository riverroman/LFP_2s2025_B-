import { Lexer } from "./Lexer.js";

const entrada = `
{
    ( [ ] )
}
`;

const lexer = new Lexer(entrada);
const tokens = lexer.analizar();

console.log("========= Tokens generados =========");
console.table(tokens);