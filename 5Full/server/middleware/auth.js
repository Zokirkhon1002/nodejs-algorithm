// @ts-nocheck
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();


const auth = (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            state: false,
            msg: err,
            data: false,
          });  
    }
}

export {
    auth
  };