import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginProps, RegistrationProps } from "../interfaces/user.interface";
import { setAuthToken } from "./authSlice";

// Define the base query
const baseQuery = fetchBaseQuery({
  baseUrl: "https://inventory-system-i0do.onrender.com/backend/",
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
  tagTypes: ["Inventory", "Stock", "AStock"],
  endpoints: (builder) => ({
    

    getInventory: builder.query<any, void>({
      query: () => "v1/inventory",
      providesTags: ["Inventory"],
    }),

    getStock: builder.query<any, void>({
      query: () => "v1/stock",
      providesTags: ["Stock"],
    }),

    loadUser: builder.query<any, void>({
      query: () => "v1/users/user",
    }),

    getAStock: builder.query({
      query: (stockId) => `v1/stock/${stockId}`,
      providesTags: ["AStock"],
    }),

    addStock: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "v1/stock/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Inventory", "Stock", "AStock"]
    }),

    removeStock: builder.mutation<any, any>({
      query: (stockId) => ({
        url: `v1/stock/${stockId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory", "Stock", "AStock"]
    }),

    editStock: builder.mutation<any, any>({
      query: ({ id, patch }) => ({
        url: `v1/stock/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ["Inventory", "Stock", "AStock"]
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

    registration: builder.mutation<any, RegistrationProps>({
      query: (credentials) => ({
        url: "/v1/users/register",
        method: "POST",
        body: credentials,
      }),
      // invalidatesTags: ["User"],
    }),

  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegistrationMutation,
  useLoadUserQuery,
  useGetInventoryQuery,
  useGetStockQuery,
  useEditStockMutation,
  useAddStockMutation,
  useGetAStockQuery,
  useRemoveStockMutation,
} = appApi;
