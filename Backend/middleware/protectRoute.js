import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	const token = req.header("Authorization")

    if(!token){
        return res.status(200).json({
            error : "No Tocken authorization denied"
        })
    }

    try{

        await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) =>{
            if(error){
                res.status(400).json({
                    error: "Token not valid"
                })

            }else{
                req.user = decoded.user
                next()
            }
        })

    }catch(error){
        console.log("Something went wrong with"+ error)
        res.json(500).json({
            error: "Server Error"
        })
    }
}

export default protectRoute;
