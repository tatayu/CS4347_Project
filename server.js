// const express = require('express');

// const app = express();

// app.get('/', (req, res) => res.send('API Running'));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const app = express();
const path = require('path');
app.use('/static', express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))});

app.listen(5000);