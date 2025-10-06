"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verificarToken;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function verificarToken(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ erro: "Token ausente." });
    }
    const [scheme, token] = auth.split(" ");
    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ erro: "Token inválido." });
    }
    const secret = process.env.SENHA_JWT;
    if (!secret) {
        return res.status(500).json({ erro: "SENHA_JWT não configurada no .env." });
    }
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, secret);
        if (typeof payload === "object") {
            // anexe info útil no req para próximos middlewares/rotas
            req.perfil = payload.perfil;
            req.email = payload.email;
        }
        return next();
    }
    catch {
        return res.status(401).json({ erro: "Token inválido ou expirado." });
    }
}
