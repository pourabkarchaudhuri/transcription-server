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
var mailer = require('./mailer');

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

app.post('/mail', function (req, res) {
	// console.log("Event : " + JSON.stringify(req.body))
	let fname = req.body.title.replace(/ /g,"_") + '.txt';
	let fpath = './transcripts/'+fname;
	fs.writeFile(fpath, req.body.payload, (err) => {  
		// throws an error, you could also catch it here
		if (err){
			res.status(500).json({
				error: true,
				message: err
			})
		}	
		// success case, the file was saved
		console.log('Transcript saved!');
		    mailer.Mailer(req.body.to, req.body.title, fname, fpath, (error, result)=>{
			console.log(result);
			if(error){
				res.status(500).json({
					error: true,
					message: error
				})
			}
			else{
				res.status(200).json({
					error: false,
					message: result
					
				})
			}
		})
	});



})

http.listen(port, function(){
	console.log("Express server listening at PORT : ", port);
});
