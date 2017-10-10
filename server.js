const express = require('express')
const bodyParser = require('body-parser')
const ase = require('apollo-server-express')
const myGraphQLSchema = require('./schema')
const PORT = 3000;

var app = express();

app.use(
    '/graphql',
    bodyParser.json(),
    ase.graphiqlExpress({ schema: myGraphQLSchema })
);

app.listen(PORT);