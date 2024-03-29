import { NextFunction, Request, Response } from "express";
import { verify, VerifyErrors } from "jsonwebtoken";

// paths which can be accessed by anywhere without authentication
const publicPaths = ["/auth/login", "/auth/register", "/public", "/"];

// verifying token from header authorization
const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (publicPaths.includes(req.path)) {
    return next();
  }

  const authHeader: string = req.headers.authorization;

  const token: string = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      code: 401,
      error: "Unauthorized",
      message: "Token not found",
    });
  }

  verify(token, process.env.TYPEORM_SECRET, async (e: VerifyErrors) => {
    if (e) {
      return res.status(403).json({
        code: 403,
        error: "Forbidden",
        message: "missing web token",
      });
    }

    next();
  });
  //
};

export { verifyToken };
