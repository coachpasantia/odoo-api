import express from 'express';
import { response } from "../../response/response.js";

import { CustomerRouter } from "./Customer.routes.js";
import { CustomerController } from './Customer.ctrl.js';
import { CustomerModel } from './Customer.model.js';
import {pool} from '../../database/dbconnection.js';

export const customerModule = ()=> {
    const model = new CustomerModel(pool);
    const controller = new CustomerController(model);
    const customerRoutes = new CustomerRouter(express,controller,response)._router;
    return customerRoutes;
}