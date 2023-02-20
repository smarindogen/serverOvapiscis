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
exports.Trucha = void 0;
const Sequelize = __importStar(require("sequelize"));
const mysql_config_1 = require("../mysql.config");
const historial_truchas_model_1 = require("./historial_truchas.model");
const fenotipo_truchas_model_1 = require("./fenotipo_truchas.model");
exports.Trucha = mysql_config_1.mysql.define('truchas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idLote: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    qr: { type: Sequelize.STRING, unique: true },
    tanque: Sequelize.STRING,
    chip: Sequelize.STRING,
    madre: { type: Sequelize.INTEGER, allowNull: true },
    estado: { type: Sequelize.STRING, allowNull: true, defaultValue: 'VIVA' },
    genotipada: { type: Sequelize.BOOLEAN, defaultValue: false },
    estado_reproductivo: { type: Sequelize.INTEGER, defaultValue: 0 },
    grupo: { type: Sequelize.INTEGER, defaultValue: 0 },
    orden: { type: Sequelize.INTEGER, defaultValue: 0 }
}, { underscored: true, timestamps: true });
exports.Trucha.hasMany(historial_truchas_model_1.HistorialTrucha, { foreignKey: 'id' });
exports.Trucha.hasOne(fenotipo_truchas_model_1.FenotipoTrucha, { foreignKey: 'id' });
