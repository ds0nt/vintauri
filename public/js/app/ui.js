
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
	element['vintauri-ui'] = this;
	this._onClick = function() {
		console.log('Button clicked with no event attached');
	};
	this.element = element;
	this.element.addEventListener('click', function(){ self._onClick(); }, false);
};
vintauri.ui.button.prototype.onClick = function (handler) {
	this._onClick = handler;
};

vintauri.ui.text = function(element) {
	var self = this;
	element['vintauri-ui'] = this;
	this._onValueChanged = function() {
		console.log(element.getAttribute('data-ui-name') + ': Text Edit with no Binding');
	};
	this.element = element;
	this.element.addEventListener('keyup', function(){ self._onValueChanged(this.value); }, false);
};
vintauri.ui.text.prototype.onValueChanged = function (handler) {
	this._onValueChanged = handler;
};
vintauri.ui.text.prototype.val = function() {
	return this.element.value;
};

vintauri.ui.text = function(element) {
	var self = this;
	element['vintauri-ui'] = this;
	this._onValueChanged = function() {
		console.log(element.getAttribute('data-ui-name') + ': Text Edit with no Binding');
	};
	this.element = element;
	this.element.addEventListener('keyup', function(){ self._onValueChanged(this.value); }, false);
};
vintauri.ui.text.prototype.onValueChanged = function (handler) {
	this._onValueChanged = handler;
};
vintauri.ui.text.prototype.val = function() {
	return this.element.value;
};
vintauri.ui.text.prototype.setValue = function(value) {
	this.element.value = value;
}

vintauri.ui.resourcetable = function(element) {
	var self = this;
	element['vintauri-ui'] = this;
	this.element = element;

	$.get('/resource/get', {}, function(data) {
		if (data.success) {
			template = vintauri.getTemplate("/templates/resource_table.html");
			self.element.innerHTML = template(data);				
		}
	}, "json");
};

vintauri.ui.readonly = function(element) {
	var self = this;
	element['vintauri-ui'] = this;
	this._onValueChanged = function() {
		console.log(element.getAttribute('data-ui-name') + ': Text Edit with no Binding');
	};	
	this.element = element;
};
vintauri.ui.readonly.prototype.setValue = function(value) {
	this.element.innerHTML = value;
};