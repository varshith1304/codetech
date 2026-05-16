const express=require("express");

const app=express();

const http=require("http").createServer(app);

const io=require("socket.io")(http);


app.get("/",(req,res)=>{

res.send(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width,initial-scale=1">

<title>Real Time Chat App</title>

<style>

body{

font-family:Arial;
background:#f0f2f5;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
margin:0;

}

.container{

width:400px;
background:white;
padding:20px;
border-radius:15px;
box-shadow:0 0 10px rgba(0,0,0,.2);

}

h2{

text-align:center;

}

#messages{

height:300px;
overflow-y:auto;
border:1px solid #ccc;
padding:10px;
margin-bottom:10px;

}

.message{

background:#d9ecff;
padding:8px;
margin:5px;
border-radius:8px;

}

.inputArea{

display:flex;
gap:10px;

}

input{

flex:1;
padding:10px;

}

button{

padding:10px;
background:#007bff;
color:white;
border:none;
cursor:pointer;

}

</style>

</head>

<body>

<div class="container">

<h2>Live Chat App</h2>

<div id="messages"></div>

<div class="inputArea">

<input
id="msg"
placeholder="Type message">

<button onclick="sendMessage()">

Send

</button>

</div>

</div>

<script src="/socket.io/socket.io.js">
</script>

<script>

const socket=io();

function sendMessage(){

let input=
document.getElementById("msg");

if(input.value.trim()!=""){

socket.emit(
"chat message",
input.value
);

input.value="";

}

}

socket.on(
"chat message",
(msg)=>{

let div=
document.createElement("div");

div.className=
"message";

div.innerText=msg;

document
.getElementById("messages")
.appendChild(div);

});

</script>

</body>

</html>

`);

});


io.on("connection",(socket)=>{

console.log("User connected");

socket.on(
"chat message",
(msg)=>{

io.emit(
"chat message",
msg
);

});

socket.on(
"disconnect",
()=>{

console.log(
"User disconnected"
);

});

});


http.listen(
3000,
()=>{

console.log(
"Server running at http://localhost:3000"
);

});




npm init -y
npm install express socket.io