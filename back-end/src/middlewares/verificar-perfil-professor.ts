import { Request, Response, NextFunction } from "express";

export default function verificarPerfilProfessor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const perfil = (req as any).perfil;

  if (perfil !== "PROFESSOR") {
    return res
      .status(403)
      .json({ erro: "Acesso permitido somente para professores." });
  }

  return next();
}
