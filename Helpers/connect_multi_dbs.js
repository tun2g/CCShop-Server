const mongoose=require('mongoose');


function newConnect(uri){
    const conn=mongoose.createConnection(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });

    conn.on('connected',function(){
        console.log(`Connected ${this.name}`);
    }) 

    conn.on('disconnected',function(){
        console.log(`Disconnected ${this.name}`);
    })

    conn.on('error',function(){
        console.log(`Error to connect ${JSON.stringify(console.error())}`);
    })
    return conn
}

const testConnection=newConnect(process.env.TEST_DB_URI)
const userConnection=newConnect(process.env.USER_DB_URI)


module.exports={
    testConnection,
    userConnection
}