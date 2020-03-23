var TYPES = {
	ALPHA:0,
	NUMERIC:1,
	SPECIAL:2,
	ALPHANUMERIC:3,
	ALPHA_SPECIAL:4,
	NUMERIC_SPECIAL:5,
	ALPHA_NUMERIC_SPECIAL:6,
	BINARY: 7,

	FIXED: 8,
	VARIABLE: 9,
}

exports.model = function( app ){
	const mongoose = require('mongoose');
	const db = mongoose.createConnection('mongodb://localhost/isoEngine');
	
	const ObjectId = mongoose.Types.ObjectId;
	// const Date = mongoose.Types.Date;
		
	app.DB = {};
	app.DB.ObjectId = ObjectId;
	
	db.on('error', function(){
		console.error('Error establishing connection to mongodb');
		throw new Error('MongoDb connection error');
		process.exit(-1);
	});

	db.once('open', function () {
	 	console.info('Connection to mongodb established');

	 	const institutionSchema = new mongoose.Schema({
		    name    : String,
		    address :String,
		    email 	:String,
		    telephone:String,

		    host 	:String,
		    port 	:String,
		    header 	:String,

		    /*field 	:{
		    	id: String,
		    	name :String,
		    	value:String,
		    	size :Number,
		    	type :Number,
		    },*/
		    
		    /*service  :{
		    	name: String,
		    	fields: []
		    }*/
		    services :[],
		});

		const LogsSchema = new mongoose.Schema({
			"msgType": String,
			"processingCode": String,
			"transAmount": String,
			"transmissionDateTime": String,
			"systemTraceAuditNum": String,
			"localTime": String,
			"localDate": String,
			"settlementDate": String,
			"pointOfServiceEntryCode": String,
			"pointOfServiceConditionCode": String,
			"sendingMember": String,
			"retRefNumber": String,
			"cardAcceptorTerminalId": String,
			"cardAcceptorId": String,
			"cardAcceptorNameLocation": String,
			"additionalDataPrivate": String,
			"transCurrencyCode": String,
			"usrDefinedField": String,
			"serviceCode": String,
			"transRefNumber": String,
			"receivingMember": String,
			"senderAcc": String,
			"receiverAcc": String,
			"contentTransfers": String,
			"PAN": String,
			"MAC": String,
			"type": String,
			"referentId": ObjectId,
			"createdAt": {type:Number, default: new Date().getTime()}
		})
	 	
		app.DB.Institution = db.model('Institution', institutionSchema);
		app.DB.Logs = db.model('Logs', LogsSchema);
	});

}