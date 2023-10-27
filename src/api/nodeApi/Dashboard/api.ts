// import {nodeApi} from '../axios';

// import {nodeApi} from '../axios';
import {nodeApi} from '../index';

export const accessplatformApi = nodeApi.injectEndpoints({
  endpoints: builder => ({
    getBalance: builder.mutation<any, any>({
      query: body => {
        console.log('body ', body);
        return {
          url: '/dashboard/getbalance',
          responseHandler: response => response.text(),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            getbalancerequest: {
              fri: body.mobileNumber,
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
        // return decrypt(errorResponse.data);
        return errorResponse.data;
      },
    }),
  }),
  overrideExisting: true,
});

export const {useGetBalanceMutation} = accessplatformApi;
