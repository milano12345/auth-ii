require('dotenv').config();

const express = require("express");

const knex = require("knex");
const router = express.Router();
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");
const jwt = require("jsonwebtoken");

const db = require('../data/dbConfig.js');
const Users = require('../users/users-module.js');