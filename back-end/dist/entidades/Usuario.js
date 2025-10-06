"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = exports.Perfil = void 0;
const typeorm_1 = require("typeorm");
const Professor_1 = require("./Professor");
const Aluno_1 = require("./Aluno");
var Perfil;
(function (Perfil) {
    Perfil["PROFESSOR"] = "PROFESSOR";
    Perfil["ALUNO"] = "ALUNO";
})(Perfil || (exports.Perfil = Perfil = {}));
let Usuario = class Usuario {
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Perfil }),
    __metadata("design:type", String)
], Usuario.prototype, "perfil", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "questao", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "resposta", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "cor_tema", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Professor_1.Professor, (p) => p.usuario, { cascade: true }),
    __metadata("design:type", Professor_1.Professor)
], Usuario.prototype, "professor", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Aluno_1.Aluno, (a) => a.usuario, { cascade: true }),
    __metadata("design:type", Aluno_1.Aluno)
], Usuario.prototype, "aluno", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)("usuarios")
], Usuario);
