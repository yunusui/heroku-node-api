const express = require('express');

const listingRoute = require('./routes/listing');

const userRoutes = require('./routes/user');
const cors = require('cors')

const app = express();
app.use(cors());


const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config();
mongoose.connect(process.env.DB_connect_mongoDB,
    {useUnifiedTopology: true , useNewUrlParser: true },
    ()=> console.log('connected to Mongo DB') );

    app.use(express.json());

app.use('/api/listings', listingRoute );

app.use('/api/user', userRoutes )

app.listen(4001,()=> console.log('server running on port 4001!') )