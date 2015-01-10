
# ezdom
[![Build Status](https://travis-ci.org/AjayMT/ezdom.svg)](https://travis-ci.org/AjayMT/ezdom)

Simple, efficient DOM manipulation, used by [Cheese](http://npmjs.org/cheese).

Here's an example:

```javascript
var theDiv = document.querySelector('.some-div');
var theNewDiv = document.createElement('div');
theNewDiv.innerHTML = theDiv.innerHTML;
theNewDiv.appendChild(document.createTextNode('hello'));

// this will only add the new text node to theDiv
// note that the second argument can be theNewDiv or theNewDiv.innerHTML
EZDOM.updateElement(theDiv, theNewDiv);
```

EZDOM is fairly efficient and updates only what it needs to instead of redrawing whole elements. As a result of this, it is best for small, frequent DOM updates.

## Installation
via npm:

```sh
$ npm install --save ezdom
```

via bower:

```sh
$ bower install ezdom
```

Or download `./lib/ezdom.js` and put it in a script tag.

## Running tests
```sh
$ npm test
```

## API
### EZDOM.updateElement(left, right)
Update the element `left` so that it matches `right`. `left` and `right` must be DOM elements.

## License
MIT License. See `./LICENSE` for details.
