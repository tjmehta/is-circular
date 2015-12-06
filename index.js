module.exports = isCircular

/**
 * is circular utility
 * @param  {object}  obj object or array to be checked for circular references
 * @return {Boolean} true if obj is circular, false if it is not
 */
function isCircular (obj) {
  return new CircularChecker(obj).isCircular()
}

/**
 * Circular checker helper class
 * @param  {object}  obj object or array to be checked for circular references
 */
function CircularChecker (obj) {
  this.obj = obj
  this.seen = []
}
/**
 * checks whether this.obj is circular
 * @param  {object}  _obj do not pass. this param is used for recursive calls. defaults to this.obj
 * @return {Boolean} true if obj is circular, false if it is not
 */
CircularChecker.prototype.isCircular = function (_obj) {
  _obj = _obj || this.obj
  if (!(_obj instanceof Object)) {
    throw new TypeError('"obj" must be an object (or inherit from it)')
  }
  var self = this
  this.seen.push(_obj)

  for (var key in _obj) {
    var val = _obj[key]
    if (val instanceof Object) {
      return (~self.seen.indexOf(val))
        ? true // object is circular
        : self.isCircular(val)
    }
  }

  return false
}
