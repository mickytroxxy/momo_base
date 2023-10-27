import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AlertMessageType, addMessage } from '@/features/alert/alertSlice';
import { updateToken } from '@/features/auth/authSlice';

const BASE_URL = 'https://momoapimdev.mtn.com/api/ae/biz/';
const CMS_BASE_URL = 'https://momoapimdev.mtn.com/content/cms/api/business_mobile_dashboard/cards/ghb'
type RequestTypes = {

}
// const setHeaders = (accessToken: any) => {
//   if (accessToken) {
//     console.log(accessToken, '--------')
//     // axios.defaults.headers.common['Cookie'] = accessToken;
//   }
// };

const message2: AlertMessageType = {
  title: 'Please try after some time',
  message: 'Please try after some time',
  duration: 2000,
  type: 'error',
};
const useFetch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  // console.log(accessToken, 'accessToken----')
  const dispatch = useDispatch()
  // useEffect(() => {
  //   //setHeaders(accessToken)
  // }, []);
  const fetchData = async (endPoint: string, method: "POST" | "GET" | "UPDATE" | "DELETE", data?: any, isHeaderNeeded: boolean = false) => {
    setIsLoading(true);
    const headers = accessToken ? {
      'Content-Type': 'application/json',
      Cookie: `${accessToken}`

    } : { 'Content-Type': 'application/json', }

    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'https://momoapimdev.mtn.com/api/ae/biz/dashboard/gettransactionhistory',
    //   headers: { 
    //     'Cookie':`${accessToken}`, 
    //     'Content-Type': 'application/json'
    //   },
    //   data : data,
    //   withCredentials: false
    // }
    // console.log(accessToken,"accessToken---------")
    try {
      const url = BASE_URL + endPoint;
      let response = null
      if (isHeaderNeeded) {
        response = await axios({ method, url, data, headers, withCredentials: false });
      } else {
        response = await axios({ method, url, data, headers, withCredentials: false });
      }
      if (response.data.status != 200) {
        setIsError(true)
        // dispatch(addMessage(message2));
      } else {
        setIsError(false)
      }
      //console.log(response,"response.data===========")
      return response.data;
    } catch (error) {
      
     //console.log(error,"axios----------");
     if (!axios.isCancel(error)) {
        //console.log(error.response.data,"axios2----------");
        const {statusCode='',message}=error.response.data
        if(statusCode === 440){
           dispatch(addMessage(message2));
         dispatch(updateToken({accessToken:null}));
        }
        console.log(error);
        // dispatch(addMessage(message2));
        setIsError(true)
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };


  // const fetchWithHeader = async (endPoint: string, method: "POST" | "GET" | "UPDATE" | "DELETE", data?: object) => {
  //   setIsLoading(true);

  //   const url = BASE_URL + endPoint;
  //   axios.post(url, { ...data }, { headers: { Cookie: accessToken } })
  //     .then(function (response) {
  //       console.log(response);
  //       setIsLoading(false);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       setIsLoading(false);
  //     });

  // };

  return {
    isLoading, fetchData, isError
    // fetchWithHeader 
  };
};

export default useFetch;