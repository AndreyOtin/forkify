import axios, { AxiosError } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { toast } from "react-toastify";

const BASE_URL = 'https://forkify-api.herokuapp.com/api'
const TIMEOUT = 5000;

const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  })

  api.interceptors.response.use((response) => response, (error: AxiosError<{ error: string }>) => {
    toast.error(error.response?.data.error, { toastId: error.response?.status })
    throw error;
  })

  return applyCaseMiddleware(api, { ignoreParams: true, ignoreHeaders: true })
}


export default createAPI()
