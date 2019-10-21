const sinon = require('sinon');
const { expect } = require('chai');
const mongoose = require('mongoose');

const Info = require('../models/Info');

const FootBallAPI = require('../util/FootBallAPI');

const GeneralController = require('../controllers/general');

describe('General Controller', function () {

    before(function (done) {
        const MONGOTESTDB_URI = 'mongodb+srv://foot-data-user:mongopass123@nodecourse-tnt0c.mongodb.net/test-foot-data';
        mongoose.connect(MONGOTESTDB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
        .then(() => {
            const info = new Info({
                applicationName: 'FootData',
                createdBy: 'Test',
                description: 'Test Description',
                examplePlayer: undefined
            });

            return info.save();
        })
        .then(() => {
            done();
        })
        .catch(err => {
            console.log(err);
        });
    });

    it('should respond with an info with a valid application name field', function (done) {

        sinon.stub(FootBallAPI, 'getResource');
        FootBallAPI.getResource.returns({
            id: 44,
            name: "Cristiano Ronaldo",
            firstName: "Cristiano Ronaldo",
            lastName: null,
            dateOfBirth: "1985-02-05",
            countryOfBirth: "Portugal",
            nationality: "Portugal",
            position: "Attacker",
            shirtNumber: 7,
            lastUpdated: "2019-09-12T02:54:53Z"
        });

        const res = {
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.message = data.message
            }
        };

        GeneralController.getInfo({}, res, () => { })
            .then(result => {
                expect(result).to.have.property('applicationName', 'FootData');
                expect(res).to.have.property('statusCode', 200);
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });
    
    it('should throw an error if an info is not found in the database with status code 404', function (done) {
        sinon.stub(Info, 'findOne').callsFake(() => undefined);

        const res = {
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.message = data.message
            }
        };

        GeneralController.getInfo({}, res, () => { })
            .then(result => {
                expect(result).to.be.an('error');
                expect(result).to.have.property('statusCode', 404);
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });

    after(function(done) {
        FootBallAPI.getResource.restore();
        Info.findOne.restore();
        Info.deleteMany({})
        .then(() => {
            return mongoose.disconnect();
        })
        .then(() => {
            done();
        });
    });
})