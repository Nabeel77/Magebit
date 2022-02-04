import express from 'express';
import dotenv from 'dotenv';
import emailRoutes from './routes/emails';
import path from 'path';
dotenv.config();

// initialize express
const app = express();

// define port
const port = process.env.PORT || 8080;


// middlewares
app.use(express.json());

// router middlewares
app.use('/api', emailRoutes);

const root = require('path').join(__dirname, '../client/build');
app.use(express.static(root));

//for react routing
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// start server
app.listen(port, () => {
    console.log(`port ready and running on ${port}`)
})
