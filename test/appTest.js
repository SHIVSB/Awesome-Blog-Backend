var chai = require("chai"),
  expect = chai.expect,
  should = chai.should();
var request = require("request");

it("Main page content", function (done) {
  request("http://localhost:4000/", function (error, response, body) {
    console.log(body);
    expect(body).to.equal("Shivanshu");
    done();
  });
});
