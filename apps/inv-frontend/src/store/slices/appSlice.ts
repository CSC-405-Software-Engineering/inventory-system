import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginProps } from "../interfaces/user.interface";
import { setAuthToken } from "./authSlice";

// Define the base query
const baseQuery = fetchBaseQuery({
  baseUrl: "backend/",
  prepareHeaders: (headers, { getState }:any) => {
    const token = getState()?.auth?.token;

    if (token) {
      headers.set("x-access-token", token);
    }
    return headers;
  },
  
});

// Create an API slice
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getHelloV1: builder.query<any, void>({
      query: () => "v1",
    }),
    getHelloV2: builder.query<any, void>({
      query: () => "v2",
    }),

    getCourses: builder.query<any, void>({
      query: () => "v1/courses",
    }),

    getCourse: builder.query<any, string>({
      query: (courseId:string) => `v1/courses/${courseId}`,
    }),

    loadUser: builder.query<any, void>({
      query: () => "v1/users/user",
      providesTags: ["User"],
    }),

    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),

    getCGPA: builder.query({
      query: (studentId) => `calculate-gpa/${studentId}`,
    }),
    

    login: builder.mutation<any, LoginProps>({
      query: (credentials) => ({
        url: "/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
      // invalidatesTags: ["User"],
      onQueryStarted: async (_:any, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.access_token);
          dispatch(setAuthToken(data.access_token));
        } catch(error) {
          dispatch(setAuthToken(null));
        }
      },
    }),

    getCurrentSession: builder.query<any, void>({
      query: () => "v1/sessions/current",
    }),

    getStudentCourses: builder.query<any, any>({
      query: (studentId) => `v1/student-courses/student/${studentId}`,
    }),

    getScheduleByProgramAndLevel: builder.query<any, { programId: string; level: string }>({
      query: ({ programId, level }) => ({
        url: `v1/schedules/by-program-level?programId=${programId}&level=${level}`,
        method: "GET",
      }),
    }),

  }),
});

// Export hooks for usage in functional components
export const {
  useGetHelloV1Query,
  useGetHelloV2Query,
  useLoginMutation,
  useGetCoursesQuery,
  useLoadUserQuery,
  useGetCurrentSessionQuery,
  useGetScheduleByProgramAndLevelQuery,
  useGetStudentCoursesQuery,
  useGetCourseQuery,
  useGetCGPAQuery,


} = appApi;
