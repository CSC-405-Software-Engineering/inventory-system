/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LoginProps,
  Role,
  UserStateProps,
} from "@/store/interfaces/user.interface";
import { LoginSchema } from "@/utils/Yup";
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
import MetaTags from "@/components/MetaTags";

const Login = () => {
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
    <ConditionalRoute
      redirectTo="/dashboard"
      condition={
        authSlice && authSlice?.auth?.role === Role.User ? false : true
      }
    >
      <>
        <MetaTags
          title={"Login"}
          pageUrl={window.location.href}
        />
        <div className="relative h-screen">
          <div className="absolute inset-0  h-screen  bg-cover bg-center bg-[url('/assets/images/login-back.svg')]">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute flex h-screen w-full items-center px-4 right lg:justify-end justify-center lg:pr-16">
              <div className="flex flex-col justify-center w-full max-w-[32rem] gap-8 bg-white rounded-[1.1875rem] p-8 ">
                <div className="flex justify-between w-full items-center">
                  <p className="text-custom-primary-1 text-[2rem] font-bold">
                    Login
                  </p>
                  <img
                    className="flex self-end w-[45px] h-[70px]"
                    src="/assets/icons/login-app-icon.svg"
                    alt="App Logo"
                  />
                </div>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={(values) => {
                    handleLogin(values);
                  }}
                >
                  {({ errors, values, setFieldValue }) => (
                    <Form>
                      <div className="flex flex-col gap-6">
                        {loginIsError && (
                          <Alert color="failure" className="py-3">
                            <span className="font-medium">
                              {loginError && loginError?.data?.error?.message}
                            </span>
                          </Alert>
                        )}
                        <div className="flex flex-col gap-2">
                          <p className="text-[#52525C] text-xl">Email</p>
                          <input
                            className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch gap-2 items-center"
                            type="email"
                            onChange={(e) =>
                              setFieldValue("email", e.target.value)
                            }
                            placeholder="Your email address"
                          />
                          {errors && errors.email && (
                            <p className="text-[12px] mt-1 text-custom-danger">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-[#52525C] text-xl">Password</p>
                          <div className="relative">
                            <input
                              className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch w-full gap-2 items-center"
                              type={showPassword ? "text" : "password"}
                              value={values["password"]}
                              placeholder={
                                showPassword
                                  ? "Enter your password"
                                  : "********"
                              }
                              onChange={(e) =>
                                setFieldValue("password", e.target.value)
                              }
                            />
                            <div className="absolute inset-y-0 right-0 p-4 flex items-center">
                              <button
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={
                                  showPassword
                                    ? "Hide Password"
                                    : "Show Password"
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
                        <div className="flex justify-between w-full">
                          <div className="flex text-base font-medium items-center gap-2">
                            <Checkbox
                              className="text-[#9D0208]"
                              id="remember-me"
                            />
                            <Label htmlFor="remember-me">Remember Me</Label>
                          </div>
                          <Link to={"/"}>
                            <p className="flex font-bold text-base justify-end transition-all duration-200 ease-in-out hover:text-custom-accent-1">
                              Forgot Password?{" "}
                            </p>
                          </Link>
                        </div>
                        <button
                          className={`${
                            isLoginLoading ? "bg-white" : "bg-custom-accent-1"
                          }  ${
                            isLoginLoading
                              ? "border-custom-accent-1"
                              : "border-white"
                          }  font-bold rounded-[0.3125rem]  text-white w-full h-[2.5rem] justify-center items-center hover:bg-white hover:border hover:border-custom-accent-1 hover:text-custom-accent-1`}
                          type="submit"
                          disabled={isLoginLoading}
                        >
                          {isLoginLoading ? <ButtonSpinner /> : "Login"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </>
    </ConditionalRoute>
  );
};

export default Login;
