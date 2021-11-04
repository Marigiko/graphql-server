import { gql } from "apollo-server"

const persons = [
    {
        name: "Mario",
        phone: "3624-354589",
        id: "65423154560323543241"
    },
    {
        name: "Bruno",
        phone: "3624-689888",
        id: "165432135432132432413" 
    },
]

const typeDefs = gql `
    type Person {
        name: String!
        phone: String
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPerson: () => persons
    }
}

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})

