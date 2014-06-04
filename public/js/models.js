var Models = function Models (BDApp) {
  console.log("Models Loaded");

  BDApp.Item = DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    comments: DS.hasMany('comment', { async: true })
  });

  BDApp.Comment = DS.Model.extend({
    content: DS.attr('string'),
    addedAt: DS.attr('date'),
    item: DS.belongsTo('item')
  });

  BDApp.Registration = DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string')
  });

  BDApp.Account = DS.Model.extend({
    subscriber: DS.attr('boolean'),
    user: DS.belongsTo('user')
  });

  BDApp.User = DS.Model.extend({
    authenticated: DS.attr('boolean'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    email: DS.attr('string'),
    account: DS.belongsTo('account')
  });

  BDApp.Auth = DS.Model.extend({
    email: DS.attr('string'),
    password: DS.attr('string')
  });

  BDApp.Response = DS.Model.extend({
    code: DS.attr('number')
  });

};