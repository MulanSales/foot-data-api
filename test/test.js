const request = require('supertest');
const { expect } = require('chai');

const { app } = require('../app');

describe('General Controller', function () {

    it('should responde with an info with a valid application name field', function (done) {

        request(app)
            .get('/v1/info')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                console.log(response);
                expect(response.body).to.have.property('applicationName').equals('FootData');
            });

        done();

    });

});