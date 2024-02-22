import {
  LoginProps,
  Role,
  UserStateProps,
} from "@/store/interfaces/user.interface";
import { LoginSchema, RegistrationSchema } from "@/utils/Yup";
import { Alert, Checkbox, Label } from "flowbite-react";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { useLoginMutation } from "@/store/slices/appSlice";
import ButtonSpinner from "@/components/ButtonSpinner";
import ConditionalRoute from "@/routes/ConditionalRoute";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { loadUser } from "@/store/slices/authSlice";
import DashboardLayout from "@/components/DashboardLayout";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const dispatch = useDispatch<any>();
  // const { data: loadUserData } = useLoadUserQuery();
  const authSlice = useSelector<RootState, UserStateProps>(
    (state) => state.auth.user
  );
  const [login, { error: loginError, isError: loginIsError }]: any =
    useLoginMutation();

  const handleLogin = useCallback(
    async (props: LoginProps) => {
      try {
        setIsLoginLoading(true);
        const response = await login(props);
        if (response?.data?.access_token) {
          localStorage.setItem("token", response.data.access_token);
          dispatch(loadUser());
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoginLoading(false);
    },
    [dispatch, login]
  );

  return (
    <DashboardLayout>
      <p className="black text-[2rem] font-bold">Register User</p>
      <div className="flex flex-col justify-center w-full max-w-[62rem] gap-8 bg-white rounded-[1.1875rem] p-8 ml-10">
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            role: "",
            password: "",
          }}
          validationSchema={RegistrationSchema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({ errors, values, setFieldValue }) => (
            <Form className="">
              <div className="flex flex-col gap-6">
                {loginIsError && (
                  <Alert color="failure" className="py-3">
                    <span className="font-medium">
                      {loginError && loginError?.data?.error?.message}
                    </span>
                  </Alert>
                )}
                <div className="flex flex-row space-x-20">
                  <div className="flex flex-col gap-2 w-2/3">
                    <p className="text-[#52525C] text-xl">First Name</p>
                    <input
                      className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch gap-2 items-center"
                      type="email"
                      onChange={(e) =>
                        setFieldValue("firstname", e.target.value)
                      }
                      placeholder="John "
                    />
                    {errors && errors.email && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2  w-2/3">
                    <p className="text-[#52525C] text-xl">Last Name</p>
                    <input
                      className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch gap-2 items-center"
                      type="email"
                      onChange={(e) =>
                        setFieldValue("lastname", e.target.value)
                      }
                      placeholder="Doe"
                    />
                    {errors && errors.email && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-row space-x-20">
                  <div className="flex flex-col gap-2 w-2/3">
                    <p className="text-[#52525C] text-xl">Email</p>
                    <input
                      className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch gap-2 items-center"
                      type="email"
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      placeholder="jdoe@example.com"
                    />
                    {errors && errors.email && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2  w-2/3">
                    <p className="text-[#52525C] text-xl">Role</p>
                    <select
                      className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch gap-2 items-center"
                      onChange={(e) => setFieldValue("role", e.target.value)}
                    />
                    {errors && errors.email && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2 w-1/3">
                    <p className="text-[#52525C] text-xl">Password</p>
                    <div className="relative">
                      <input
                        className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch w-full gap-2 items-center"
                        type={showPassword ? "text" : "password"}
                        value={values["password"]}
                        placeholder={
                          showPassword ? "Enter your password" : "***********"
                        }
                        onChange={(e) =>
                          setFieldValue("password", e.target.value)
                        }
                      />
                      <div className="absolute inset-y-0 right-0 p-4 flex items-center">
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide Password" : "Show Password"
                          }
                        >
                          {showPassword ? (
                            <LiaEyeSlashSolid />
                          ) : (
                            <LiaEyeSolid />
                          )}
                        </button>
                      </div>
                    </div>
                    {errors && errors.password && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <button
                  className={`${
                    isLoginLoading ? "bg-white" : "bg-custom-accent-1"
                  }  ${
                    isLoginLoading ? "border-custom-accent-1" : "border-white"
                  }  font-bold rounded-[0.3125rem]  text-white w-full h-[2.5rem] justify-center items-center hover:bg-white hover:border hover:border-custom-accent-1 hover:text-custom-accent-1`}
                  type="submit"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? <ButtonSpinner /> : "Register"}
                </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </DashboardLayout>
  );
};

export default Registration;
