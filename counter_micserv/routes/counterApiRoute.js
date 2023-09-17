const express = require('express');
const router = express.Router();
const redis = require('redis');

const REDIS_URL = process.env.REDIS_URL;

const client = redis.createClient({ url: REDIS_URL });

(async () => {
    await client.connect()
})()

router.post('/:bookId/incr', async (req, res) => {
    const cnt = await client.incr(req.params.bookId)
    res.json(cnt)
})

router.get('/:bookId', (req, res) => {
    try {
        const redisCnt = client.get(req.params.bookId)
        res.json(redisCnt)
    } catch (err) {
        res.json(`redis error: ${err}`)
    }

})


module.exports = router