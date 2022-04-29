export class CustomerController{
    constructor(model){
        this._model = model;
    }

    getAllCustomers(){
        return this._model.all();
    }

    getQueryCustomers(query){
        return this._model.query(query);
    }
} 