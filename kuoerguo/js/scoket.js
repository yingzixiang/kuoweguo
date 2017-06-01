	var realname;
	$.getJSON("data/data1.json",
		function(data) {
			realname = data.realName;
			return realname;
	}); 
