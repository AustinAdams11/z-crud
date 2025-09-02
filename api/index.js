// app.js

const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
        response.send('Application is running')
    })

app.post('/users/register', function(req, res) {
  const { first_name, last_name, username, password } = req.body;
    if (!first_name || !last_name || !username || !password) {
      return res.status(400).json({
        message: 'Please fill in all fields'});
    }
    knex('users')
    .insert({ first_name, last_name, username, password })
    .then(() => {
      res.json({
        message: 'User registered'});
    })
    .catch(err => res.status(500).json({ error: err.message}))
})

app.get('/coffee', function(req, res) {
  knex('item')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message: 'The data you are looking for could not be found. Please try again'
      })
    );
});

app.get('/coffee/:id', function(req, res){
  knex('item')
  .where({ id: req.params.id })
  .first()
  .then(item => {
    if (!item) return res.status(404).json({
      message:
        'Item not found'
    })
    res.json(item);
  })
  .catch(err => res.status(500).json({ error: err.message}));
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});