import { useState } from "react";
import { apiService } from "./services/service";

function App() {
  const [code, setCode] = useState(`int numero = 10;`);
  const [tokens, setTokens] = useState([]);
  const [lexicalErrors, setLexicalErrors] = useState([]);
  const [syntaxErrors, setSyntaxErrors] = useState([]);
  const [pythonCode, setPythonCode] = useState("");

  const handleAnalizar = async () => {
    try {
      const { data } = await apiService.analyzer(code);
      setTokens(data.tokens);
      setLexicalErrors(data.lexicalErrors);
      setSyntaxErrors(data.syntaxErrors);
      setPythonCode(data.pythonCode);
    } catch (err) {
      alert("Error al analizar el código");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center max-w-5xl mx-auto space-y-2">
        <h1 className="text-white text-2xl font-bold text-center">
          Proyecto 2 — JavaBridge
        </h1>
        <p className="text-indigo-400 font-semibold">
          Lenguajes Formales y de Programación — Sección B-
        </p>
      </div>

      {/* TextArea de entrada */}
      <textarea
        className="w-full p-3 rounded bg-gray-800 text-white mt-6"
        rows="6"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* Botón */}
      <button
        onClick={handleAnalizar}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Analizar
      </button>

      {/* ====================== */}
      {/* Tabla de tokens */}
      {/* ====================== */}
      {tokens.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <h2 className="text-white text-xl mb-2">Tokens</h2>
          <table className="table-auto w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th>#</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Línea</th>
                <th>Columna</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((tok, index) => (
                <tr key={index} className="bg-gray-100 text-gray-900">
                  <td>{index}</td>
                  <td>{tok.type}</td>
                  <td>{tok.value}</td>
                  <td>{tok.line}</td>
                  <td>{tok.column}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ====================== */}
      {/* Errores Léxicos */}
      {/* ====================== */}
      {lexicalErrors.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <h2 className="text-red-400 text-xl font-bold mb-2">Errores Léxicos</h2>
          <table className="table-auto w-full border-collapse border border-red-700">
            <thead className="bg-red-800 text-white">
              <tr>
                <th>#</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Mensaje</th>
                <th>Línea</th>
                <th>Columna</th>
              </tr>
            </thead>
            <tbody>
              {lexicalErrors.map((err, index) => (
                <tr key={index} className="bg-red-100 text-red-900">
                  <td>{index}</td>
                  <td>{err.type}</td>
                  <td>{err.value}</td>
                  <td>{err.message}</td>
                  <td>{err.line}</td>
                  <td>{err.column}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ====================== */}
      {/* Errores Sintácticos */}
      {/* ====================== */}
      {syntaxErrors.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <h2 className="text-yellow-400 text-xl font-bold mb-2">Errores Sintácticos</h2>
          <table className="table-auto w-full border-collapse border border-yellow-700">
            <thead className="bg-yellow-800 text-white">
              <tr>
                <th>#</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Mensaje</th>
                <th>Línea</th>
                <th>Columna</th>
              </tr>
            </thead>
            <tbody>
              {syntaxErrors.map((err, index) => (
                <tr key={index} className="bg-yellow-100 text-yellow-900">
                  <td>{index}</td>
                  <td>{err.type}</td>
                  <td>{err.value}</td>
                  <td>{err.message}</td>
                  <td>{err.line}</td>
                  <td>{err.column}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ====================== */}
      {/* Traducción a Python */}
      {/* ====================== */}
      {pythonCode && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg text-white">
          <h2 className="text-green-400 text-xl font-bold mb-2">
            Traducción a Python
          </h2>
          <pre className="bg-gray-900 p-3 rounded text-green-300 overflow-auto">
            {pythonCode}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;