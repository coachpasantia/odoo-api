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
    async query(query){
        switch(query.option){
            case '1':
                const proxcatg = "SELECT pc.name, COUNT(pt.id) FROM product_category pc JOIN product_template pt ON(pc.id = pt.categ_id) GROUP BY pc.name";
                const allProducts = await this._pool.query(proxcatg);
                return allProducts.rows;  
        }
    }
}