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
	user: null,
	init: function () {
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
	},
	alert: function(error) {
		var elem = document.createElement('div');
		elem.innerHTML = vintauri.getTemplate("/templates/alert.html")({error: error});
		var alerts = document.getElementById('alerts');
		alerts.appendChild(elem);
		setTimeout(function() { 
			alerts.children[0].remove();
		}, 1500);
	}
}
vintauri.models = {
	parse: function(treestart, model) {

		if (typeof treestart === 'undefined') 
			return;
		
		var field = treestart.getAttribute('data-model-field');

		if (treestart.getAttribute('data-model'))
			model = treestart.getAttribute('data-model');

		if (field) {
			if (typeof vintauri.models[model] === 'undefined')
				vintauri.models[model] = new vintauri.model(model, {});
			vintauri.models[model].addField(field, treestart['vintauri-ui']);
		}

		for (var i = treestart.children.length - 1; i >= 0; i--) {
			vintauri.models.parse(treestart.children[i], model);
		}
	}
};

vintauri.model = function(name, fields) {
	this.name = name;
	this.fields = fields;
	this.projection = {};
}
vintauri.model.prototype.addField = function(field, control) {
	this.fields[field] = control.val();
	this.bindFieldToControl(field, control);
}
vintauri.model.prototype.bindFieldToControl = function(field, control) {
	this.projection[field] = control;
	var self = this;
	control.onValueChanged(function(value) {
		self.fields[field] = value;
		console.log(vintauri.models);
	});
}
vintauri.model.prototype.set = function(field, value) {
	if (typeof this.projection[field] !== 'undefined') {
		this.projection[field].setValue(value);
	}
};


