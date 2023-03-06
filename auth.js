const express = require("express");
const cookieParser = require("cookie-parser");
const cors=require('cors')
const creareError=require('http-errors')
require("dotenv").config();

const app = express();
const db=require('./Helpers/config')
db.connect()


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:20617");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin:"*",
    exposedHeaders: 'Authorization'
}))

const authRoute = require("./Routes/User.router");

app.get("/", (req, res, next) => {
    res.writeHead(200);
    res.end("hello world\n");
});

app.use("/user", authRoute);


app.use((req,res,next)=>{
    next(creareError.NotFound("This route does not exist"))
})

app.use((err,req,res,next)=>{
    res.json({
        status:err.status || 500,
        message:err.message
    })
})

// var server = https.createServer({}, app);
const PORT = process.env.AUTH_PORT;
app.listen(PORT, () => {
    console.log(`Auth is running on https://localhost:${PORT}/`);
});