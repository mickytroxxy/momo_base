// import {nodeApi} from '../axios';

// import {nodeApi} from '../axios';
import {CommonErrorHanlder} from '../ErrorHandler';
import {nodeApi} from '../index';
// import { apiSlice } from '../index2';

export const accessplatformApi = nodeApi.injectEndpoints({
  endpoints: builder => ({
    signInData: builder.mutation<any, any>({
      query: body => {
        console.log('body ', body);
        return {
          url: '/accessplatform/login',
          responseHandler: response => response.text(),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            loginrequest: {
              identity: body.mobileNumber,
              credential: {
                secret: body.pin,
                type: 'pincode',
              },
            },
          },
        };
      },
      transformResponse: async responseData => {
        console.log('responseData', responseData);
        // const de = await decrypt(responseData);
        // console.log('de', JSON.parse(de as string));
        return JSON.parse(responseData as string);
        // return responseData;
      },
      // transformErrorResponse: (errorResponse: any) => {
      //   console.log('errorResponse', errorResponse);
      //   // return decrypt(errorResponse.data);
      //   return JSON.parse(errorResponse.data);
      // },
      transformErrorResponse: error => {
        return CommonErrorHanlder(error);
      },
    }),
    getAccountHolderInfo: builder.mutation<any, any>({
      query: body => {
        console.log('body ', body);
        return {
          url: '/accountholderinfo/getaccountholderinfo',
          responseHandler: response => response.text(),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            getaccountholderinforequest: {
              identity: `${body.mobileNumber}`,
            },
          },
        };
      },
      transformResponse: async responseData => {
        console.log('responseData', responseData);
        // const de = await decrypt(responseData);
        // console.log('de', JSON.parse(de as string));
        return JSON.parse(responseData as string);
        // return responseData;
      },
      transformErrorResponse: (errorResponse: any) => {
        console.log('errorResponse', errorResponse);
        return CommonErrorHanlder(errorResponse);
      },
    }),
  }),
  overrideExisting: true,
});

export const {useSignInDataMutation, useGetAccountHolderInfoMutation} =
  accessplatformApi;
