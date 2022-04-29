export class ProductRoute{
    constructor(express,controller,response){
        this._router = express.Router();
        this._ctrl = controller;
        this._res = response;
        this.registerRoutes();
    }

    registerRoutes(){
        this._router.get('/',this.handleProduct.bind(this))
    }

    async handleProduct(req,res){
        if(Object.keys(req.query).length === 0){
            try {
                let result = await this._ctrl.getAllProducts();
                console.log(result);  
                this._res.success(req,res,result,200);    
            } catch (error) {
                this._res.error(req,res,error,500);
            }
        }else{
            try {
                let resultQuery = await this._ctrl.getQueryProducts(req.query);
                this._res.success(req,res,resultQuery,200);
            } catch (error) {
                this._res.error(req,res,error,500);
            }
        }
    }

}