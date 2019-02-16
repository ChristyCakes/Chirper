import { Router } from 'express';
const ST_KEY = process.env.SECRET_TEST_KEY
const stripe = require("stripe")(ST_KEY)


let router = Router();

router.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 14,
      currency: "usd",
      description: "Purchase 1,000 followers",
      source: req.body
    });
    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

export default router;