import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const CMS_API_TOKEN =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDQxMjYzODgsImRydXBhbCI6eyJ1aWQiOiIyIn19.lYZ6XkfNv1Paabo95cJAYmMJpzAZd-1XQdrjV0JlK5g';

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://cmsnextgen.sandboxing.tech',
  baseUrl: 'https://momoapimdev.mtn.com/content/cms/api/',
  prepareHeaders: (headers, {getState, extra, type}) => {
    headers.set;
    headers.set('Authorization', 'Basic ' + Buffer.from("comviva" + ":" + "comviva@123").toString('base64'));
  },
});

export const apiSlice = createApi({
  // baseQuery: baseQueryWithReauth,
  reducerPath: 'api', // optional
  baseQuery,
  endpoints: builder => ({}),
});
