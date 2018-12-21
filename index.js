var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var fs = require('fs');
//Configure Express to Recieve JSON and extended URLencoded formats
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var handler = require('./handler');

var keywords = ['Machine Learning', 'Tensorflow', 'Facial Recognition', 'Augmented Reality', 'Vuforia', 'Virtual Reality', 'Chatbots', 'Voicebots', 'Cloud Computing', 'Extended Reality', 'Unity'];

io.set('origins','*:*');
io.on('connection', function(socket){
	socket.on('chat', function(msg){
		//console.log(JSON.stringify(msg));
		//console.log('Message with Flag : ',msg.message, msg.flag);
		if(msg.flag==1){
			console.log('Do NLP');

			handler.PorterStemmer(msg.message.toLowerCase(), keywords, msg.flag, (err, result) => {
				console.log('Words : ', result);
		
				io.emit('chat', {
					id:socket.userId,
					msg:msg.message,
					keywords:result
				});
			});
		}
		else{
			console.log('Message : ', msg.message);
			io.emit('chat', {
                                        id:socket.userId,
                                        msg:msg.message,
					keywords:[]
             	        });
		}
	});
});

http.listen(port, function(){
	console.log("Express server listening at PORT : ", port);
});
