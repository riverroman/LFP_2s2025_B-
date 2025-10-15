// =========================================================
// Uso de la dependencia de express para exponer el servidor
// =========================================================
import express from "express";
// =========================================================
// Uso de cors para el envio de informacion para el frontend
// =========================================================
import cors from "cors";
// =========================================================
// Importacion de nuestro lexer para el analisis de codigo
// =========================================================
import { Lexer } from "./Lexer/Lexer.js";
// =========================================================
// Importacion de nuestro parser para el analisis de codigo
// =========================================================
import { Parser } from "./Paser/Parser.js";
// ============================================================
// Inicializacion de la app para el uso del servicio de express
// ============================================================
const app = express();
// =============================================================
// Definimos el puerto por el cual queremos que nuestra app este
// =============================================================
const PORT = 4000; 

app.use(express.json());
app.use(cors());

// ===================================
// Endpoint POST para analizar código
// ===================================
app.post("/analizar", (req, res) => {
  // =======================================================================
  // El cuerpo de la peticion si o si necesitar recibar codigo para analizar
  //========================================================================
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "No se envió código a analizar" });
  }

  // ============================================
  // Uso se try-catch para el manejo de errores
  // ============================================
  try {
    // ======= Uso del Lexer
    const lexer = new Lexer(code);
    const tokens = lexer.analizar();
    const errors = lexer.errors;

    // ======= Uso del parser
    const parser = new Parser(tokens);
    const parseResult = parser.analizar();

    return res.json({
      tokens,
      lexicalErrors: errors,
      syntaxErrors: parseResult.errors,
      pythonCode: parseResult.python,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno al analizar" });
  }
});


// ================
// Iniciar servidor
// ================
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});