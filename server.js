const express = require("express");
const server = express();

const actionsRouter = require("./actions/actionsRouter");
const projectsRouter = require("./projects/projectsRouter");

server.use(express.json());
server.use(logger);
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}

module.exports = server;