import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);
    const newUser = new User({ username, email, password:hashedpassword });

    try {
        await newUser.save();
        res.status(201).json({ message: 'New user created successfully.' });
    } catch (error) {
        // Handle the error, for example, send an error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
