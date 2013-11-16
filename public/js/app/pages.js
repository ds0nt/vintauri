
vintauri.pages = {

};

vintauri.pages.add = {
	init: function() {
		this.template = vintauri.getTemplate("/templates/add.html");
		var content = document.getElementById('content');
		content.innerHTML = this.template({});
		var controls = vintauri.ui.parse(content);
		controls.share.control.onClick(function(){
			$.post('/resource/post', {
				title: vintauri.pages.add.title(),
				url: vintauri.pages.add.url(),
				tags: [vintauri.pages.add.tags()]
			}, function() {

			});
		});
	},
	title: function(val) {
		return util.value('add-title', val);
	},
	url: function(val) {
		return util.value('add-url', val);
	},
	tags: function(val) {
		return util.value('add-tags', val);
	}
};

vintauri.pages.recent = {
	init: function() {
		this.template = vintauri.getTemplate("/templates/recent.html");

		var content = document.getElementById('content');
		content.innerHTML = this.template({});
		
		var controls = vintauri.ui.parse(content);
	},
	
};