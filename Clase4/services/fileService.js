import fs from 'fs';
import { parseLine } from "../utils/parser.js"

export function loadCallRecords(filePath){
    try{
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split("\n");
        return lines.map(parseLine);
    }catch(error){
        console.log("Error al cargar los registros de llamadas:", error.message);
        return [];
    }
}