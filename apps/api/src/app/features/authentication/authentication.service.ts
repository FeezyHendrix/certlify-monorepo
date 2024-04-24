import { UserCreateInput } from "./authentication.types"
import DAL from "../../../prisma/client";
import { generateAccessToken } from "./token.service"
export async function registerService(data: UserCreateInput) {
  const createdUser = await DAL.user.create({
    data
  });

  return { ...createdUser, token: generateAccessToken(createdUser.email)}
}


