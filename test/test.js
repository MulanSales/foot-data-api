const request = require('supertest');
const { expect } = require('chai');

const { app, server } = require('../app');

describe('GET /', function () {

    it('should responde with a json with a valid message', function (done) {

        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).to.have.property('message').equals('Configuring CI/CD');
            });

        done();

    });

    after(function (done) {
        server.close();
        done();
    })

});