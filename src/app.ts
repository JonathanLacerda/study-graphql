import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import schema from './graphql/schema'


class App {
    public express : express.Application

    /**
     *  Inicializador do express
     */
    constructor(){
        this.express = express()
        this.middleware()
    }

    /**
     *  Método privado
     *  Setando rota
     */
    private middleware(): void {
        this.express.use('/graphql', graphqlHTTP({
            schema: schema,
            graphiql: process.env.NODE_END === 'development'
        }))
    }
}

export default new App().express