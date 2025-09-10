require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_assignment');


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
