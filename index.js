import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';


    // Setup an express server:
    const app = express();

    //Middleware to serve static files and to parse JSON bodies
    app.use(express.static('public'));
    app.use(express.json());

    //Setup SQLite
    const db = await sqlite.open({
        filename: './data_plan.db',
        driver: sqlite3.Database
    });

    //Setup migration
    await db.migrate();

    let pricePlans = {
        sms_kick_100: {
            call_cost: 20.00,
            sms_cost: 12.00
        },
        another_plan: {
            call_cost: 15.00,
            sms_cost: 10.00
        }
    };

    //Calculate the phone bill total
    app.post('/api/phonebill/', (req, res) => {
        const { price_plan, actions } = req.body;

        if (!price_plan || !actions) {
            return res.status(400).json({ error: 'Please provide price_plan and actions.' });
        }

        const plan = pricePlans[price_plan];

        if (!plan) {
            return res.status(404).json({ error: 'Price plan not found.' });
        }

        let total = 0;
        const actionsArray = actions.split(', ');

        actionsArray.forEach(action => {
            if (action === 'call') {
                total += plan.call_cost;
            } else if (action === 'sms') {
                total += plan.sms_cost;
            } else {
                return res.status(400).json({ error: `Action '${action}' is not recognized.` });
            }
        });

        res.json({ total: total.toFixed(2) });
    });

    //Create a new price plan
    app.post('/api/price_plan/create', async (req, res) => {
        const { name, call_cost, sms_cost } = req.body;

        await db.run('insert into price_plan (plan_name, sms_price, call_price) values (?,?,?)', [name, sms_cost, call_cost]);

        //Validation to ensure required fields are provided
        if (!name || call_cost < 0 || sms_cost < 0) {
            return res.status(400).json({ error: 'Please provide name, call_cost, and sms_cost.' });
        }

        // Check if the price plan already exists
        if (pricePlans[name]) {
            return res.status(400).json({ error: 'Price plan already exists.' });
        }

        // Create the new price plan
        pricePlans[name] = {
            call_cost,
            sms_cost
        };

        res.status(201).json({ message: 'Price plan created successfully.', pricePlan: pricePlans[name] });
    });

    //Update a price plan
    app.post('/api/price_plan/update', async(req, res) => {
        const { name, call_cost, sms_cost } = req.body;

        if (!name || call_cost < 0 || sms_cost < 0) {
            return res.status(400).json({ error: 'Please provide name, call_cost, and sms_cost.' });
        }
       console.log(sms_cost, call_cost);
        

        //Update the existing price plan
      await db.run ('UPDATE price_plan SET sms_price = $1, call_price = $2 WHERE plan_name = $3',[sms_cost, call_cost, name])

        res.status(200).json({ message: 'Price plan updated successfully.', pricePlan: pricePlans[name] });
    });

    //Delete a price plan
    app.post('/api/price_plan/delete', async (req, res) => {
        const { name } = req.body;

        await db.run('delete from price_plan where plan_name = $1', [name]);
        res.json({ message: 'Price plan deleted successfully.' });

       if (!name) {
            return res.status(400).json({ error: 'Please provide the name of the price plan to delete.' });
        }
    });

    // GET all price plans
    app.get('/api/price_plans', async (req, res) => {
        const rows = await db.all('SELECT * FROM price_plan')
       // console.log(rows);

        res.json(rows);
    });

    const PORT = process.env.PORT || 4011;
    app.listen(PORT, () => console.log(`Server started ${PORT}`))


