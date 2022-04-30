export class CustomerController{
    constructor(model){
        this._model = model;
    }

    async getAllCustomers(){
        return await this._model.all();
    }

    async getQueryCustomers(query){
        return await this._model.query(query);
    }
} 