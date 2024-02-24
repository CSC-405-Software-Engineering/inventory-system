import {
  RegistrationProps,
  Role,
  UserStateProps,
} from "@/store/interfaces/user.interface";
import { RegistrationSchema } from "@/utils/Yup";
import { Alert } from "flowbite-react";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { useRegistrationMutation } from "@/store/slices/appSlice";
import ButtonSpinner from "@/components/ButtonSpinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DashboardLayout from "@/components/DashboardLayout";
import { generateRandomPassword } from "@/utils/constant";
import MetaTags from "@/components/MetaTags";
import ConditionalRoute from "@/routes/ConditionalRoute";

const Registration = () => {
  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);
  const dispatch = useDispatch<any>();
  // const { data: loadUserData } = useLoadUserQuery();
  const authSlice = useSelector<RootState, UserStateProps>(
    (state) => state.auth.user
  );
  const [
    registration,
    {
      data: registrationData,
      error: registrationError,
      isError: registrationIsError,
      isSuccess: registrationIsSuccess,
    },
  ]: any = useRegistrationMutation();

  const handleRegistration = useCallback(
    async (props: RegistrationProps) => {
      try {
        setIsRegistrationLoading(true);
        await registration(props);
      } catch (error) {
        console.log(error);
      }
      setIsRegistrationLoading(false);
    },
    [dispatch, registration]
  );

  return (
    <ConditionalRoute redirectTo="/login" condition={authSlice ? true : false}>
      <ConditionalRoute
        redirectTo="/404"
        condition={authSlice?.auth?.role === Role.User ? true : false}
      >
        <>
          <MetaTags
            title={"Regsitration | pantryHub"}
            pageUrl={window.location.href}
          />
          <DashboardLayout>
            <p className="black text-[2rem] font-bold mb-8">Register User</p>
            <div className="flex flex-col justify-center w-full max-w-[62rem] bg-[#FBFBFB] gap-8 rounded-[1.1875rem] p-8">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  role: "",
                  password: "",
                }}
                validationSchema={RegistrationSchema}
                onSubmit={(values) => {
                  handleRegistration(values);
                }}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="">
                    <div className="flex flex-col gap-6">
                      {registrationIsError && (
                        <Alert color="failure" className="py-3">
                          <span className="font-medium">
                            {registrationError &&
                              registrationError?.data?.message}
                          </span>
                        </Alert>
                      )}
                      {registrationIsSuccess && (
                        <Alert color="success" className="py-3">
                          <span className="font-medium">
                            {"User registered successfully"}
                          </span>
                        </Alert>
                      )}
                      <div className="flex flex-col md:flex-row gap-6 md:gap-20">
                        <div className="flex flex-col w-full gap-2 md:w-2/3">
                          <p className="text-[#52525C] text-base">Firstname</p>
                          <input
                            className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] w-full self-stretch gap-2 items-center"
                            type="text"
                            onChange={(e) =>
                              setFieldValue("firstName", e.target.value)
                            }
                            placeholder="John "
                          />
                          {errors && errors.firstName && (
                            <p className="text-[12px] mt-1 text-custom-danger">
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col w-full gap-2 md:w-2/3">
                          <p className="text-[#52525C] text-base">Lastname</p>
                          <input
                            className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch gap-2 items-center"
                            type="text"
                            onChange={(e) =>
                              setFieldValue("lastName", e.target.value)
                            }
                            placeholder="Doe"
                          />
                          {errors && errors.lastName && (
                            <p className="text-[12px] mt-1 text-custom-danger">
                              {errors.lastName}
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
                            onChange={(e) =>
                              setFieldValue("email", e.target.value)
                            }
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
                            onChange={(e) =>
                              setFieldValue("role", e.target.value)
                            }
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
                              className={`bg-white font-bold rounded-[0.3125rem] whitespace-nowrap self-end border-custom-primary-1 border  text-custom-primary-1 px-4 h-[2.5rem] justify-center w-fit items-center hover:bg-custom-primary-1 hover:border hover:border-white hover:text-white`}
                              onClick={() => {
                                setFieldValue(
                                  "password",
                                  generateRandomPassword()
                                );
                              }}
                            >
                              Generate Password
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
                              isRegistrationLoading
                                ? "bg-white"
                                : "bg-custom-primary-1"
                            }  ${
                              isRegistrationLoading
                                ? "border-custom-primary-1"
                                : "border-white"
                            }  font-bold rounded-[0.3125rem]  text-white w-fit h-[2.5rem] px-4 justify-center items-center self-end hover:bg-white hover:border hover:border-custom-primary-1 hover:text-custom-primary-1`}
                            type="submit"
                            disabled={isRegistrationLoading}
                          >
                            {isRegistrationLoading ? (
                              <ButtonSpinner />
                            ) : (
                              "Register"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </DashboardLayout>
        </>
      </ConditionalRoute>
    </ConditionalRoute>
  );
};

export default Registration;
