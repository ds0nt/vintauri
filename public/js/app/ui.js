
vintauri.ui = {
	parse: function(treestart) {
		if (typeof treestart === 'undefined') 
			return;
		//Depth first
		var uiChildren = {};
		for (var i = treestart.children.length - 1; i >= 0; i--) {
			var babies = vintauri.ui.parse(treestart.children[i]);

    		for (var baby in babies) {
    			if (babies[baby])
    				uiChildren[baby] = babies[baby];
    		} 
    	}

		var uielem = treestart.getAttribute('data-ui-control');
		if (uielem && typeof treestart['vintauri-ui'] === 'undefined' && typeof vintauri.ui[uielem] !== 'undefined') {
			var ret = {};
			ret[treestart.getAttribute('data-ui-name')] = {control: new vintauri.ui[uielem](treestart), children: uiChildren};
			return ret;
		}
		return uiChildren;
	}
};

vintauri.ui.button = function(element) {
	var self = this;
	this._onClick = function() {
		console.log('Button clicked with no event attached');
	};
	this.element = element;
	this.element.addEventListener('click', function(){ self._onClick(); }, false);
}
vintauri.ui.button.prototype.onClick = function (handler) {
	this._onClick = handler;
}

vintauri.ui.resourcetable = function(element) {
	var self = this;
	this.element = element;

	$.get('/resource/get', {}, function(data) {
		if (data.success) {
			template = vintauri.getTemplate("/templates/resource_table.html");
			self.element.innerHTML = template(data);				
		}
	}, "json");
}