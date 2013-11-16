var home = {
	_onLoad: function() {},
	onLoad: function(fn) {
		home._onLoad = fn;
	},
	init: function() {
		this.template = vintauri.getTemplate("/templates/home.html");
		var v = $(this.template({}));
		$('#content').html(v);
		home._onLoad();
	}
}

var navbar = {
	init: function() {
		this.template = vintauri.getTemplate("/templates/nav-bar.html");
		var v = $(this.template({}));		
		$('#header').html(v);
	}
}
var footer = {
	init: function() {
		this.template = vintauri.getTemplate("/templates/footer.html");
		var v = $(this.template({}));		
		$('#footer').html(v);
	}
}

function login() {
	this.template = vintauri.getTemplate("/templates/login.html");
	this.$element = $(this.template({}));
	this.$element.appendTo('body');

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
				home.onLoad(function() {
					self.openCurtains();
				});
				home.init();

			// }
		},
	"json");
};
login.prototype.openCurtains = function() {
	console.log('test');
	console.log(util.animations);
	console.log(util._animationPrefix);
	var curtains = document.getElementById('login-curtains');
	var self = this;
	if (util.animations) {		
		curtains.className = "curtains running";
		curtains.addEventListener(util.animationEnd, function() { 
			self.$element.remove();
		}, false);
	} else {
		self.$element.remove();
	}
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
};

var util = {
	_animationPrefix: (function() {
    	var vendors = ['webkit', 'Moz', 'o', 'ms', ''];
    	for (var i = vendors.length - 1; i >= 0; i--) {
    		if( document.body.style[ vendors[i] + 'AnimationName' ] !== undefined ) {
    			return vendors[i];
    		};
    	}
        return false;
    })(),
	resolveBrowser: function() {
		util.animations = util._animationPrefix !== false;
		util.animationEnd = util._animationPrefix + 'animationend';
	}
};

var vintauri = {
	init: function () {
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
	util.resolveBrowser();
	vintauri.init();
	navbar.init();
	footer.init();
	new login();
})