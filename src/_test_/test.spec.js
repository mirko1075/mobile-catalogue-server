
//Require the dev-dependencies
const chai = require('chai');
const expect = chai.expect;
const should = require("should");
const chaiHttp = require('chai-http');
const app = require('../app');
const ConnectionPool = require('../conf/ConnectionDb');
const { doesNotThrow } = require('should');
jest.setTimeout(7000)
chai.use(chaiHttp);
let tempId= 0;
describe("Test phone API", ()=>{    
    let server = null;
    beforeEach(() => {
        server = app.listen(3000, () => console.log('Listening on port 3000'));
    });

    afterEach(async () => {
        await server.close();
    });

    describe("get all phones",  () =>{
        it("should return all phone and status 200", async ()=>{
            const res = await chai.request(server).get('/api/v1/phones')
            expect(res).to.have.status(200);
        })
    });

    describe("Add  phone", () =>{
        it("should add one phone and return status 200 and phone added", async ()=>{
            const phone = {
                    "phone_name": "Test phone",
                    "manufacturer": "Test vendor",
                    "description": "Competitor of Iphone 12",
                    "color": "white",
                    "price": 1010,
                    "image_file_name": "image.jpg",
                    "screen": "180X24",
                    "processor": "Procesor XMD",
                    "ram": 450
                }
            const res = await chai.request(server)
            .post('/api/v1/phones')
            .send(phone)
            tempId=res.body.id;
            expect(res).to.have.status(201);
        })
    })
    describe("get one phone", () =>{
        it("should return one phone and status 200", async ()=>{
            const res = await chai.request(server).get('/api/v1/phones/'+tempId)
            expect(res).to.have.status(200);
        })
    })
    describe("get wrong phone", () =>{
        it("should return no phone and status 400", async ()=>{
            const res = await chai.request(server).get('/api/v1/phones/-1')
            expect(res).to.have.status(404);
        })
    })
    describe("Update  phone", () =>{
        it("should update one phone and return status 200 and phone added", async ()=>{
            const phone = {
                "phone_name": "Test phone modified",
                "manufacturer": "Test vendor",
                "description": "Competitor of Iphone 12",
                "color": "white",
                "price": 1010,
                "image_file_name": "image.jpg",
                "screen": "180X24",
                "processor": "Procesor XMD",
                "ram": 450
            }
            const res = await chai.request(server)
            .put('/api/v1/phones/'+tempId)
            .send(phone)
            expect(res).to.have.status(200);
        })
    })
    describe("Delete phone just added", () =>{
        it("should delete  phone just added and return status 200 and phone added", async ()=>{
            const res = await chai.request(server)
            .delete('/api/v1/phones/'+tempId)
            expect(res).to.have.status(200);
        })
    })
})