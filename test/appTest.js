var chai = require("chai"),
  expect = chai.expect,
  should = chai.should();
var request = require("request");

it("Main page content", function (done) {
  request(
    `http://localhost:${process.env.PORT}`,
    function (error, response, body) {

      console.log(process.env.PORT);
      expect(body).to.equal("Shivanshu");
      done();
    }
  );
});
