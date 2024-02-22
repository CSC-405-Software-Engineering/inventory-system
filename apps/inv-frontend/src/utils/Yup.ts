import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Insert your email"),
    password: Yup.string().required("Insert your password"),
  });
  

  export const RegistrationSchema = Yup.object().shape({
    firstname: Yup.string().required("Insert your firstname"),
    lastname: Yup.string().required("Insert your lastname"),
    email: Yup.string().required("Insert your email"),
    role: Yup.string().required("Select your role"),
    password: Yup.string().required("Generate your password"),
  });

  export const AddProductSchema = Yup.object().shape({
    name: Yup.string().required("Insert product name"),
    image: Yup.string().required("Insert product image url"),
    category: Yup.string().required("Select product category"),
    location: Yup.string().required("Insert product location"),
    quantity: Yup.number().required("Insert product quantity"),
    bestbefore: Yup.string().required("Insert product best before date"),
    price: Yup.number().required("Insert product price"),
  });
  