import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Insert your email"),
    password: Yup.string().required("Insert your password"),
  });
  