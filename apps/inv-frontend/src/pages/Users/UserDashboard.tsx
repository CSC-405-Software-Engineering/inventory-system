import DashboardLayout from "@/components/DashboardLayout";
import { Role, UserStateProps } from "@/store/interfaces/user.interface";
import {
  // useGetCGPAQuery,
  useLoadUserQuery,
} from "@/store/slices/appSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

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
