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
exports.HistorialTanque = void 0;
const Sequelize = __importStar(require("sequelize"));
const mysql_config_1 = require("../mysql.config");
const trucha_model_1 = require("./trucha.model");
const tanque_model_1 = require("./tanque.model");
exports.HistorialTanque = mysql_config_1.mysql.define('historial_tanques', {
    idTanque: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idTrucha: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fecha: Sequelize.DATE
}, { underscored: true, timestamps: true });
exports.HistorialTanque.belongsTo(trucha_model_1.Trucha);
exports.HistorialTanque.belongsTo(tanque_model_1.Tanque);
