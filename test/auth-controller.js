const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const { expect } = require('chai');
const mongoose = require('mongoose');

const User = require('../models/User');

const AuthController = require('../controllers/auth');

describe('Auth Controller', function () {

    before(function (done) {
        const MONGOTESTDB_URI = 'mongodb+srv://foot-data-user:mongopass123@nodecourse-tnt0c.mongodb.net/test-foot-data';
        mongoose.connect(MONGOTESTDB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
        .then(() => {
            return bcrypt.hash('ValidPass123!', 12);
        })
        .then((hashedPass) => {
            const user = new User({
                email: 'test@test.com',
                password: hashedPass,
                name: 'Test',
                _id: '5c0f66b979af55031b87742a'
            })

            return user.save();
        })
        .then(() => {
            done();
        })
        .catch(err => {
            console.log(err);
        });
    });

    it('should respond with a valid userId after a user is added', function(done) {

        const req = {
            body: {
                email: 'testmail@test.com',
                name: 'Testing',
                password: 'ValidPass123!'
            }
        };

        const res = {
            message: '',
            data: null,
            userId: null,
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            json: function(obj){
                this.message = obj.message;
                this.data = obj.data;
                this.userId = obj.userId;
            }
        };

        AuthController.signup(req, res, () => {})
            .then(() => {
                expect(res.userId).to.be.a('string');
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });

    it('should return a valid token given valid user credentials', function (done) {

        const req = {
            body: {
                email: 'test@test.com',
                password: 'ValidPass123!'
            }
        };

        const res = {
            token: null,
            userId: null,
            statusCode: 500,
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            json: function(obj){
                this.token = obj.token;
                this.userId = obj.userId;
            }
        };

        AuthController.getToken(req, res, () => {})
            .then(() => {
                expect(res.statusCode).to.equal(200);
                expect(res.token).to.be.a('string');
                done();
            })
            .catch(err => {
                console.log(err);
            })

    });

    it('should returns an error if user with requested email is not found', function(done) {

        const req = {
            body: {
                email: 'emailnotindb@test.com',
                password: 'ValidPass123!'
            }
        };

        AuthController.getToken(req, {}, () => {})
        .then((result) => {
            expect(result.message).to.equal('A user with this email could not be found');
            expect(result.statusCode).to.equal(401);
            done();
        })
        .catch(err => {
            console.log(err);
        })

    });

    it('should returns an error if user with requested password is incorrect', function(done) {

        const req = {
            body: {
                email: 'test@test.com',
                password: 'WrongPass123!'
            }
        };

        AuthController.getToken(req, {}, () => {})
        .then((result) => {
            expect(result.message).to.equal('Password is incorrect');
            expect(result.statusCode).to.equal(401);
            done();
        })
        .catch(err => {
            console.log(err);
        })

    });

    after(function(done) {
        User.deleteMany({})
        .then(() => {
            return mongoose.disconnect();
        })
        .then(() => {
            done();
        });
    });
});