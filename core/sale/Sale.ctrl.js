export class SaleController{
    constructor(model){
        this._model = model;
    }

    async getAllSales(){
        return  await this._model.all();
    }
    getQuerySales(query){
        return this._model.query(query);
    }
}