
# ezdom
Simple, efficient DOM manipulation, used by [Cheese](http://npmjs.org/cheese).

Here's an example:

```javascript
var theDiv = document.querySelector('.some-div');

// this will change theDiv.innerHTML
EZDOM.updateElement(theDiv, 'a <em>string</em> of <strong>HTML</strong>');

var theNewDiv = document.createElement('div');
theNewDiv.innerHTML = theDiv.innerHTML;
theNewDiv.appendChild(document.createTextNode('hello'));

// this will only add the new text node to theDiv
// note that the second argument can be theNewDiv or theNewDiv.innerHTML
EZDOM.updateElement(theDiv, theNewDiv);
```

EZDOM is fairly efficient and updates only what it needs to instead of redrawing whole elements. As a result of this, it is the best for small, frequent DOM updates.

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

**Note:** EZDOM depends on jQuery (for now), so you will need to include jQuery before including EZDOM.

## API
### EZDOM.updateElement(left, right)
Update the element `left` so that it matches `right`. `left` must be a DOM element, `right` can be a DOM element, a string of HTML, or a jQuery object.

## License
MIT License. See `./LICENSE` for details.
