const express = require('express');
const counterApiRoute = require('./routes/counterApiRoute');

require('dotenv').config();
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());

app.use('/counter', counterApiRoute);


app.listen(PORT, () => {
    console.log(`COUNTER server listening on PORT ${PORT}`)
}) 