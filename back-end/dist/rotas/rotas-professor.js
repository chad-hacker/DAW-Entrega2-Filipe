"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verificar_token_1 = __importDefault(require("../middlewares/verificar-token"));
const verificar_perfil_professor_1 = __importDefault(require("../middlewares/verificar-perfil-professor"));
const servi_os_professor_1 = __importDefault(require("../servi\u00E7os/servi\u00E7os-professor"));
const RotasProfessor = (0, express_1.Router)();
RotasProfessor.post("/", servi_os_professor_1.default.cadastrarProfessor);
// ...
RotasProfessor.get("/:id", verificar_token_1.default, verificar_perfil_professor_1.default, servi_os_professor_1.default.buscarProfessorPorId);
exports.default = RotasProfessor;
