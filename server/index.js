import express from 'express';
import dotenv from 'dotenv';
import emailRoutes from './routes/emails';
dotenv.config();

// initialize express
const app = express();

// define port
const port = process.env.PORT || 8080;

// middlewares
app.use(express.json());

// router middlewares
app.use('/api', emailRoutes);

// start server
app.listen(port, () => {
    console.log(`port ready and running on ${port}`)
})
