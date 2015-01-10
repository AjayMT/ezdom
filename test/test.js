
/* global require, describe, it, before, after */

var Nightmare = require('nightmare');
var should = require('should');

var app = require('./app');

describe('ezdom', function () {
  this.timeout(5000);

  before(function (done) {
    app.start(done);
  });

  it('should refresh the dom', function (done) {
    new Nightmare()
    .goto('http://localhost:3000')
    .evaluate(function () {
      return document.querySelector('h1').innerText;
    }, function (text) {
      text.should.equal('Hello, world');
    })
    .click('#refresh')
    .evaluate(function () {
      return document.querySelector('h1').innerText;
    }, function (text) {
      text.should.equal('EZDOM');
    })
    .run(done);
  });

  after(function () {
    app.kill();
  });
});
