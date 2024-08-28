// const chai = require('chai');
// const expect = chai.expect;
// const supertest = require('supertest');
// const sqlite3 = require('sqlite3');
// const sqlite = require('sqlite');
// const express = require('express');
// const app = express();
// const request = supertest(app);

// const db = sqlite.open({
//   filename: './data_plan.db',
//   driver: sqlite3.Database
// });

// app.use(express.json());

//  //Create a new price plan
//  app.post('/api/price_plan/create', async (req, res) => {
//    const { name, call_cost, sms_cost } = req.body;

//    await db.run('insert into price_plan (plan_name, sms_price, call_price) values (?,?,?)', [name, sms_cost, call_cost]);

//    //Validation to ensure required fields are provided
//    if (!name || call_cost < 0 || sms_cost < 0) {
//        return res.status(400).json({ error: 'Please provide name, call_cost, and sms_cost.' });
//    }

//    // Check if the price plan already exists
//    if (pricePlans[name]) {
//        return res.status(400).json({ error: 'Price plan already exists.' });
//    }

//    // Create the new price plan
//    pricePlans[name] = {
//        call_cost,
//        sms_cost
//    };

//    res.status(201).json({ message: 'Price plan created successfully.', pricePlan: pricePlans[name] });
// });

// describe('Price Plan API', () => {
  
//    before(async () => {
//      await db.run('CREATE TABLE IF NOT EXISTS price_plan (plan_name TEXT PRIMARY KEY, call_price REAL, sms_price REAL)');
//    });
 
//    after(async () => {
//      await db.run('DROP TABLE IF EXISTS price_plan');

//      describe('POST /api/price_plan/create', () => {
//       it('should create a new price plan', async () => {
//         const response = await request.post('/api/price_plan/create').send({
//           name: 'test_plan',
//           call_cost: 1.50,
//           sms_cost: 0.50
//         });
//         expect(response.status).to.equal(201);
//         expect(response.body.message).to.equal('Price plan created successfully.');
//       });
  
//       it('should not create a price plan if required fields are missing', async () => {
//         const response = await request.post('/api/price_plan/create').send({
//           name: 'test_plan'
//         });
//         expect(response.status).to.equal(400);
//         expect(response.body.error).to.equal('Please provide name, call_cost, and sms_cost.');
//       });
//     });
//    });
// });
// test/example.test.js

