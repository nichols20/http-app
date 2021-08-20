import axios from "axios";
import logger from "./logservice";
import { toast } from "react-toastify";

/* Whenever we have a response with an error this function will get called first and then the try catch block next */
axios.interceptors.response.use(null, (error) => {
  /* I created a constant that contains the following expression which is an indicator on whether or not the error we are handling is
    expected or unexpected if there is an error response object and that status holds a value between 400 and less than 500 that means the 
    error code is expected. */
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  //If expectedError is falsey meaning it is an unexpected error we log the error and send an alert to the user
  if (!expectedError) {
    logger.log(error);
    toast.error("an unexpected error occured");
  }

  /* regardless of an unexpected or expected error we will return a rejected promise; To pass control to our catch block we need to return a rejected promise. */
  return Promise.reject(error);
});

/* export default: exports an object, inside this object I gave changed the 4 value of the 4 methods below to use the axios version
of those methods because axios is the library we're using.*/
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
