const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
const DB = "black_belt_Exam_DB";
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


// middleware
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({extended:true}));
// database connection link to file

require('./server/config/mongoose.config')(DB);
// const mongooseConnectionFunc = require('./config/mongoose.config');
// mongooseConnectionFunc(DB)

//require the dotenv library and invoke its config function
require('dotenv').config();

const myFirstSecret = process.env.SECRET_KEY;

console.log(myFirstSecret);

// connect the routes
require("./server/routes/routes")(app);


// start the server
app.listen(PORT, () => console.log(`Listening on port:${PORT}`)) 
