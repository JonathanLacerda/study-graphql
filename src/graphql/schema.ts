import { makeExecutableSchema } from 'graphql-tools'

const users: any[] =[
    {
        id: 1,
        name: 'John',
        email: 'jon@gmail.com'
    },
    {
        id: 2,
        name: 'Doo',
        email:'doo@gmail.com'
    }
]

const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        allUsers: [User!] !
    }
`

const resolvers = {
    Query:{
        allUsers: () => []
    }
}

export default makeExecutableSchema({typeDefs, resolvers})