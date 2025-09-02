// app.js

const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const cors = require('cors')

app.use(express.json());
app.use(cors());


app.get('/coffee', function(req, res) {
  knex('item')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
    app.get('/', (request, response) => {
        response.send('Application is running')
    })
});
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});