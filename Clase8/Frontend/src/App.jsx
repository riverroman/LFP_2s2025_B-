import { use, useState } from "react";
import { apiService } from "./services/service";

function App() {
  const [code, setCode] = useState(`int numero = 10;`);
  const [tokens, setTokens] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleAnalizar = async () => {
    try {
      const {data} = await apiService.analyzer(code);
      setTokens(data.tokens);
      setErrors(data.errors);
    } catch (err) {
      alert("Error al analizar el código");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center max-w-5xl mx-auto space-y-2">
        <h1 className="text-white text-2xl font-bold text-center">
          Prototipo Proyecto 2
        </h1>
        <p className="text-indigo-500 mb-2 font-bold">
          Lenguajes Formales y De Programacion B-
        </p>
      </div>
      {/* TextArea para el código */}
      <textarea
        className="w-full p-3 rounded bg-gray-800 text-white"
        rows="6"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* Botón para analizar */}
      <button
        onClick={handleAnalizar}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Analizar
      </button>
      {/* Tabla de tokens */}
      {tokens.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-700 px-4 py-2">#</th>
                <th className="border border-gray-700 px-4 py-2">Tipo</th>
                <th className="border border-gray-700 px-4 py-2">Valor</th>
                <th className="border border-gray-700 px-4 py-2">Línea</th>
                <th className="border border-gray-700 px-4 py-2">Columna</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((tok, index) => (
                <tr key={index} className="bg-gray-100 text-gray-900">
                  <td className="border border-gray-700 px-4 py-2">{index}</td>
                  <td className="border border-gray-700 px-4 py-2">{tok.type}</td>
                  <td className="border border-gray-700 px-4 py-2">{tok.value}</td>
                  <td className="border border-gray-700 px-4 py-2">{tok.line}</td>
                  <td className="border border-gray-700 px-4 py-2">{tok.column}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Tabla de errores */}
    {errors.length > 0 && (
      <div className="overflow-x-auto mt-6">
        <h2 className="text-red-400 text-xl font-bold mb-2">Errores Léxicos</h2>
        <table className="table-auto w-full border-collapse border border-red-700">
          <thead>
            <tr className="bg-red-800 text-white">
              <th className="border border-red-700 px-4 py-2">#</th>
              <th className="border border-red-700 px-4 py-2">Tipo</th>
              <th className="border border-red-700 px-4 py-2">Valor</th>
              <th className="border border-red-700 px-4 py-2">Descripción</th>
              <th className="border border-red-700 px-4 py-2">Línea</th>
              <th className="border border-red-700 px-4 py-2">Columna</th>
            </tr>
          </thead>
        <tbody>
              {errors.map((err, index) => (
                <tr key={index} className="bg-red-100 text-red-900">
                  <td className="border border-red-700 px-4 py-2">{index}</td>
                  <td className="border border-red-700 px-4 py-2">{err.type}</td>
                  <td className="border border-red-700 px-4 py-2">{err.value}</td>
                  <td className="border border-red-700 px-4 py-2">{err.message}</td>
                  <td className="border border-red-700 px-4 py-2">{err.line}</td>
                  <td className="border border-red-700 px-4 py-2">{err.column}</td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default App;