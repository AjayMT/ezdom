
# ezdom
[![Build Status](https://travis-ci.org/AjayMT/ezdom.svg)](https://travis-ci.org/AjayMT/ezdom)

Simple DOM manipulation.

```javascript
var theDiv = document.querySelector('.some-div');
var theNewDiv = document.createElement('div');
theNewDiv.innerHTML = theDiv.innerHTML;
theNewDiv.appendChild(document.createTextNode('hello'));

// this will only add the new text node to theDiv
// note that the second argument can be theNewDiv or theNewDiv.innerHTML
EZDOM.updateElement(theDiv, theNewDiv);
```

EZDOM tries to be as efficient as possible and doesn't redraw the whole DOM every time it updates it. This makes it great for small, frequent updates.

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
