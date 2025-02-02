import express from 'express';

const app = express(); 
app.use(express.json()); 

const users = [];

app.get('/', (req, res) => {
  res.status(200).send(users);
});

app.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});