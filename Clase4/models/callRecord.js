export default class CallRecord{
    constructor(idOperador, nombreOperador, estrellas, idCliente, nombreCliente){
        this.idOperador = idOperador;
        this.nombreOperador = nombreOperador;
        this.estrellas = estrellas;
        this.idCliente = idCliente;
        this.nombreCliente = nombreCliente;
    }
}


// 1. Primera Forma -> varias clases
// export class CallRecord{}

// import { CallRecord } from "../models/callRecord.js";

// 2. Segunda Forma -> una sola clase
// export default class CallRecord{}

// import CallRecord from "../models/callRecord.js";