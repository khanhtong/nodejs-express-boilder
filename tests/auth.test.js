import 'babel-polyfill';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import chai from 'chai'; // eslint-disable-line import/newline-after-import
import app from '../index.mjs';
import { jwtSecret } from '../config/config.mjs';
import UserModel from '../models/user.model.mjs';

const expect = chai.expect;
chai.config.includeStack = true;

describe('## Auth APIs', async () => {
  const validUserCredentials = {
    username: 'khanhtran',
    password: 'hjhjhaha',
  };

  const invalidUserCredentials = {
    username: 'khanhtran',
    password: 'passwordsai'
  };

  let jwtToken;
  const user = await UserModel.create({
    username: 'khanhtran',
    password: 'hjhjhaha',
    email: 'khanhkhanh@gmail.com'
  });

  describe('# POST /api/auth/login', () => {
    it('should return Authentication error', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(invalidUserCredentials)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Authentication error');
          done();
        })
        .catch(done);
    });

    it('should get valid JWT token', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(validUserCredentials)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('token');
          jwt.verify(res.body.token, jwtSecret, (err, decoded) => {
            expect(err).to.not.be.ok; // eslint-disable-line no-unused-expressions
            expect(decoded.username).to.equal(user.username.toString());
            jwtToken = `Bearer ${res.body.token}`;
            done();
          });
        })
        .catch(done);
    });
  });

  describe('# GET /api/auth/random-number', () => {
    it('should fail to get random number because of missing Authorization', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should fail to get random number because of wrong token', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .set('Authorization', 'Bearer inValidToken')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should get a random number', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .set('Authorization', jwtToken)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.num).to.be.a('number');
          done();
        })
        .catch(done);
    });
  });
});
