var home = {
	init: function() {
		this.template = vintauri.getTemplate("/templates/home.html");
		var v = $(this.template({}));		
		$('#content').html(v);
	}
}

var navbar = {
	init: function() {
		this.template = vintauri.getTemplate("/templates/nav-bar.html");
		var v = $(this.template({}));		
		$('#header').html(v);
	}
}

function login() {	

	this.template = vintauri.getTemplate("/templates/login.html");
	this.$element = $(this.template({}));
	this.$element.appendTo('#content');

	var self = this;
	this.$element.find('.btn').click(function(){ self.login.call(self); });
}
login.prototype.login = function() {
	var self = this;

	$.get(
		"/user/login",
		{ username: this.username(), password: this.password() },
		function(data) {
			// if (data.success) {
				var curtains = document.getElementById('login-curtains');
				curtains.className += " animate";
				curtains.addEventListener("animationend", function() { 
					self.$element.remove();
				}, false);
			// }
		},
		"json")
};
login.prototype.username = function(val) {
	var un = document.getElementById('login-username');
	if (typeof val === 'undefined') {
		return un.value;
	} else {
		un.value = val;
	}
}
login.prototype.password = function(val) {
	var un = document.getElementById('login-password');
	if (typeof val === 'undefined') {
		return un.value;
	} else {
		un.value = val;
	}
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
	home.init();
	navbar.init();
	new login();
})