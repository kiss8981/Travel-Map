const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 8080
app.listen(port);

app.use(express.static(path.join(__dirname, '/build')));

app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/privacy.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

console.log(`server running ${port}`)
