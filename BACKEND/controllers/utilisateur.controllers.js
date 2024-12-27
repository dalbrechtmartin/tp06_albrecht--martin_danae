const { v4: uuidv4 } = require("uuid");
const { ACCESS_TOKEN_SECRET } = require("../config.js");
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}

exports.login = (req, res) => {
    const utilisateur = {
        login: req.body.login,
        password: req.body.password
    };

    // Test
    let pattern = /^[A-Za-z0-9]{1,20}$/;
    if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
        const uuid = uuidv4();
        const utilisateur = {
            nom: "martin",
            prenom: "jean",
            login: "marsstin",
            email: "martin.jean@gmail.com",
            password: "toto",
            id: uuid
        };

        const user = {
            id: utilisateur.id,
            name: utilisateur.nom,
            email: utilisateur.email
        };

        let accessToken = generateAccessToken(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.send({ token: accessToken, utilisateur });
    } else {
        res.status(400).send("Invalid login or password");
    }
};