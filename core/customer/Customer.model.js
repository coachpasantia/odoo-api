export class CustomerModel{
    constructor(){}
    all(){
        return {"customers": "Todos los registros de clientes"};
    }
    query(query){
        return {"customers": "Registros filtrados", "query": query};
    }
}