var Routes = function Routes (BDApp) {
  console.log("Routes Loaded");
  Ember.Inflector.inflector.irregular('auth', 'authenticate');
  Ember.Inflector.inflector.irregular('registration', 'register');

  BDApp.Router.map(function () {
    this.route('register');
    this.route('login');

    this.resource('auth');

    this.resource('account');

    this.resource('items', function () {
      this.resource('item', { path: '/:item_id' });
    });

  });

  BDApp.ApplicationRoute = Ember.Route.extend({
    model: function () {
      return this.store.findAll('auth');
    },
    actions:  {
      error: function(err) {
        if (err && err.status === 401) {
          this.transitionTo('login');
        }
      }
    }
  });

// Accounts ////////////////////////////////

  BDApp.AccountsRoute = Ember.Route.extend({
    model: function () {
      return this.store.findAll('account');
    }
  });

// Items ////////////////////////////////

  BDApp.ItemsRoute = Ember.Route.extend({
    model: function () {
      return this.store.findAll('item');
    }
  });

// Auth ////////////////////////////////

  BDApp.AuthRoute = Ember.Route.extend({
    model: function () {
      return this.store.findAll('auth');
    }
  });

};