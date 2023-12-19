import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);
    const newUser = new User({ username, email, password:hashedpassword });

    try {
        await newUser.save();
        res.status(201).json({ message: 'New user created successfully.' });
    } catch (error) {
        // Handle the error, for example, send an error response
        next(error)
    }
};
export const signin = async (req, res,next) => {
    const { username, password } = req.body;
    try {
        const validuser= await User.findOne({username});
        if(!validuser){
            return next(errorHandler(404,'User not found!!!'))
        }
        const validpassword= bcryptjs.compareSync(password,validuser.password);
        if(!validpassword){
            return next(errorHandler(401,'Wrong Credentials'))
        }
        const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=validuser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    } catch (error) {
        next(error)
    }
};
