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
exports.Huevos = void 0;
const Sequelize = __importStar(require("sequelize"));
const mysql_config_1 = require("../mysql.config");
const trucha_model_1 = require("./trucha.model");
exports.Huevos = mysql_config_1.mysql.define('huevos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idMadre: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    nPuesta: { type: Sequelize.INTEGER, allowNull: false },
    grHuevasBuenas: { type: Sequelize.DOUBLE, defaultValue: 0.0 },
    grHuevasMalas: { type: Sequelize.DOUBLE, defaultValue: 0.0 },
    ne: { type: Sequelize.DOUBLE, defaultValue: 0.0 },
    op: { type: Sequelize.DOUBLE, defaultValue: 0.0 },
    tamanoHueva: { type: Sequelize.DOUBLE, defaultValue: 0.0 },
}, { underscored: true, timestamps: true });
exports.Huevos.hasOne(trucha_model_1.Trucha, { foreignKey: 'id_madre' });
