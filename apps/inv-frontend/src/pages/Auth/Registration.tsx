import {
  LoginProps,

  // UserStateProps,
} from "@/store/interfaces/user.interface";
import {  RegistrationSchema } from "@/utils/Yup";
import { Alert } from "flowbite-react";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { useLoginMutation } from "@/store/slices/appSlice";
import ButtonSpinner from "@/components/ButtonSpinner";
import { useDispatch, 
  // useSelector 
} from "react-redux";
// import { RootState } from "@/store/store";
import { loadUser } from "@/store/slices/authSlice";
import DashboardLayout from "@/components/DashboardLayout";
import { generateRandomPassword } from "@/utils/constant";

const Registration = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const dispatch = useDispatch<any>();
  // const { data: loadUserData } = useLoadUserQuery();
  // const authSlice = useSelector<RootState, UserStateProps>(
  //   (state) => state.auth.user
  // );
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
      <p className="black text-[2rem] font-bold mb-8">Register User</p>
      <div className="flex flex-col justify-center w-full max-w-[62rem] bg-[#FBFBFB] gap-8 rounded-[1.1875rem] p-8">
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
                <div className="flex flex-col md:flex-row gap-6 md:gap-20">
                  <div className="flex flex-col w-full gap-2 md:w-2/3">
                    <p className="text-[#52525C] text-base">Firstname</p>
                    <input
                      className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] w-full self-stretch gap-2 items-center"
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
                  <div className="flex flex-col w-full gap-2 md:w-2/3">
                    <p className="text-[#52525C] text-base">Lastname</p>
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
                <div className="flex flex-col md:flex-row gap-6 md:gap-20">
                  <div className="flex flex-col w-full gap-2 md:w-2/3">
                    <p className="text-[#52525C] text-base">Email</p>
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
                  <div className="flex flex-col w-full gap-2 md:w-2/3">
                    <p className="text-[#52525C] text-base">Role</p>
                    <select
                      className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch gap-2 items-center"
                      onChange={(e) => setFieldValue("role", e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                    {errors && errors.role && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.role}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-20">
                  <div className="flex flex-col w-full gap-2 md:w-2/3">
                    <p className="text-[#52525C] text-base">Password</p>
                    <div className="flex flex-col md:flex-row gap-6 justify-between">
                      <input
                        className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch md:w-full items-center"
                        type={"text"}
                        value={values["password"]}
                        placeholder={"***********"}
                        disabled
                      />
                      <button
                        className={`${
                          isLoginLoading ? "bg-custom-primary-1" : "bg-white"
                        }  ${
                          isLoginLoading
                            ? "border-custom-primary-1"
                            : "border-white"
                        }  font-bold rounded-[0.3125rem] whitespace-nowrap self-end border-custom-primary-1 border  text-custom-primary-1 px-4 h-[2.5rem] justify-center w-fit items-center hover:bg-custom-primary-1 hover:border hover:border-white hover:text-white`}
                        disabled={isLoginLoading}
                        onClick={() => {
                          setFieldValue("password", generateRandomPassword());
                        }}
                      >
                        {isLoginLoading ? (
                          <ButtonSpinner />
                        ) : (
                          "Generate Password"
                        )}
                      </button>
                    </div>
                    {errors && errors.password && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className=" flex self-end justify-end w-full gap-2 md:w-2/3">
                    <button
                      className={`${
                        isLoginLoading ? "bg-white" : "bg-custom-primary-1"
                      }  ${
                        isLoginLoading
                          ? "border-custom-primary-1"
                          : "border-white"
                      }  font-bold rounded-[0.3125rem]  text-white w-fit h-[2.5rem] px-4 justify-center items-center self-end hover:bg-white hover:border hover:border-custom-primary-1 hover:text-custom-primary-1`}
                      type="submit"
                      disabled={isLoginLoading}
                    >
                      {isLoginLoading ? <ButtonSpinner /> : "Register"}
                    </button>
                  </div>
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
