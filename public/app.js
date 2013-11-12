var vintauri = {
	init: function () {
		$.get('http://54.201.51.68/user/get', {}, function(data) {
			// document.getElementById('content').innerHTML = data;
			alert('hi');
		}, "json");
	}
}

$(function() {
	vintauri.init();
})