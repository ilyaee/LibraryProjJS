const express = require('express');
const router = express.Router();
const redis = require('redis');

const REDIS_URL = process.env.REDIS_URL;

const client = redis.createClient({ url: REDIS_URL });

(async () => {
    await client.connect()
})()

router.post('/:bookId/incr', async (req, res) => {
    const { bookId } = req.params
    const cnt = await client.incr(bookId)
    res.json(cnt)
    res.statusCode = 200;
})

router.get('/:bookId', async (req, res) => {
    try {
        const redisCnt = await client.get(req.params.bookId)
        res.json(redisCnt)
        res.statusCode = 200;
    } catch (err) {
        res.json(`redis error: ${err}`)
    }

})

module.exports = router