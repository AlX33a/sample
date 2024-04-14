const express = require('express');
const path = require('path');
global.port = process.env.BACK_PORT;
global.ip = process.env.IP;

const app = express();
const nodeport = process.env.NODE_PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(nodeport, () => {
    console.log(`Server running at http://localhost:${nodeport}/`);
});