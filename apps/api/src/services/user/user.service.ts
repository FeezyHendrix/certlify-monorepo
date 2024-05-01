import { User } from './entities/user.entity';
import { DAL } from '../../internal/db';
import { ulid } from 'ulid';

export async function getUserById(id: string): Promise<User> {
  const user = await DAL().user.findUnique({ where: { id } });

  return <User>user;
}

export async function getUserByEmail(email: string): Promise<User> {
  const user = await DAL().user.findUnique({ where: { email } });

  return <User>user;
}

export type CreateUserData = Omit<User, 'created_at' | 'updated_at'>;

export async function createUser(data: CreateUserData): Promise<User> {
  const user = await DAL().user.create({ data: { id: ulid(), ...data } });

  return <User>user;
}

export type UpdateUserData = Partial<Omit<CreateUserData, 'id'>>;

export async function updateUser(
  id: string,
  data: UpdateUserData
): Promise<User> {
  const user = await DAL().user.update({ where: { id }, data });

  return <User>user;
}
