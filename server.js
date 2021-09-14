
// Load node modules and initial variables
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//
const path = require('path');
const startFilepath = '/public/start.html';
const port = 3000;

//Get script functions
const {
    getReport,
    getSeatInfo,
    getUserInfo,
    getReportInfo
} = require('./licenseReport/getLicenseReport');

//Set up public folder for static path
app.use(express.static(path.join(__dirname,'public')));

//respond the connecting user with start page
app.get('/', function(req, res){
    res.sendFile(__dirname + startFilepath)
});

//Server actions (io.emit= To everyone, socket.emit= To user itself, socket.broadcast.emit= To everyone but user itself )
io.on('connection', (socket) => {
    socket.on('user-report',()=>{
        let report = getReport();
        console.log(report);
        console.log(getReportInfo(report));
        socket.emit('report-message',getReportInfo());
        
    });


});

// Set up server to listen on the port
server.listen(port,function () {console.log(`Server is listening on port ${port}`)});


