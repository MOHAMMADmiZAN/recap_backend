const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(cors());

const usersFilePath = path.join(__dirname, 'resource', 'users.json');
let users = [];
// genarate random id
const generateId = () => {
    let id = Math.floor(Math.random() * 1000000);
    while (users.find((user) => user.id == id)) {
        id = Math.floor(Math.random() * 1000000);
    }
    return id;
}

try {
    const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
    users = JSON.parse(fileContent);
} catch (error) {
    console.error('Error reading users file:', error);
    process.exit(1);
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    let id = newUser.id;
    if (!id) {
        id = generateId();
        newUser.id = id;
    }
    if (users.find((user) => user.id == id)) {
        return res.status(400).json({message: 'User already exists'});
    }
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    const userIndex = users.findIndex((user) => user.id == id);
    if (userIndex == -1) {
        return res.status(404).json({message: 'User not found'});
    }
    users[userIndex] = {...users[userIndex], ...updatedUser};
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.status(200).json({message: 'User updated', user: users[userIndex]});
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const userIndex = users.findIndex((user) => user.id == id);
    if (userIndex == -1) {
        return res.status(404).json({message: 'User not found'});
    }
    users.splice(userIndex, 1);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.status(200).json({message: 'User deleted', id});
});

app.get('/health', (req, res) => {
    res.status(200).json({status: 'ok'});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
