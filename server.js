const express = require('express')
const bodyParser = require('body-parser')
const ase = require('apollo-server-express')
const myGraphQLSchema = require('./schema')
const PORT = 3000;

var app = express();

app.use(
    '/api/graphql',
    bodyParser.json(),
    ase.graphqlExpress({ schema: myGraphQLSchema })
);

app.use(
    '/graphiql',
    ase.graphiqlExpress({ endpointURL: '/graphql' })
);

app.listen(PORT);