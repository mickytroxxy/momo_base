export type CatchErrorType = {
  status: string;
  message: any;
  data?: any;
};

export const CommonErrorHanlder = (error: any): CatchErrorType => {
  if (error) {
    const {data, status} = error;

    // Check if the error response has data
    if (data) {
      // Handle the error response data
      console.log('Error response data:', data);
      return {status: 'error', message: data, data: data}; // Return the error response
    }

    // Check if the error response has a specific message
    if (data && data.message) {
      console.log('Error response message:', data.message);
      return {status: 'error', message: data.message};
    }

    // Handle the error based on the status code
    switch (status) {
      case 400:
        console.log('Bad Request');
        return {status: 'error', message: 'Bad Request'};
      case 401:
        console.log('Unauthorized');
        return {status: 'error', message: 'Unauthorized'};
      case 404:
        console.log('Not Found');
        return {status: 'error', message: 'Not Found'};
      // Add more cases for other status codes as needed
      default:
        console.log('Unknown Error');
        return {status: 'error', message: 'Unknown Error'};
    }
  } else {
    // Handle other types of errors
    console.log('Error:', error.message);
    return {status: 'error', message: error.message};
  }
};
