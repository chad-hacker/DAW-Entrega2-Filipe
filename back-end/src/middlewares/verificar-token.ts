import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function verificarToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
    const payload = verify(token, secret) as JwtPayload | string;

    if (typeof payload === "object") {
      // anexe info útil no req para próximos middlewares/rotas
      (req as any).perfil = (payload as any).perfil;
      (req as any).email = (payload as any).email;
    }

    return next();
  } catch {
    return res.status(401).json({ erro: "Token inválido ou expirado." });
  }
}
