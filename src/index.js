import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import propertyRoute from './propertyRoute.js';

const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect('mongodb+srv://adityanikam481:YQb7ocD461hqbMUt@cluster0.6clgv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { dbName: 'restsureDB' })

app.get('/propertyRoute', propertyRoute);


app.get('/', (req, res) => {
    res.send('Hello....!');
})

app.listen(3000, () => {
    console.log('backend stated on PORT 3000');
})