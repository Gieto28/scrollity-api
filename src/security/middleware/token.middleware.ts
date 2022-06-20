import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload, VerifyErrors } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

// paths which can be accessed by anywhere without authentication
const publicPaths = ["/auth/login", "/auth/register", "/public"];

// verifying token from header authorization
const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (publicPaths.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      code: 401,
      error: "Unauthorized",
      message: "Token not found",
    });
  }

  verify(
    token,
    process.env.TYPEORM_SECRET,
    async (e: VerifyErrors, payload: JwtPayload) => {
      if (e) {
        return res.status(403).json({
          code: 403,
          error: "Forbidden",
          message: "missing web token",
        });
      }

      const { _id: id } = payload;
      const connection = AppDataSource.manager.connection;
      const table = connection.getRepository(User);
      const user = await table.findOne({ where: { _id: id } });

      req.user = user;

      next();
    }
  );
  //
};

export { verifyToken };
