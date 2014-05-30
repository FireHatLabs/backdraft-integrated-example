var meta = {source: 'responders/item.js'};

var Responder = function Responder (api) {
  var itemModel = api.model.create('Item',{
    title: String,
    description: String
  });
  
  api.authenticated.get(api.config.api.path + '/items', function(req, res, next) {
    api.view.renderItems(res, 'items', 'title description', itemModel);
  });

  api.authenticated.post(api.config.api.path + '/items', function(req, res, next) {
    api.model.add(res, 'items', itemModel, req.body.item, function(document) {
      api.view.renderItems(res, 'items', 'title description', itemModel);
    });
  });


  /*
	this.prototype = {
		route: '/item',
		name: 'item',
		plural: 'items',
		allow: { get: true, post: true, put: true, delete: true },
		fields: {
			fName: { 
				title: 'Name', type: 'alpha', validation: api.validation.alpha, 
				editable: false, viewable: true, required: true, param: true
			},
			fDesc: { 
				title: 'Description', type: 'alpha', validation: api.validation.alpha, 
				editable: true, viewable: true, required: true, param: false
			},
			fNotes: {
				title: 'Notes', type: 'alpha', validation: api.validation.alpha,
				editable: true, viewable: true, required: false, param: false
			}			
		},
		actions: {
			httpGet: { 
					auto: true,
					handler: function () { api.log('GET: Item Responder') },
				  validate: function () {}
			},
			httpPost: {
					auto: true,
					handler: function () { api.log('POST: Item Responder') },
					validate: function () {}
			},
			httpPut: {
					auto: true,
					handler: function () { api.log('PUT: Item Responder') },
					validate: function () {}
			},
			httpDelete: {
					auto: true,
					handler: function () { api.log('DELETE: Item Responder') },
					validate: function () {}
			},
			httpParams : {
					auto: true,
					handler: function () { api.log('PARAM: Item Responder') },
					validate: function () {}				
			}
		},
		owner: { level: 'all', fields: ['fName','fDesc','fNotes'] },
		group: { level: 'edit', fields: ['fName','fDesc'] },
		world: { level: 'read', fields: ['fName','fDesc'] }
	}
	*/
};

module.exports = function (api) {
	var responder = new Responder(api);
};