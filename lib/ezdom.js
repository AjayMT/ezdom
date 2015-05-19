
/* global jQuery, require, module */

var EZDOM = {};

if (typeof window === 'object')
  window.EZDOM = EZDOM;

if (typeof module === 'object')
  module.exports = EZDOM;

(function () {
  function listContains (list, element, compareFunc, context) {
    for (var i = 0; i < list.length; i++)
      if (compareFunc.call(context, element, list[i])) return true;

    return false;
  }

  function toArray (list) {
    var array = [];
    for (var i = 0; i < list.length; i++)
      array[i] = list[i];

    return array;
  }

  EZDOM.indexOfNode = function (list, node) {
    for (var l in list)
      if (list[l].isEqualNode(node)) return l;

    return -1;
  };

  EZDOM.tagsMatch = function (left, right) {
    if (! left || ! right) return false;

    if (left.tagName && right.tagName) return (left.tagName === right.tagName);
    else return left.isEqualNode(right);
  };

  EZDOM.updateElement = function (left, right) {
    if (left.isEqualNode(right)) return;

    if (right.childNodes.length === 0 || ! this.tagsMatch(left, right)) {
      left.parentNode.replaceChild(right, left);

      return;
    }

    var added = [], removed = [];

    for (var i = 0; i < right.childNodes.length; i++)
      if (! listContains(left.childNodes, right.childNodes[i],
                         this.tagsMatch, this))
        added.push(right.childNodes[i].cloneNode(true));

    for (var j = 0; j < left.childNodes.length; j++)
      if (! listContains(right.childNodes, left.childNodes[j],
                         this.tagsMatch, this))
        removed.push(left.childNodes[j]);

    for (var k = 0; k < right.childNodes.length; k++)
      if (listContains(left.childNodes, right.childNodes[k],
                       this.tagsMatch, this)) {
        var filterCallback = function (element) {
          return EZDOM.tagsMatch(right.childNodes[k], element);
        };

        var leftInstances = toArray(left.childNodes).filter(filterCallback);
        var rightInstances = toArray(right.childNodes).filter(filterCallback);
        var addedInstances = added.filter(filterCallback);
        var removedInstances = removed.filter(filterCallback);

        var difference = rightInstances.length - leftInstances.length;

        if (difference > 0 && difference > addedInstances.length)
          added.push(right.childNodes[k].cloneNode(true));
        else if (difference < 0 && difference > removedInstances.length)
          removed.push(leftInstances[0]);
      }

    for (var l = 0; l < added.length; l++) {
      var ri = this.indexOfNode(right.childNodes, added[l]);
      var li = (ri - l) + removed.length;

      left.insertBefore(added[l], left.childNodes[li] || null);
    }

    for (var m = 0; m < removed.length; m++)
      left.removeChild(removed[m]);

    if (left.attributes && right.attributes) {
      for (var n = 0; n < right.attributes.length; n++) {
        var attrName = right.attributes[n].name;
        left.setAttribute(attrName, right.getAttribute(attrName));
      }

      for (var o = 0; o < left.attributes.length; o++) {
        attrName = left.attributes[o].name;
        if (! right.getAttribute(attrName))
          left.removeAttribute(attrName);
      }
    }

    for (var p = 0; p < right.childNodes.length; p++)
      this.updateElement(left.childNodes[p],
                         right.childNodes[p].cloneNode(true));
  };
})();
