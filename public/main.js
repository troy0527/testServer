const socket = io();
const msgReport = document.getElementById('report-text');


//msg from server
socket.on('user-report', (msg) => {
    appendMessage(msg);
});

function appendMessage(text) {
    const div = document.createElement('div');
    
    div.innerText = text;
    msgReport.append(div);
    // const msgPos=div.scrollHeight;
    // window.scrollTo(0,msgPos);
};