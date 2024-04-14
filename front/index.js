const express = require('express');
const path = require('path');
const folder = process.env.FOLDER;
const app = express();
const nodeport = process.env.NODE_PORT;

app.use(express.static(path.join(__dirname, `${folder}`)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `${folder}`, 'index.html'));
});

app.listen(nodeport, () => {
    console.log(`Server running at http://localhost:${nodeport}/`);
});