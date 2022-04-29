import express from 'express';
import { response } from "../../response/response.js";
import { ProductRoute } from "./Product.routes.js";
import { ProductController } from './Product.ctrl.js';
import { ProductModel } from './Product.model.js';
import {pool} from '../../database/dbconnection.js';

export const productModule = ()=> {
    const model = new ProductModel(pool);
    const controller = new ProductController(model);
    const productRoutes = new ProductRoute(express,controller,response)._router;
    return productRoutes;
}