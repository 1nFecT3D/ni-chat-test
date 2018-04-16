var JsonDB = require('node-json-db');
var db = new JsonDB("myDataBase", true, false);

function validateNameInDB(name) {
    try {
        db.getData("/log/" + name); 
        return db.getData("/log/" + name);
    } catch(e) {    	
    	if(e.name === "DataError"){
    		return "There is a data error Can\'t find entry for: " + name + ". Check if the name given is correct"
    	} else if (e.name === "DatabaseError") {
    		return "There is a data base error, something is wrong with the data base"
    	}        
    }
}

function showLog() {
    return db.getData("/");
}

function showLogForName(name) {
    var result = {
        user: name,
        messages: validateNameInDB(name)
    };    
    return result;
}

function addMessage(message) {
    var name = message.user;
    var logObject = {};
    logObject[name] = [message.message];
    db.push("/log", logObject, false);
}

module.exports = {    
    showLog: showLog,
    addMessage: addMessage,
    showLogForName: showLogForName
}