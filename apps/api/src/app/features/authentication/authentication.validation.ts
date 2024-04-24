export const CreateUserSchema = {
  type: 'object',
  required: [
    'email',
    'password',
    // Todo: sort password confirmation
    // 'password_confirmation',
    'lastName',
    'firstName',
  ],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 },
    // password_confirmation: { type: 'string', const: { $data: '/password' } },
    firstName: { type: 'string', minLength: 2 },
    lastName: { type: 'string', minLength: 2 },
    industry: { type: 'array' },
    occupation: { type: 'array' },
  },
  additionalProperties: false,
};
