import CallRecord from "../models/callRecord.js";

export function parseLine(line){
    const parts = line.split(",");
    return new CallRecord(
        parseInt(parts[0]), // idOperador -> 1,2,3,4,5,6
        parts[1],           // nombreOperador -> "Juan", "Pedro", "Maria"
        parts[2].trim(),    // estrellas -> "5", "4", "3"
        parseInt(parts[3]), // idCliente -> 101, 102, 103
        parts[4] // nombreCliente -> "Juan Pérez", "Ana López", "Pedro Gómez"
    )
}