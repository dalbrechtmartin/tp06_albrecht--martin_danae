const { v4: uuidv4 } = require("uuid");
const { ACCESS_TOKEN_SECRET } = require("../config.js");
const jwt = require('jsonwebtoken');

let users = [
    {
        id: uuidv4(),
        name: "martin",
        prenom: "jean",
        login: "marsstin",
        email: "martin.jean@gmail.com",
        password: "toto"
    }
]; // Fake BDD

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}

exports.login = (req, res) => {
    const { login, password } = req.body;

    const utilisateur = users.find(user => user.login === login && user.password === password);
    if (!utilisateur) {
        return res.status(400).send("Invalid login or password");
    }

    const user = {
        id: utilisateur.id,
        name: utilisateur.name,
        email: utilisateur.email
    };

    let accessToken = generateAccessToken(user);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.send({ token: accessToken, utilisateur });
};

exports.createUser = (req, res) => {
    const user = {
        id: uuidv4(),
        name: req.body.name,
        prenom: req.body.prenom,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    };

    users.push(user);
    res.status(201).json(user);
};

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const index = users.findIndex(user => user.id === userId);

    if (index === -1) {
        return res.status(404).send("User not found");
    }

    users[index] = {
        ...users[index],
        name: req.body.name,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password
    };

    res.status(200).json(users[index]);
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    const index = users.findIndex(user => user.id === userId);

    if (index === -1) {
        return res.status(404).send("User not found");
    }

    users.splice(index, 1);
    res.status(204).send();
};