"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lotes_routes_1 = __importDefault(require("./routes/lotes.routes"));
const truchas_routes_1 = __importDefault(require("./routes/truchas.routes"));
const stats_routes_1 = __importDefault(require("./routes/stats.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const huevos_routes_1 = __importDefault(require("./routes/huevos.routes"));
class App {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.middleware();
        this.routes();
        this.init();
    }
    config() {
        this.app.set('port', 3000);
    }
    middleware() {
        this.app.use(express_1.default.json());
        this.app.use('/app', express_1.default.static("./public/app/"));
        this.app.use((request, response, next) => {
            const allowedOrigins = ['http://75.119.152.58', 'http://ona-int.ovapiscis.com', 'http://localhost:4200'];
            const origin = request.headers.origin;
            console.log("ORIGIN: " + origin);
            if (allowedOrigins.includes(origin)) {
                response.header('Access-Control-Allow-Origin', origin);
            }
            response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            next();
        });
    }
    routes() {
        this.app.use('/lotes', lotes_routes_1.default);
        this.app.use('/truchas', truchas_routes_1.default);
        this.app.use('/stats', stats_routes_1.default);
        this.app.use('/login', login_routes_1.default);
        this.app.use('/huevas', huevos_routes_1.default);
    }
    init() {
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
        });
    }
}
new App();
