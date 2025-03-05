// import bcrypt from 'bcrypt';
// import UserModel from '../Model/UserModel.js';
// import { JsonWebTokenError } from 'jsonwebtoken';

// export const Register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if email already exists
//         const user = await UserModel.findOne({ where: { email } });

//         if (user) {
//             return res.status(400).json({ message: 'Email already exists' });
//         }

//         // Hash the password before storing
//         const hashPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = await UserModel.create({ name, email, password: hashPassword });

//         res.status(201).json({ message: 'User Registered Successfully', user: newUser });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// };

// export const Login = async (req, res) => {
//     try {
//         const { email, password} = req.body;
//         //find the user is Exist
//         const user = await UserModel.findOne({ where: { email }})
//         if(!user){
//             return res.status(400).json({ message: 'Email not found' });
//         }
//         // Compare the password
//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if(!isValidPassword){
//             return res.status(400).json({ message: "Invalid credentials"}); 
//         }
//         // Generate JWT token
//         const token = JsonWebTokenError.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

//         res.status(200).json({ message: "Login successful", token });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// }


import bcrypt from 'bcrypt';
import UserModel from '../Model/UserModel.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "YOUR_SECRET_KEY"; // Ensure JWT_SECRET is defined

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const user = await UserModel.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password before storing
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await UserModel.create({ name, email, password: hashPassword });

        res.status(201).json({ message: 'User Registered Successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

        // Compare the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
