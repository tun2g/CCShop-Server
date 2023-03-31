const express = require("express");
const cookieParser = require("cookie-parser");
const cors=require('cors')
const bodyParser=require('body-parser')
const creareError=require('http-errors')
const helmet=require('helmet')
const http = require('http')
const socket = require('./Services/ioSocket')

require("dotenv").config();


// Route
const JWTRoute=require('./Routes/JWT.router')
const shopRoute=require('./Routes/Shop.router')
const veryfyRoute=require('./Routes/Nodemailer.router')
const authRoute = require("./Routes/User.router");
const redisRoute=require('./Routes/Redis.router');


const app = express();

const server=http.createServer(app)
socket(server)


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

app.use(helmet())
app.use(cors({
    origin:process.env.CLIENT_HOST,
    exposedHeaders: 'Authorization',
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.get("/", (req, res, next) => {
    res.writeHead(200);
    res.end("hello world\n");
});
app.use("/refresh",JWTRoute)
app.use("/user", authRoute);
app.use("/redis",redisRoute)
app.use("/verify",veryfyRoute)
app.use("/shop",shopRoute)
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

server.listen(PORT, () => {
    console.log(`Auth is running on https://localhost:${PORT}/`);
});
