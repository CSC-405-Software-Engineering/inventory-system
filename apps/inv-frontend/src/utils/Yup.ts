import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Insert your email"),
  password: Yup.string().required("Insert your password"),
});

export const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string().required("Insert your firstname"),
  lastName: Yup.string().required("Insert your lastname"),
  email: Yup.string().required("Insert your email"),
  role: Yup.string().required("Select your role"),
  password: Yup.string().required("Generate your password"),
});

export const AddProductSchema = Yup.object().shape({
  name: Yup.string().required("Insert product name"),
  imageURL: Yup.string().required("Insert product image url"),
  inventoryId: Yup.string().required("Select product category"),
  location: Yup.string().required("Insert product location"),
  quantity: Yup.number().min(1).required("Insert product quantity"),
  minStock: Yup.number().min(1).required("Insert product minimum quantity"),
  maxStock: Yup.number().min(1).required("Insert product maximum quantity"),
  unit: Yup.string().required("Insert product unit"),
  expirationDate: Yup.string().required("Insert product best before date"),
  unitPrice: Yup.number().min(1).required("Insert product price"),
});

export const EditProductSchema = Yup.object().shape({
  name: Yup.string().required("Insert product name"),
  imageURL: Yup.string().required("Insert product image url"),
  location: Yup.string().required("Insert product location"),
  quantity: Yup.number().min(1).required("Insert product quantity"),
  minStock: Yup.number().min(1).required("Insert product minimum quantity"),
  maxStock: Yup.number().min(1).required("Insert product maximum quantity"),
  unit: Yup.string().required("Insert product unit"),
  expirationDate: Yup.string().required("Insert product best before date"),
  unitPrice: Yup.number().min(1).required("Insert product price"),
});
