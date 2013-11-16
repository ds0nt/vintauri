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

$(function() {
	util.resolveBrowser();
	vintauri.init();
	navbar.init();
	footer.init();
	new login();
})