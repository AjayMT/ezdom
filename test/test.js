
/* global require, describe, it, before, after */

var Nightmare = require('nightmare');
var should = require('should');

var app = require('./app');

describe('ezdom', function () {
  this.timeout(5000);

  before(function (done) {
    app.start(done);
  });

  it('should replace elements', function (done) {
    var h1;

    new Nightmare()
    .goto('http://localhost:3000')
    .evaluate(function () {
      h1 = document.querySelector('h1');

      return h1.innerText;
    }, function (text) {
      text.should.equal('Hello, world');
    })
    .click('#refresh')
    .evaluate(function () {
      return h1.innerText;
    }, function (text) {
      text.should.equal('EZDOM');
    })
    .run(done);
  });

  it('should add/remove elements', function (done) {
    new Nightmare()
    .goto('http://localhost:3000/add.html')
    .click('#change')
    .evaluate(function () {
      return document.querySelectorAll('div');
    }, function (divs) {
      divs.length.should.equal(1);
      divs[0].innerText.should.equal('0');
    })
    .click('#change')
    .click('#undo')
    .evaluate(function () {
      return document.querySelectorAll('div');
    }, function (divs) {
      divs.length.should.equal(1);
      divs[0].innerText.should.equal('1');
    })
    .run(done);
  });

  after(function () {
    app.kill();
  });
});
