import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

const persons = [
    {
        name: "Mario",
        dni: 45893123,
        city: "Resistencia",
        street: "San Fernando"
    },
    {
        name: "Augusto",
        dni: 45963741,
        city: "Charata",
        street: "Sausalito"
    },
    {
        name: "Bruno",
        dni: 45321789,
        city: "Chaco",
        street: "Tailandia"
    },
    {
        name: "Mauro",
        dni: 45357951,
        city: "Rio Bermejo",
        street: "Impenetrable"
    },
]

// Construct a schema, using GraphQL schema language
let typeDefs = `
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
`;

// The root provides a resolver function for each API endpoint
let root = {
    persons: () => {
        return persons
    }
};

const resolvers = {
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city,
            }
        }
    }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');