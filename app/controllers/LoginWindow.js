var args = arguments[0] || {};

var dreamfactory = require('dreamfactory');


function login() {
	var username = $.username.value;
	var passwd = $.password.value;
	dreamfactory.login(username, passwd, function(success, error) {
		if (success) {
			$.LoginWindow.close();
		} else {
			alert(JSON.parse(error).error[0].message);
		}
	});
	
}
