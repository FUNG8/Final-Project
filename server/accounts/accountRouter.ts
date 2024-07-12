import { Router,Request,Response } from "express";


export const accountRouter = Router();

// accountRouter.post("/signUp", signUp);
accountRouter.post("/logIn", login);
// accountRouter.post("/logOut", logout);

async function login(req:Request,res:Response) {
    
}