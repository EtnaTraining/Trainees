var Promise = require('Promise');
//enter your DSP URI , without the trailing /
var BASE_PATH = "http://localhost:8080";
var END_POINT = "/rest";
//enter the app_name from the app you created to use with titanium
var APP_KEY = "Trainees";
var SESSION_ID = "";

exports.isLoggedIn = function() {
	//SESSION_ID = Ti.App.Properties.getString("session", "");
	if (SESSION_ID) {
		return true;
	} else {
		return false;
	}
};

exports.login = function(username, passwd, _cb) {
	var body = {email:username , password : passwd};
        body = JSON.stringify(body);
        exports.makeRequest("post","/user/session", body).then(function(response) {
            SESSION_ID = response.session_id;
            Ti.App.Properties.setString("session", SESSION_ID);
            _cb(true);
        }, function(error){
            Ti.API.info(error.responseText);
            _cb(false, error.responseText);
        });
};


exports.makeRequest = function(method, path, body) {
    var promise = Promise.defer();
    var url = BASE_PATH + END_POINT + path;
    var client = Titanium.Network.createHTTPClient();
    client.onload = function() {
        try {
        	Ti.API.info("data returned:");
        	Ti.API.info(this.responseText);
            var data = JSON.parse(this.responseText);
            promise.resolve(data);

        } catch (e) {
            promise.reject(e);
        }
    };
    client.onerror = function() {
    	
        promise.reject(this);
    };

    client.open(method, url);
    client.setRequestHeader("X-DREAMFACTORY-APPLICATION-NAME", APP_KEY);
    client.setRequestHeader("X-DREAMFACTORY-SESSION-TOKEN", SESSION_ID);
    Ti.API.info(url);
    Ti.API.info(body);
    client.send(body);

    return promise;
};