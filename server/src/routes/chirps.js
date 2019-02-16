import { Router } from 'express';
// for local db use: import db from '../db'

let router = Router();

// Postgresql connection
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

router.get('/', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM chirps');
      const results = { 'results': (result) ? result.rows : null};
      res.render('api/chirps', results );
      client.release();
    } catch (err) {
      console.error(err);
      console.log(process.env.DATABASE_URL);
      res.send("Error " + err);
    }
  })






// routers for local db

// router.get('/:id?', async (req, res) => {
//     let id = req.params.id;
//     if (id) {
//         try {
//             let results = await db.one(id);
//             res.json(results);
//         } catch (e) {
//             console.log(e);
//             res.sendStatus(500);
//         }
//     } else {
//         try {
//             let results = await db.all();
//             res.json(results);
//         } catch (e) {
//             console.log(e);
//             res.sendStatus(500);
//         }
//     }
// });

// router.delete('/:id', async (req, res) => {         
//     let id = req.params.id;
//     try {
//         let results = await db.del(id);
//         res.json(results)
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
//     res.sendStatus(200);
// })

// router.put('/:id', async (req, res) => {
//     let id = req.params.id;
//     let text = req.body.text
//     try {
//         let results = await db.put(id, text);
//         res.json(results)
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
//     res.sendStatus(200);
// })

// router.post('/', async (req, res) => {
//     let user = req.body.user
//     let text = req.body.text
//     try {
//         let results = await db.post(user, text);
//         res.json(results)
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
//     res.sendStatus(200);
// })

export default router;