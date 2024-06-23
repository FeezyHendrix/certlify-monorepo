const loginField = [
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'Email',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Password',
      required: true,
    },
  ];
  
  const signUpField = [
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'Email',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Password',
      required: true,
    },
    // {
    //   name: 'confirmPassword',
    //   type: 'password',
    //   label: 'Confirm Password',
    //   placeholder: 'Confirm Password',
    //   required: true,
    // },
  ];
  
  export default loginField;
  export { signUpField };