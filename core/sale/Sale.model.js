export class SaleModel{
    constructor(pool){
        this._pool = pool;
    }

    async all(){
        const queryVenta ="select name,sum(price_total) from sale_order_line group by name"
        let allSales = await this._pool.query(queryVenta) 
        return allSales;
    }

    async query(query){
        if(query.option==="totalventa"){
            const totalVenta ="select name,sum(price_total) from sale_order_line group by name"
            let allSales = await this._pool.query(totalVenta) 
            return allSales.rows;
        } 
        if(query.option==="productocantidad"){
            const productoCantidad ="select name, sum(product_uom_qty) from sale_order_line group by name";
            let allProducto = await this._pool.query(productoCantidad)
            return allProducto.rows;
        }
        if(query.option==="fechacantidad"){
            const fechaCantidad ="select to_char(create_date, ('dd-MM-yyyy')), sum(price_total) from sale_order_line group by to_char(create_date, ('dd-MM-yyyy'))";
            let allProductofecha = await this._pool.query(fechaCantidad)
            return allProductofecha.rows;
        }

    }
}