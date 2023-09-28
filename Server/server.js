const http = require('http')
const express = require('express');
const app = express();
const server = http.createServer(app)
const io = require('socket.io')(server,{
    cors:{
        origin:"*",
    }
})
import connectDB from './dbConnection/index'
import configureExpressApp from './config';
import applyRoutes from './routes/index'
// configuring our App 
configureExpressApp(app);
applyRoutes(app);
app.use(express.static('public'))
app.get('/',(req,res)=>{res.render('index')})
const PORT = 3001;

io.on('connection',(socket)=>{
    console.log("Socket connection Started:",socket.id);

    socket.on('join_room',(data)=>{
        console.log("Joined room :",data);
        socket.join(data);
        console.log('User Joined Room '+ data)
    })
    socket.on('message',(data)=>{
        console.log("data recieved:",data);
        socket.broadcast.to(data.room).emit("msg_rcv",data.msg);
    })
    socket.on('disconnect-me',()=>{
        console.log("USER Disconnected")
    })
})

Promise.all([connectDB()]).then(()=>{
    server.listen(PORT,()=>{console.log("Server Started at http://localhost:3001");});
});
