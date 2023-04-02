const socketIO = require("socket.io");
const redis = require('../Services/redis')
module.exports = (server) => {
  const io = socketIO(server,{
    cors: {
        origin: process.env.CLIENT_HOST,
        method: ['GET', 'POST'],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },      
  });
  const roomFormat=(id1,id2)=>{
    return id1<id2?id1+id2:id2+id1
  }


  io.on('connection',(socket)=>{
    
    console.log('A client connected with id ',socket.id);

    socket.on('joinRoom',async(room)=>{
        console.log(socket.id ," join room ",room)
        
        socket.join(room)
    })
    socket.on('leaveRoom',async(key)=>{
        console.log(socket.id," leave room ", key)
        socket.leave(key)
    })
    socket.on("notifyMessage",async(data)=>{
        //gửi đến thông báo
        const name=data.name
        const str=await redis.get(data.receiver)
        const listNotifications=JSON.parse(str)?JSON.parse(str):[]
        listNotifications.push({
            name:name,
            sender:data.sender,
            type:"message",
            avatar:data.avatar
        })
        socket.nsp.in(data.receiver).emit("notifyMessage",{listNotifications})
        redis.set(data.receiver,JSON.stringify(listNotifications))
    })
    socket.on("message", async(data)=>{
        // gửi đến chat
        const room=roomFormat(data.sender,data.receiver)
        const string= await redis.get(room)
        const listMessages=JSON.parse(string)?JSON.parse(string):[]
        listMessages.push({
            message:data.message,
            sender:data.sender,
            receiver:data.receiver,
        }) 
        socket.nsp.in(room).emit("message",{listMessages})
        redis.set(room,JSON.stringify(listMessages))
    })

    socket.on('disconnect', () => {
        console.log(`A client with id ${socket.id} disconnected`);
    });
})
};