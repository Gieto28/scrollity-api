import { sign } from "jsonwebtoken";
import { User } from "../../entity/User";

async function createToken(user: User): Promise<string> {
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 180,
      name: user.name,
      email: user.email,
      _id: user._id,
    },
    process.env.TYPEORM_SECRET
  );
  return token;
}

export default createToken;
