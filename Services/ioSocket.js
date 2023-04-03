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

    // use for notifying new Comment to post also
    socket.on("notifyMessage",async(data)=>{
        //gửi đến thông báo
        if(data.receiver && data.sender ){
            const name=data.name

            // list notifications
            /*
                [
                    {sender: , name: , avatar: , type:  }
                    // type : "meesage" or "comment"
                ] 
             */
            const str=await redis.get(data.receiver)
            let listNotifications=JSON.parse(str)?JSON.parse(str):[]
            
            // number of notifications to reciever
            /*
                [
                    {sender: , type: },
                ]
            */ 
           const numberStr = await redis.get(`numberNotify${data.receiver}`)
           let numberNotify = JSON.parse(numberStr)?JSON.parse(numberStr):[]
           
           //Filter array
            for (let i= 0; i < numberNotify.length;i++){
                if(numberNotify[i].sender===data.sender 
                    && numberNotify[i].type===data.type)
                {
                    numberNotify.splice(i,1)
                    break;
                }
            }

            for (let i =0 ; i< listNotifications.length;i++) {
                if (listNotifications[i].sender===data.sender &&
                    listNotifications[i].type===data.type
                    ){
                    listNotifications.splice(i,1)
                    break;
                }
            }
            listNotifications.push({
                name:name,
                sender:data.sender,
                type:data.type,
                avatar:data.avatar,
                product:data.product?data.product:""
            })
            numberNotify.push({
                sender:data.sender,
                type:data.type
            })
            listNotifications=listNotifications.reverse()
            socket.nsp.in(data.receiver).emit("notifyMessage",{listNotifications})
            redis.set(data.receiver,JSON.stringify(listNotifications))
            redis.set(`numberNotify${data.receiver}`,JSON.stringify(numberNotify))
        }
    })
    socket.on("message", async(data)=>{
        if(data.message && data.receiver) {
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
        }

    })

    socket.on('disconnect', () => {
        console.log(`A client with id ${socket.id} disconnected`);
    });
})
};