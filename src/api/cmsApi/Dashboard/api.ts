import { CMS_URLS } from '@/constants/urls';
import { apiSlice } from '../index';

const { GET_DASHBOARD_CARD, GET_DASHBOARD_BUTTON, GET_DASHBOARD_HEADER,
  GET_DASHBOARD_BUTTONFLOATING } = CMS_URLS;

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    dashboardCms: builder.query<any, any>({
      query: () => ({
        url: GET_DASHBOARD_CARD,
      }),
      transformResponse: responseData => {
        //console.log('responseData GET_DASHBOARD_CARD', responseData);
        return responseData;
      },
      keepUnusedDataFor: 300,
    }),
    dashboardbuttonCms: builder.query<any, any>({
      query: () => ({
        url: GET_DASHBOARD_BUTTON,
      }),
      transformResponse: responseData => {
        //console.log('responseData GET_DASHBOARD_BUTTON', responseData);
        return responseData;
      },
      keepUnusedDataFor: 300,
    }),
    dashboardHeaderCms: builder.query<any, any>({
      query: () => ({
        url: GET_DASHBOARD_HEADER,
      }),
      transformResponse: responseData => {
        //console.log('responseData GET_DASHBOARD_HEADER', responseData);
        return responseData;
      },
      keepUnusedDataFor: 300,
    }),
    dashboardbuttonFloatingCms: builder.query<any, any>({
      query: () => ({
        url: GET_DASHBOARD_BUTTONFLOATING,
      }),
      transformResponse: responseData => {
        //console.log('responseData GET_DASHBOARD_BUTTONFLOATING', responseData);
        return responseData;
      },
      keepUnusedDataFor: 300,
    }),
  }),
  overrideExisting: true,
});

export const { useDashboardCmsQuery, useDashboardbuttonCmsQuery, useLazyDashboardbuttonCmsQuery, useLazyDashboardCmsQuery, useDashboardbuttonFloatingCmsQuery, useLazyDashboardbuttonFloatingCmsQuery, useDashboardHeaderCmsQuery, useLazyDashboardHeaderCmsQuery } = dashboardApi;
