var vintauri = {
	init: function () {
		$.get('/user/get', {}, function(data) {
			// document.getElementById('content').innerHTML = data;
			alert('hi');
		}, "json");
		return 1;
	}
}

$(function() {
	vintauri.init();
})