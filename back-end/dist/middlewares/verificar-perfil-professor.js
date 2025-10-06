"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verificarPerfilProfessor;
function verificarPerfilProfessor(req, res, next) {
    const perfil = req.perfil;
    if (perfil !== "PROFESSOR") {
        return res
            .status(403)
            .json({ erro: "Acesso permitido somente para professores." });
    }
    return next();
}
