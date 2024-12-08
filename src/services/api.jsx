// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL, // Gunakan base URL dari environment
  }),
  endpoints: (builder) => ({
    getPelaporan: builder.query({
      query: ({ filterStatus, sortOrder }) =>
        `/pelaporan?filterStatus=${filterStatus}&sortOrder=${sortOrder}`,
    }),
    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/pelaporan/${id}`,
        method: 'PUT',
        body: { status },
      }),
    }),
    deletePelaporan: builder.mutation({
      query: (id) => ({
        url: `/pelaporan/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks untuk dipanggil di komponen
export const {
  useGetPelaporanQuery,
  useUpdateStatusMutation,
  useDeletePelaporanMutation,
} = api;
