import { PartialInstantiable } from '../../../utils/partial-instantiable';

export class User extends PartialInstantiable<User> {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  industry: Industry;
  occupation: Occupation;
  created_at: Date;
  updated_at: Date;
}

export enum Industry {
  ACADEMICS = 'academics',
  TECH = 'tech',
  BUSINESS = 'business',
  ENGINEERING = 'engineering',
  NON_PROFIT = 'non_profit',
  OTHER = 'other',
}

export enum Occupation {
  DEVELOPER = 'developer',
  TEACHER = 'teacher',
  DESIGNER = 'designer',
  HOBBYIST = 'hobbyist',
  MANAGER = 'manager',
  OTHER = 'other',
}
