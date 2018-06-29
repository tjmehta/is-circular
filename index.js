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
}
/**
 * checks whether this.obj is circular
 * @param  {object}  obj do not pass. this param is used for recursive calls. defaults to this.obj
 * @param  {array}   seen a list of descendants from the root object to obj
 * @return {Boolean} true if obj is circular, false if it is not
 */
CircularChecker.prototype.isCircular = function (obj, seen) {
  obj = obj || this.obj
  seen = seen || new Set()
  if (!(obj instanceof Object)) {
    throw new TypeError('"obj" must be an object (or inherit from it)')
  }
  var self = this
  seen.add(obj)

  for (var key in obj) {
    var val = obj[key]
    if (val instanceof Object) {
      if (seen.has(obj) || self.isCircular(val, new Set(seen))) {
        return true
      }
    }
  }

  return false
}
