// test/pricePlan.test.js
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; 
import { totalPhoneBill } from '../path/to/totalPhoneBill.mjs';


chai.use(chaiHttp);

describe('Price Plan API', () => {
    before(async () => {
    });

    it('should calculate the phone bill total', async () => {
        const res = await chai.request(app)
            .post('/api/phonebill/')
            .send({ price_plan: 'sms_kick_100', actions: 'call, sms, call' });
        
        expect(res).to.have.status(200);
        expect(res.body.total).to.equal('52.00');
    });

    it('should create a new price plan', async () => {
        const res = await chai.request(app)
            .post('/api/price_plan/create')
            .send({ name: 'new_plan', call_cost: 25.00, sms_cost: 5.00 });
        
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Price plan created successfully.');
        expect(res.body.pricePlan).to.deep.equal({ call_cost: 25.00, sms_cost: 5.00 });
    });

    it('should update an existing price plan', async () => {
        const res = await chai.request(app)
            .post('/api/price_plan/update')
            .send({ name: 'sms_kick_100', call_cost: 30.00, sms_cost: 15.00 });
        
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Price plan updated successfully.');
    });

    it('should delete a price plan', async () => {
        const res = await chai.request(app)
            .post('/api/price_plan/delete')
            .send({ name: 'another_plan' });
        
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Price plan deleted successfully.');
    });

    it('should get all price plans', async () => {
        const res = await chai.request(app)
            .get('/api/price_plans');
        
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
    });
});
