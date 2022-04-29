import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {saleModule } from './sale/index.js';
import {productModule } from "./product/index.js";
import {customerModule} from "./customer/index.js";


import {fileURLToPath} from "url";
import {dirname,join} from "path";

export class Server{
    constructor(config){
        this._app = express();
        this._pathPublic = '../public';
        this._name = config.name;
        this._port = config.port;
        this._hostName = config.hostName;
        this._dirname = dirname(fileURLToPath(import.meta.url));
        this.initMiddlewares();
        this.setRoutes();
    }
    initMiddlewares(){
        this._app.use(morgan('dev'));
        this._app.use(cors());
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended:false}));
        this._app.use(express.static(join(this._dirname,this._pathPublic)));
    }
    
    setRoutes(){
        this._app.use('/api/v1/cliente',customerModule());
        this._app.use('/api/v1/producto',productModule());
        this._app.use('/api/v1/venta',saleModule());
    }
    start(){
        try {
          this._app.set('trust proxy', this._hostName);
          this._app.listen(this._port,()=>{
              console.log(`Server of ${this._name} running at http://${this._hostName}:${this._port}`)
          }) 
        } catch (error) {
            console.log(error);
        }
    }
}