const express = require('express');
const itemsRoutes = require('./itemsRoutes');

const app = express();

app.use(express.json());
app.use('/items', itemsRoutes);

app.listen(3000, () => {
    console.log('App on port 3000');
})