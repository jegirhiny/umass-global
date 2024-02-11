const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/', async function(req, res) {
  try {
    const devs = await Promise.all(req.body.developers.map(async dev => {
      const response = await axios.get(`https://api.github.com/users/${dev}`);
      const { name, bio } = response.data;
      return { name, bio };
    }));
    
    res.send({ developers: devs });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});