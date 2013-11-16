
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
	},
	value: function(id, val) {
		if (typeof val === 'undefined') 
			return document.getElementById(id).value;
		document.getElementById(id).value = val;
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
