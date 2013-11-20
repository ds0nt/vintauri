
Handlebars.registerHelper('button', function(name, options) {
	return '<button class="btn" data-ui-control="button" data-ui-name="'+name+'" type="button">'+options.fn(this)+'</button>';
});