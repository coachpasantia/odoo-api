export class ProductController{
    constructor(model){
        this._model = model;
    }
    async getAllProducts(){
        return await this._model.all();
    }
    getQueryProducts(query){
        return this._model.query(query);
    }
}