const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

const usersRoutes = require("./users/userRoutes.js");

server.use("/api", usersRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));