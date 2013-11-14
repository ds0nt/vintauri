var home = {
	
}

function login() {	
	this.template = vintauri.getTemplate("/templates/login.html");
	$('#content').append(this.template({}));
	$('#content').append(this.template({}));
	$('#content').append(this.template({}));
	$('#content').append(this.template({}));
	$('#content').append(this.template({}));
	$('#content').append(this.template({}));
	$('#content').append(this.template({}));
}

var vintauri = {
	init: function () {
		$.get('/user/get', {}, function(data) {

		}, "json");
		return 1;
	},
	templates : {},
	getTemplate: function(path) {
		if (!vintauri.templates[path])
			vintauri.templates[path] = vintauri.loadTemplate(path);
		return vintauri.templates[path];
	},
	loadTemplate: function(path) {
		var template = '';
		
		$.ajax({
			async: false,
			type:'get',
			url: path,
			dataType:'text',
			data:null,
			success: function(data){
				data = data;
				console.log(data);
				template = Handlebars.compile(data);
			},
			error: function(a, b, c){
				console.log(a);
				console.log(b);
				console.log(c);
				console.log('Error at loadTemplate');
			}
		});	

		return template;
	}
}

$(function() {
	vintauri.init();
	new login();
})