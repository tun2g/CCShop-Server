const socketIO = require("socket.io");

module.exports = (server) => {
  const io = socketIO(server,{
    cors: {
        origin: process.env.CLIENT_HOST,
        method: ['GET', 'POST'],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

  io.on('connection',(socket)=>{
    
    console.log('A client connected with id ',socket.id);

    socket.on('joinRoom',async(key)=>{
        console.log(socket.id ," join room ",key)
        socket.join(key)
    })
    socket.on('leaveRoom',async(key)=>{
        console.log(socket.id," leave room ", key)
        socket.leave(key)
    })

    socket.on("message",(message)=>{
        socket.in('aaa').emit("message",message)
    })

    socket.on('disconnect', () => {
        console.log(`A client with id ${socket.id} disconnected`);
    });
})
};