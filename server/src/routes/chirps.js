import { Router } from 'express';
// for local db use: import db from '../db'

let router = Router();

// Postgresql connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})



router.get('/:id?', async (req, res) => {
  let id = req.params.id;
  if (id) {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM chirps WHERE id = $1', [id]);
      const results = { 'results': (result) ? result.rows : null };
      res.send(results)
      client.release();
    } catch (err) {
      console.error(err);
      console.log(process.env.DATABASE_URL);
      res.send("Error " + err);
    }
  } else {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM chirps');
      const results = { 'results': (result) ? result.rows : null };
      res.send(results)
      client.release();
    } catch (err) {
      console.error(err);
      console.log(process.env.DATABASE_URL);
      res.send("Error " + err);
    }
  }
});

router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    const client = await pool.connect()
    const result = await client.query('DELETE FROM chirps WHERE id = $1', [id]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results)
    client.release();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  res.sendStatus(200);
})

router.post('/', async (req, res) => {
  let user = req.body.user
  let text = req.body.text
  try {
    const client = await pool.connect()
    const result = await client.query('INSERT INTO chirps(name, text) VALUES($1, $2)', [user, text]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results)
    client.release();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  res.sendStatus(200);
})

router.put('/:id', async (req, res) => {
  let id = req.params.id;
  let text = req.body.text
  try {
    const client = await pool.connect()
    const result = await client.query('UPDATE chirps SET text= $1 WHERE id = $2', [text, id]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results)
    client.release();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  res.sendStatus(200);
})


// routers for local db below

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