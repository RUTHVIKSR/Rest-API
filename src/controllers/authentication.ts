import express from "express";

import { getUserByEmail, createUser } from "../db/users";
import { random, authentication } from "helpers";

export const register = async (req: express.Request, res: express.Response) => {
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message : 'All fields are required'});
        }

        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.status(400).json({message : 'User already exists'});
        }

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication : {
                salt,
                password : authentication(salt, password),
            }
        });

        return res.status(201).json({message : 'User registered successfully', userId : user._id});

    }catch(error){
        return res.status(400).json({message : 'registration failed'});
    }
}