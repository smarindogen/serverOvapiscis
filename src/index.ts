import express from 'express'
import {Trucha} from "./database/entities/trucha.model";
import {Tanque} from "./database/entities/tanque.model";
import {HistorialTanque} from "./database/entities/historial_tanque.model";
import {HistorialTrucha} from "./database/entities/historial_truchas.model";
import {Lote} from "./database/entities/lote.model";
import LotesRoute from './routes/lotes.routes'
import TruchasRoute from './routes/truchas.routes'
import StatsRoutes from './routes/stats.routes'
import LoginRoutes from './routes/login.routes'
import HuevosRoutes from "./routes/huevos.routes";
import ArchivosRoutes from "./routes/archivos.routes";
import fileUpload from "express-fileupload";

class App {
    private app: express.Application

    constructor() {
        this.app = express()
        this.config();
        this.middleware();
        this.routes();
        this.init();
    }

    private config() {
        this.app.set('port', 3000)

    }

    private middleware() {
        this.app.use(fileUpload({
                useTempFiles : true,
                tempFileDir : '/tmp/'
        }))
        this.app.use(express.json())
        this.app.use('/app', express.static("./public/app/"));

        this.app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
            const allowedOrigins = ['http://75.119.152.58', 'http://ona-int.ovapiscis.com', 'http://localhost:4200'];
            const origin = request.headers.origin!;
            console.log("ORIGIN: " + origin);
            if (allowedOrigins.includes(origin)) {
                response.header('Access-Control-Allow-Origin', origin);
            }
            response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            next();
        })

    }

    private routes() {
        this.app.use('/lotes', LotesRoute)
        this.app.use('/truchas', TruchasRoute)
        this.app.use('/stats', StatsRoutes)
        this.app.use('/login', LoginRoutes)
        this.app.use('/huevas', HuevosRoutes)
        this.app.use('/archivos',ArchivosRoutes)
    }

    private init() {
        this.app.listen(this.app.get('port'), () => {
            /*Lote.sync({alter: true})
                .then(() => {
                    console.log('Tabla Lotes sincronizada')
                    Trucha.sync({alter: true})
                        .then(() => {
                            console.log('Tabla Truchas sincronizada')
                            Tanque.sync({alter: true})
                                .then(() => {
                                    console.log('Tabla Tanque sincronizada')
                                    HistorialTanque.sync({alter: true})
                                        .then(() => {
                                            console.log('Tabla HistorialTanque sincronizada')
                                            HistorialTrucha.sync({alter: true})
                                                .then(() => console.log('Tabla HistorialTrucha sincronizada'))
                                                .catch((err) => {
                                                    console.log(err);
                                                });
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
            Usuario.sync({alter: true})
                .then(() => "Tabla usuarios creada correctamente")
                .catch((err) => {
                console.log(err);
            });*/
            console.log('Servidor en el puerto ' + this.app.get('port'));
        })
    }

}

new App();
