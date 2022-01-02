//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
const db = require('./db/db_queries.js')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
describe('Mobiles', () => {
/*
  * Test the /GET route
  */
describe('/GET book', () => {
        it('it should GET all the mobiles', (done) => {
          db.getPhones()
                  .then((res)=>{
                          res.body.should.be.a('array');
                  })
        });
    });

    /*
  * Test the /GET route by ID
  */
  describe('/GET book', () => {
        it('it should GET the mobile with ID 1', (done) => {
          db.getPhoneById(100)
                  .then((res)=>{
                          res.body.should.be.a('object');
                  })
        });
    });

    describe('/POST mobile', () => {
        it('it should not POST a book without pages field', (done) => {
            let book = {
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                year: 1954
            }
          chai.request(server)
              .post('/book')
              .send(book)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('pages');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                done();
              });
        });
  
    });
});