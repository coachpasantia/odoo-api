import express from 'express';
import { response } from "../../response/response.js";
import { SaleRoutes } from "./Sale.routes.js";
import {SaleController} from "./Sale.ctrl.js";
import {SaleModel}from "./Sale.model.js";
import {pool} from "../../database/dbconnection.js";

export const saleModule = ()=> {
    const model = new SaleModel(pool);
    const controller = new SaleController(model);
    const saleRoutes = new SaleRoutes(express,controller,response)._router;
    return saleRoutes;
}