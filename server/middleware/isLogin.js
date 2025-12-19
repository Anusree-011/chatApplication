import express from "express"
import User from "../models/userModels.js"
import * as jwt from 'jsonwebtoken';


const isLogin = (req,res,next)=>{
    try{
        console.log(req.cookies.jwt); 
        const token = req.cookies.jwt;
        console.log(token)
        if(!token)
            return res.status(500).send({success:false, message: "unauthorized"})
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            if(!decode)
                return res.status(500).send({success:false, message: "User unauthorized- Invalid Token"}

                )
            const user= user.findById(decode.userId).select("-password");
            if(!user) return res.status(500).send({success:false, message: "User not found"})
            req.user= user,
            next()

    }catch(error){
        console.log(`Error in isLogin middleware ${error.message})`);
        res.status(500).send({
            success:false,
            message: error
        })

    }
}
export default isLogin;