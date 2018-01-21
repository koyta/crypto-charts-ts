const express = require('express');

const app = express();
const port = 5000;

app.get('/api/hello', (req, res) => {
  res.send({express: 'hi'});
});

app.listen(port, () => console.log(`listening on port ${port}`));