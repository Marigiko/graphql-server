var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');


const persons = [
    {
        name: "Mario",
        dni: 45893123,
        city: "Resistencia",
        street: "San Fernando"
    },
]

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    persons: [Person]
  }
  type Person {
      name: String
      dni: Int
      address: Address
  }
  type Address {
      city: String
      street: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    persons: () => {
        return persons
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');