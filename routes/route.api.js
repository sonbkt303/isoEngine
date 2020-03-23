/* All in coming api calls are processed here*/
var IsoProcessor  =  require('../misc/iso.processor.js');

const net = require('net');
const Networker = require('./networker');
var client  = new net.Socket();


//services available on system
const SERVICES = {
	BALANCE_ENQUIRY			: '432020',
	DEPOSIT 				: '0100000',
	CHEQUE_BOOK_REQUEST		: '200000',
};

//defining a unified structure for all api calls
var API = {
	service:'',
	field1:'',
	field2:'',
	field3:'',
}

// defined errror messages
var ERROR = {

}


//main api handler procedure
exports.api = function( app ){
	app.post('/api.iso', async function apiHandler( req, res ){
		// var o = {status: false, message:'error', data:''};
		try{
			//switch for all cases//
			//get and parse json inputs
			// try{
			// 	//first of all decrypt message//
			// 	var ajson = JSON.parse( req.body );
			// }catch( err ){
			// 	console.error('Input JSON parse error');
			// 	console.dir( err );
			// 	o.message = 'Input JSON parse error';
			// 	res.json(o);
			// }

			//If parsing came through but json object is empty//
			// if( !ajson ) throw new Error('JSON input not specified');

			//isoprocessor options//

			let txn  = req.body; // transaction
			
			switch( txn.processingCode ){
				case SERVICES.BALANCE_ENQUIRY:

					const sendCode = txn.msgType + txn.processingCode;

					req.body.type = "request";
					// req.body.createdAt = new Date().unix();

					const logs = new app.DB.Logs(req.body);
					await logs.save();


					// let socket = net.createConnection({ port: 1234, host: '192.168.100.9' });
					// // socket.on('data', (data) => {
					// // 	console.log(data);
					// // })

					// socket.on('connect', () => {
					// 	console.log('12312');
					// 	let networker = new Networker(socket, (data) => {
					// 		console.log('received:', data.toString());
					// 	});
					// 	// networker._onData(data => {
					// 	// 	console.log('asds', data)
					// 	// })
					// 	networker.init();
					// 	networker.send('Hi Server asds!');
					// });


					// console.log(server);
					// net.sendVan();

					// console.log(socket);
					// socket.write('Data ::' + 'hello world 200 !');
					client.connect({
						host:'192.168.100.9',
						port:1234
					});
					client.on('connect',function(){
						console.log('Client: connection established with server');
					
						console.log('---------client details -----------------');
						var address = client.address();
						var port = address.port;
						var family = address.family;
						var ipaddr = address.address;
						console.log('Client is listening at port' + port);
						console.log('Client ip :' + ipaddr);
						console.log('Client is IP4/IP6 : ' + family);
					
					
						// writing data to server
						client.write(sendCode);
					});

					client.setEncoding('utf8');

					client.on('data',function(data){
						// console.log('Data from server:' + data);
						console.log(a);

					});

					break;

				case txn.DEPOSIT:
					break;

				case txn.CHECK_BOOK_REQUEST:
					break;
				default:{
					console.error('Unknown service requested.');
					break;
				}
			}

			res.send('OK');
			//get port and host of particular institution being called//
			// var PORT = 8080;
			// var HOST = '127.0.0.1';
			// var isoProcessor = new IsoProcessor(PORT,HOST,options);
			// isoProcessor.on('connect', function(){
			// 	console.log('Connected in main function');
			// });

			// isoProcessor.on('data', function(err, data){
			// 	console.info('Returning client api caller');
			// 	o.status = true;
			// 	o.message = 'All Ok';
			// 	res.send('OK');
			// 	// res.json(o);
			// });

			
		}catch( error ){
			console.error('api.iso.json error');
			console.dir( error );
			// res.json(o);
			res.send(error);
		}
	});
};





