
var dreamfactory = require('dreamfactory');


if (!dreamfactory.isLoggedIn()) {
	var loginWin = Alloy.createController("LoginWindow").getView();
	loginWin.open({modal:true});
}

var dataLoaded = false;

function loadData() {
	if (!dataLoaded) {
		Ti.API.info("Loading data from DSP!");
		var url = "/etnatrainingdb/wp_posts?filter=post_type%3D%22feedback%22&order=post_date&fields=ID%2Cpost_title&include_count=true";
		dreamfactory.makeRequest("get", url).then(function(response) {
			dataLoaded = true;
			var num = response.meta.count;
			
			Ti.API.info(response.record[0]);
			var data = [];
			for (var i=0; i < num; i++) {
				data.push({title: response.record[i].post_title, hasChild: true, id: response.record[i].ID});
			}
			$.tv.setData(data);
			
		}, function(error) {
	            Ti.API.info("error!");
	    		Ti.API.info(JSON.parse(error.responseText).error);
	        });
   }
}

function showDetail(e) {
	Ti.API.info(e.rowData.id);
	var detailWin = Alloy.createController("DetailWindow", {id:e.rowData.id}).getView();
	$.index.openWindow(detailWin);
}

$.index.open();
