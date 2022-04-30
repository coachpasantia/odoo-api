export class CustomerModel{
    constructor(pool){
        this._pool = pool;
    }
    all(){
        return {"customers": "Todos los registros de clientes"};
    }
    async query(query){

        switch(query.option){
            case "1":
               const query1 = 'SELECT   id, name,  create_date, company_id FROM res_partner ORDER BY id, name, create_date';
               let result = await this._pool.query(query1);     
               return result.rows          
            case "2":
                const query2 = 'SELECT * FROM res_partner ORDER BY id ASC LIMIT 20';
                let result2 = await this._pool.query(query2)
                return result2.rows
            case "3":
                const query3 = 'SELECT email, city, industry_id FROM res_partner';
                let result3 = await this._pool.query(query3)
                return result3.rows
            case "4":
                const query4 = 'SELECT purchase_warn, customer_rank FROM res_partner';
                let result4 = await this._pool.query(query4)
                return result4.rows
            case "5":
                const query5 = 'SELECT name, supplier_rank FROM res_partner';
                let result5 = await this._pool.query(query5)
                return result5.rows
        }
    }
}