var home = {
	_onLoad: function() {},
	onLoad: function(fn) {
		home._onLoad = fn;
	},
	init: function() {
		this.template = vintauri.getTemplate("/templates/home.html");
		var content = document.getElementById('content');
		content.innerHTML = this.template({});
		vintauri.ui.parse(content);
		home._onLoad();
	}
}

var navbar = {
	init: function() {
		this.template = vintauri.getTemplate("/templates/nav-bar.html");
		var header = document.getElementById('header');
		header.innerHTML = this.template({});
		
		var uielems = vintauri.ui.parse(header);		
		uielems['share'].control.onClick(function() {
			vintauri.pages.add.init();
		});
		uielems['recent'].control.onClick(function() {
			vintauri.pages.recent.init();
		});
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
	this.uielems = vintauri.ui.parse(document.body);		
	var self = this;
	this.uielems['login'].control.onClick(function() {
		self.login.call(self);
	});
	this.uielems['register'].control.onClick(function() {
		self.register.call(self);
	});
	vintauri.models.parse(document.body);
}
login.prototype.login = function() {
	var self = this;

	$.get(
		"/user/login", vintauri.models.login.fields,
		function(data) {
			if (data.success) {
				vintauri.models.user = new vintauri.model(data.user);

				home.onLoad(function() {
					self.openCurtains();
				});
				home.init();
			} else {
				vintauri.alert(data.error);				
			}
		},
	"json");
};
login.prototype.register = function() {
	var self = this;
	$.post(
		"/user/post", vintauri.models.login.fields,
		function(data) {
			if (data.success) {
				self.login.call(self);
			} else {
				vintauri.alert(data.error);
			}
		},
	"json");
};
login.prototype.openCurtains = function() {
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

$(function() {
	util.resolveBrowser();
	vintauri.init();
	navbar.init();
	footer.init();
	new login();
})