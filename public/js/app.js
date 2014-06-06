$(function() {
    Handlebars.registerHelper('json', function(object) {
      return new Handlebars.SafeString(
              JSON.stringify(object)
      );
    });


    var BDApp = Ember.Application.create({
      LOG_TRANSITIONS: true
    });

    BDApp.ApplicationSerializer = DS.ActiveModelSerializer.extend({
      primaryKey: '_id'
    });

    BDApp.ApplicationController = Ember.Controller.extend({
      authenticated: false,
      checkLogin: function () {
        if (!this.get('authenticated')) {
          this.controllerFor('login').transitionToRoute('login');
        }
      }
    });

    BDApp.ApplicationAdapter = DS.RESTAdapter.extend({
      namespace: 'api' //,
      //host: 'http://127.0.0.1:3000'
    });

    
    Models(BDApp);
    Controllers(BDApp);
    Routes(BDApp);
});