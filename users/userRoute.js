require('dotenv').config();

const express = require("express");

const knex = require("knex");
const router = express.Router();
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");
const jwt = require("jsonwebtoken");

const db = require('../data/dbConfig.js');
const Users = require('../users/users-module.js');

const secret = process.env.JWT_SECRET 

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d',
    }

    return jwt.sign(payload, secret, options);
}


router.get('/', (req, res) => {
    res.send('A long time ago in a galaxy far, far away....');
});

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 15);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/api/login', (req, res) => {
    let { username, password, department } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        // check that passwords match
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
          res
            .status(200)
            .json({ message: `Welcome ${user.username}!, have a token...`, token });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  function restricted(req, res, next) {
    const token = req.headers.authorization;
    
    if(token) {
      jwt.verify(token, secret, (err, decodedToken) => {
          if(err){
              res.status(401).json({message: 'you shall not pass!'})
          } else {
              req.decodedJwt = decodedToken;
              next();
          }
      });
    } else {
        res.status(401).json({ message: 'you shall not pass!'})
    }
  }

router.get('/users',restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;