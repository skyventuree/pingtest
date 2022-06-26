const express = require('express');
const app = express();

const port = 4200;

app.use(express.static('.'));

app.get('/', (req, res) => {
    res.send("try /index.html");
})

app.listen(port, () => {
    console.info('localhost:' + port);
})