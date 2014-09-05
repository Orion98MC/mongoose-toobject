/*

  Mongoose plugin for model.toObject()

  Usage:

  schema.plugin(require('mongoose-toobject'), { hide: '_id __v' });

*/

function plugin(schema, defaults) {
  var defaults = defaults || {};
   
  if (!schema.options.toObject) schema.options.toObject = defaults;
  
  schema.options.toObject.hide = defaults.hide || '__v';
  schema.options.toObject.getters = defaults.getters || false;
  
  schema.options.toObject.transform = function (doc, ret, options) {
    if (options.hide) {
      options.hide.split(' ').forEach(function (prop) {
        delete ret[prop];
      });
      if (ret._id) ret._id = doc._id.toString();
    }
  }
}

module.exports = plugin;