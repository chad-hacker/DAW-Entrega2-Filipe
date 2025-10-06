"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servi_os_usuario_1 = __importDefault(require("../servi\u00E7os/servi\u00E7os-usuario"));
const RotasUsuário = (0, express_1.Router)();
RotasUsuário.post("/login", servi_os_usuario_1.default.logarUsuario);
RotasUsuário.post("/verificar-cpf/:cpf", servi_os_usuario_1.default.verificarCpfExistente);
exports.default = RotasUsuário;
