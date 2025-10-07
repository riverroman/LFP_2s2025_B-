import fs from "fs";

let contador = 0;

function generarDot(node) {
  let resultado = "digraph AST {\n  node [shape=box, style=filled, color=lightblue];\n";
  resultado += generarNodos(node).texto;
  resultado += "}\n";
  fs.writeFileSync("ast.dot", resultado);
  console.log("Archivo 'ast.dot' generado correctamente.");
}

function generarNodos(node, padreId = null) {
  const id = `n${contador++}`;
  let texto = `  ${id} [label="${node.label}"];\n`;

  if (padreId) {
    texto += `  ${padreId} -> ${id};\n`;
  }
  
  for (const hijo of node.children) {
    const { texto: textoHijo } = generarNodos(hijo, id);
    texto += textoHijo;
  }

  return { texto };
}

export { generarDot };