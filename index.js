const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

const userRoutes = require("./users/userRoute.js");

server.use("/", userRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));