import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; // Import the app

chai.use(chaiHttp);

describe('Price Plans', () => {

    // Test the GET route
    describe('/GET price plans', () => {
        it('it should GET all the price plans', (done) => {
            chai.request(server)
                .get('/api/price_plans')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    // Test the POST route
    describe('/POST price plan', () => {
        it('it should POST a new price plan', (done) => {
            const pricePlan = {
                name: "New Plan",
                call_cost: 3.50,
                sms_cost: 0.75
            };
            chai.request(server)
                .post('/api/price_plan/create')
                .send(pricePlan)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Price plan successfully created');
                    res.body.pricePlan.should.have.property('name').eql('New Plan');
                    done();
                });
        });
    });

    // Test the PUT (update) route
    describe('/PUT/:name price plan', () => {
        it('it should UPDATE a price plan given the name', (done) => {
            const updatedPlan = {
                name: "New Plan",
                call_cost: 4.00,
                sms_cost: 1.00
            };
            chai.request(server)
                .put('/api/price_plan/update')
                .send(updatedPlan)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Price plan successfully updated');
                    done();
                });
        });
    });

    // Test the DELETE route
    describe('/DELETE/:name price plan', () => {
        it('it should DELETE a price plan given the name', (done) => {
            chai.request(server)
                .delete('/api/price_plan/delete')
                .send({ name: "New Plan" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Price plan successfully deleted');
                    done();
                });
        });
    });

});
