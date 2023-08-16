const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000; // You can change this to any port you prefer

app.get('/api/getuser', (req, res) => {
  fs.readFile('data/user.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
