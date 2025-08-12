import readline from 'readline';
import { loadCallRecords } from './fileService.js';
import { mostrarHistorialConsola, generarReporteHTML } from './reportService.js';

export function startMenu(){

    let records = [];

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function showMenu(){
        console.log("\n--- Menú de Opciones ---");
        console.log("1. Cargar registros de llamadas");
        console.log("2. Mostrar registros en consola");
        console.log("3. Exportar registros en htmml");
        console.log("4. Salir");
        rl.question("Seleccione una opción: ", handleMenuOption);
    }

    function handleMenuOption(option){
        switch(option){
            case '1':
                records = loadCallRecords('./data/llamadas.txt');
                console.log("Registros cargados correctamente", records)
                break;
            case '2':
                mostrarHistorialConsola(records);
                break;
            case '3':
                generarReporteHTML(records);
                break;
            case '4':
                console.log("Saliendo del programa...");
                rl.close();
                return;
            default:
                console.log("Opción no válida. Intente de nuevo.");
        }
        showMenu();
    }
    showMenu();
}