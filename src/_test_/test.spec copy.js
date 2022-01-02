
//Require the dev-dependencies
let chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
let chaiHttp = require('chai-http');
let server = require('../app');
let ConnectionPool = require('../model/ConnectionModel');

chai.use(chaiHttp);

describe('Phones', () => {

  describe('/GET phone', () => {
      it('it should GET all the phones', (done) => {
            chai.request(server)
            .get('/api/phones')
            .end((err, res) => {
                console.log('res :>> ', res);
                chai.should(res).have.property("status").eql(200);
                chai.should(res.body).be.a('array');
                chai.should(res.body.length).be.eql(0);
              done();
            });
      });
  });
  /* describe('/POST phone', () => {
      it('it should POST a phone ', (done) => {
            let phone = {
                "phone_name": "Galaxy S10",
                "manufacturer": "Samsung",
                "description": "Competitor of Iphone 12",
                "color": "white",
                "price": 1010,
                "image_file_name": "image.jpg",
                "screen": "180X24",
                "processor": "Procesor XMD",
                "ram": 450
            }
            chai.request(server)
            .post('/api/phones')
            .send(phone)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Phone successfully added!');
                  res.body.phone.should.have.property('title');
                  res.body.phone.should.have.property('author');
                  res.body.phone.should.have.property('pages');
                  res.body.phone.should.have.property('year');
              done();
            });
      });
  });
  describe('/GET/:id phone', () => {
      it('it should GET a phone by the given id', (done) => {
        let phone = {
            "phone_name": "Galaxy S10",
            "manufacturer": "Samsung",
            "description": "Competitor of Iphone 12",
            "color": "white",
            "price": 1010,
            "image_file_name": "image.jpg",
            "screen": "180X24",
            "processor": "Procesor XMD",
            "ram": 450
        }
        chai.request(server)
        .post('/api/phones')
        .send(phone)
        .end((err, res) => {
            chai.request(server)
            .get('/api/phones/' + res.body.id)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('name');
                  res.body.should.have.property('manufacturer');
                  res.body.should.have.property('color');
                  res.body.should.have.property('price');
                  res.body.should.have.property('id').eql(phone.id);
              done();
            });
          });
      });
  });

  describe('/PUT/:id phone', () => {
      it('it should UPDATE a phone given the id', (done) => {
         let phone = {
            "phone_name": "Galaxy S10",
            "manufacturer": "Samsung",
            "description": "Competitor of Iphone 12",
            "color": "white",
            "price": 1010,
            "image_file_name": "image.jpg",
            "screen": "180X24",
            "processor": "Procesor XMD",
            "ram": 450
        }
        chai.request(server)
        .post('/api/phones')
        .send(phone)
        .end((err, res) => {
                chai.request(server)
                .put('/api/phones/' + res.body.id)
                .send({Name: phone.name +" - modified", manufacturer: phone.manufacturer + " - modified"})
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Phone successfully modified');
                  done();
                });
          });

  });
 
  /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id phone', () => {
      it('it should DELETE a phone given the id', (done) => {
        let phone = {
            "phone_name": "Galaxy S10",
            "manufacturer": "Samsung",
            "description": "Competitor of Iphone 12",
            "color": "white",
            "price": 1010,
            "image_file_name": "image.jpg",
            "screen": "180X24",
            "processor": "Procesor XMD",
            "ram": 450
        }
        chai.request(server)
        .post('/api/phones')
        .send(phone)
        .end((err, res) => {
                chai.request(server)
                .delete('/api/phones/' + phone.id)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql(`Phone deleted with ID: ${phone.id}`);
                      res.body.result.should.have.property('status').eql("ok");
                  done();
                });
          });
      });
  });
});