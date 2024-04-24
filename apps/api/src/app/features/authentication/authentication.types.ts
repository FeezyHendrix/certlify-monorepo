export interface UserCreateInput {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  industry: string[];
  occupation: string[];
}
