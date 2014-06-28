var args = arguments[0] || {};

var id = args.id;


var dreamfactory = require('dreamfactory');

dreamfactory.makeRequest("get", "/etnatrainingdb/wp_posts/" + id + "?fields=post_date%2Cpost_content").then(function(response){
	//Ti.API.info(response);
	var lines = response.post_content.split("\n");
	//Ti.API.info(lines);
	var data = [];
	for (var i=0; i<lines.length; i++) {
		if (lines[i].indexOf('    [') == 0) {
			var line = lines[i]; 
			var record = line.split(" =&gt; ");
			var key = record[0];
			var value = record[1];
			var row = Ti.UI.createTableViewRow();
			row.add(Ti.UI.createLabel({text: key.trim(), left:5, top:3, height: 20}));
			row.add(Ti.UI.createLabel({text: value, left: 5, top: 30, height: 60, font: {fontWeight: "bold"}}));
			data.push(row);
		}
	}
	$.tv.setData(data);
}, function(error) {
	Ti.API.info("error!");
	Ti.API.info(error);
});
