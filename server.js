const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const companyRoutes = require('./routes/companyRoutes');
const jobpostingRoutes = require('./routes/jobpostingRoutes');
const path = require('path');
const cors = require('cors');


const app = express();

 const PORT= process.env.PORT || 4000;
//const PORT= 4000;

dotEnv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb connected successfully");
})
.catch((error)=>{
    console.log(error);
})

app.use(bodyParser.json())
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/jobposting', jobpostingRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})

// app.use('/', (req, res)=>{
//     res.send("<h1> Welcome to Walkin");
// })