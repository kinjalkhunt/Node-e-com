import express from 'express';
import bodyparser from 'body-parser';
import { Login, Register } from './Controller/UserController.js';

const app = express();
app.use(bodyparser.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/register', Register)
app.post('/login',Login)

const port = process.env.PORT || 8000;
app.listen(port, (req, res) => {
    console.log(`Server is Running On Port ---> ${port}`);
})

export default app;


// import express from "express"
// import dotenv from 'dotenv'

// dotenv.config();

// const app = express()
// const port = process.env.PORT
// app.listen(port, (req,res) => {
//     console.log(`the server is running on Port ${port}`);
// })