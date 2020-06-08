import * as express from 'express'


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
        this.express.use('/', (req: express.Request, res: express.Response, next:express.NextFunction) => {
            res.send({
                hello: 'Teste'
            })
        })
    }
}

export default new App().express