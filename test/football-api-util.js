const sinon = require('sinon');
const { expect } = require('chai');
const FootBallAPI = require('../util/FootBallAPI');
const axios = require('axios');

describe('FottBall API Util', function () {

    it('should return a valid object if request is complete with success', function (done) {
        sinon.stub(axios, 'default');
        axios.default.returns(Promise.resolve({
            data:{
                player: {
                    name: "TestName"
                }
            }
        }));

        FootBallAPI.getResource(['v2', 'players', 44])
            .then((result) => {
                expect(result).to.have.property('player');
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });

    it('should throws an error if axios request to API is impossible at moment', function (done) {
       
        sinon.stub(axios, 'default');
        axios.default.throws();
        
        FootBallAPI.getResource(['v2', 'players', 44])
            .then((result) => {
                expect(result).to.be.an('error');
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });

    this.afterEach(function (done) {
        axios.default.restore();
        done();
    });


});