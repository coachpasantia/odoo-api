export class CustomerRouter{
    constructor(express,controller,response){
        this._router = express.Router();
        this._ctrl = controller;
        this._res = response;
        this.registerRoutes();
    }
    registerRoutes(){
        this._router.get('/',this.handlerCustomer.bind(this));
    }
    async handlerCustomer(req,res){
        if(Object.keys(req.query).length === 0){
            try {
                let result = await this._ctrl.getAllCustomers();
                this._res.success(req,res,result,200);
            } catch (error) {
                this._res.error(req,res,error,500);
            }
        }else{
            try {
                let resultQuery = await this._ctrl.getQueryCustomers(req.query);
                this._res.success(req,res,resultQuery,200);
            } catch (error) {
                this._res.error(req,res,error,500);
            }
        }
    }

}