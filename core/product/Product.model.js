export class ProductModel{
    constructor(pool){
        this._pool = pool;
    }
    
    async all(){
        const querySelect = "SELECT * FROM product_template LIMIT 100";
        const allProducts = await this._pool.query(querySelect);
        return allProducts;
        //return {"products": "Todos los registros de productos"};
    }
    query(query){
        return {"products": "Registros filtrados", "query": query};
    }
}