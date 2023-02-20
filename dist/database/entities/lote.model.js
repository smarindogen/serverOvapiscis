"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lote = void 0;
const Sequelize = __importStar(require("sequelize"));
const mysql_config_1 = require("../mysql.config");
const trucha_model_1 = require("./trucha.model");
exports.Lote = mysql_config_1.mysql.define('lotes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    familia: { type: Sequelize.STRING },
    generacion: { type: Sequelize.INTEGER },
    linea: { type: Sequelize.STRING },
    grupo: { type: Sequelize.STRING(10) },
    sexo: { type: Sequelize.STRING(3) }
}, {
    indexes: [{
            unique: true,
            fields: ['familia', 'generacion', 'linea', 'grupo', 'sexo']
        }
    ],
    underscored: true,
    timestamps: true
});
exports.Lote.hasMany(trucha_model_1.Trucha, { foreignKey: 'id_lote' });
