const express = require('express');
const connectDB = require('./config/db');
var bodyParser = require('body-parser');
const PORT = 5000;
const app = express();

//Connect to database
connectDB();

//Middlewares
app.use(express.json({ extended:false }));
app.use(bodyParser.json())

//Defining routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

//Starting Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));