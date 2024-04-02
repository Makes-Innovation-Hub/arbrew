import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
const getToken = () => {
  const storedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
  const token = storedUser.token;

  if (token) {
    return token; // Return the token string
  }
  return null; // Return null if the token isn't found // Example: Get the token from session storage
};
const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    tagTypes: ["Job"],
    prepareHeaders: (headers) => {
      // Call your function to get the authentication token

      const token = getToken();
      // If the token exists, set the Authorization header
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (jobObj) => ({
        url: "/job",
        method: "POST",
        body: jobObj,
      }),
      invalidatesTags: ["Job"],
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
    getAllJobs: builder.query({
      query: () => "/job",
      providesTags: ["Job"],
    }),
    getJobById: builder.query({
      query: (id) => `/job/${id}`,
      providesTags: ["Job"],
    }),
    getUserJobPosts: builder.query({
      query: () => "/job/my-job-posts",
      providesTags: ["Job"],
    }),
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `/job/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
    updateJob: builder.mutation({
      query: ({ jobId, jobUpdates }) => ({
        url: `/job/${jobId}`,
        method: "PATCH",
        body: jobUpdates,
      }),
      invalidatesTags: ["Job"],
    }),
    applyToJob: builder.mutation({
      query: ({ userId, resume, jobId }) => ({
        url: "/job/apply",
        method: "PATCH",
        body: { userId, resume, jobId },
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useGetUserJobPostsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
  useApplyToJobMutation,
} = jobApi;
export default jobApi;
