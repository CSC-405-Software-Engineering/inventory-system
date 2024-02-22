import DashboardLayout from "@/components/DashboardLayout";
import { Role, UserStateProps } from "@/store/interfaces/user.interface";
import {
  // useGetCGPAQuery,
  useLoadUserQuery,
} from "@/store/slices/appSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import {Card} from "flowbite-react";
import Image from 'next/image';

const UserDashboard = () => {

  const {
    data: loadUserData,
    // isLoading: loadUserIsLoading,
    // error: loadUserError,
  } = useLoadUserQuery();

  const authSlice = useSelector<RootState, UserStateProps>(
    (state) => state.auth.user
  );

  // const { data: cgpaData, error } = useGetCGPAQuery(
  //   authSlice?.student?.id || ""
  // );

  // console.log(error);

  // const { data: scheduleData, isLoading: isLoadingScheduleData } =
  //   useGetScheduleByProgramAndLevelQuery({
  //     programId: authSlice?.student?.programme || "",
  //     level: authSlice?.student?.level || "",
  //   });

  // const { data: studentCoursesData, isLoading: isLoadingStudentCourses } =
  //   useGetStudentCoursesQuery(authSlice?.student?.id || "");

  return (
    // <ConditionalRoute redirectTo="/login" condition={authSlice ? true : false}>
    //   <ConditionalRoute
    //     redirectTo="/404"
    //     condition={authSlice?.auth?.role === Role.User ? true : false}
    //   >
    <DashboardLayout>

        <div className="flex flex-col gap-4">
          <div className="w-full">
            <div className="flex items-center w-full">
              <div className="font-bold text-black text-[1.5rem] leading-normal ">
                {`Hello, ${loadUserData?.user?.firstName || ""} ${
                  loadUserData?.user?.lastName || ""
                }`}
                <div className="flex space-x-12">
                  <div className="relative top-152 left-240 bg-gray-100  w-569 h-164 p-8 rounded-lg ">
                    <div className="mb-4 flex items-center justify-between  flex space-x-8">
                      <h4>Expiring Soon</h4>
                      <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            See more
                          </a>
                    </div>
                    <div className="mb-4 flex items-center justify-between flex space-x-8">
                        <Card className="max-w-sm top-55 left-20 w-253 h-78"
                        imgAlt="image 1"
                          horizontal >
                            <div className="mb-4 flex items-center justify-between space-x-8">
                            <p className="text-base font-bold leading-none text-gray-900 dark:text-white">Potatoes</p>
                              <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Dry Pantry
                              </a>
                            </div>
                            <p className="text-yellow-500 text-xs">Only 2 left in stock</p>
                        </Card>
                        <Card className="max-w-sm top-55 left-20 w-253 h-78"
                          horizontal >
                            <div className="mb-4 flex items-center justify-between space-x-8">
                            <p className="text-base font-bold leading-none text-gray-900 dark:text-white">Mackrel Fish</p>
                              <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Fridge
                              </a>
                            </div>
                            <p className="text-red-500 text-xs">Out of stock</p>
                        </Card>
                    </div>
                  </div>
                  <div className="relative top-152 left-240 bg-gray-100  w-569 h-164 p-8 rounded-lg">
                    <div className="mb-4 flex items-center justify-between  flex space-x-8">
                      <h4>Low Stock</h4>
                      <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            See more
                          </a>
                    </div>
                    <div className="mb-4 flex items-center justify-between flex space-x-8">
                        <Card className="max-w-sm top-55 left-20 w-253 h-78"
                        imgAlt="image 1"
                          horizontal >
                            <div className="mb-4 flex items-center justify-between space-x-8">
                            <p className="text-base font-bold leading-none text-gray-900 dark:text-white">Potatoes</p>
                              <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Dry Pantry
                              </a>
                            </div>
                            <p className="text-yellow-500 text-xs">Only 2 left in stock</p>
                        </Card>
                        <Card className="max-w-sm top-55 left-20 w-253 h-78"
                          horizontal >
                            <div className="mb-4 flex items-center justify-between space-x-8">
                            <p className="text-base font-bold leading-none text-gray-900 dark:text-white">Mackrel Fish</p>
                              <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Fridge
                              </a>
                            </div>
                            <p className="text-red-500 text-xs">Out of stock</p>
                        </Card>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        </div>
    </DashboardLayout>
    //   </ConditionalRoute>
    // </ConditionalRoute>
  );
};

export default UserDashboard;
