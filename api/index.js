
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
    .returning('*')
    .then(([newUser]) => {
      res.json(newUser);
    })
    .catch(err => res.status(500).json({ error: err.message}))
})

app.post('/users/login', (req, res) => {
  const { username, password } = req.body;
  knex('users')
  .where({ username, password })
  .first()
  .then(user => {
    if (!user) return res.status(400).json({
      message: 'Invalid login'})
      res.json({ id: user.id, first_name: user.first_name, last_name: user.last_name, username: user.username})
  })
  .catch(err => res.status(500).json({error: err.message}))
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

app.post('/coffee', (req, res) => {
  const item = req.body;
  knex('item')
    .insert(item)
    .returning('*')
    .then(([newItem]) => res.json(newItem)) 
    .catch(err => res.status(500).json({error: err.message}))
})

app.patch('/coffee/:id', (req, res) => {
  const updates = req.body;
  knex('item')
  .where({ id: req.params.id })
  .update(updates)
  .then (count => {
    if (count === 0) return res.status(404).json({ 
      message: 'Try again'})
      res.json({ message: 'item updated'})
  })
  .catch(err => res.status(500).json({ error: err.message }))
})

app.delete('/coffee/:id', (req, res) => {
  knex('item')
  .where({ id: req.params.id})
  .del()
  .then(count => {
    if (count === 0) return res.status(404).json({ message: 'try again'})
      res.json({ message: 'item deleted' })
  })
  .catch(err => res.status(500).json({ error: err.message }))
})

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});