import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Insert your email"),
    password: Yup.string().required("Insert your password"),
  });
  

  export const RegistrationSchema = Yup.object().shape({
    firstname: Yup.string().required("Insert your firstname"),
    lastname: Yup.string().required("Insert your lastname"),
    email: Yup.string().required("Insert your email"),
    role: Yup.string().required("Insert your role"),
    password: Yup.string().required("Insert your password"),
  });
  