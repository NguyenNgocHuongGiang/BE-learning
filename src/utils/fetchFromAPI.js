import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    token: localStorage.getItem("LOGIN_USER")
  },
};

export const axiosInstance = axios.create({
  baseURL : `${BASE_URL}`
}) 

// them 1 interceptor de gan access token vao header truoc khi request

axiosInstance.interceptors.request.use(
  (config) => {
    if(config.requireAuth){
      const token = localStorage.getItem('LOGIN_USER')
      if(token){
        config.headers["token"] = `${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const extendToken = async () => {
  let {data} = await axiosInstance.post(`auth/extend-token`, {}, {
    withCredentials: true
  })
  console.log(data);
  
  localStorage.setItem("LOGIN_USER", data.data)
  return data.data
}

//custom response de thuc hien flow refresh token
axiosInstance.interceptors.response.use(
  (response) => { return response}, // response co status 2xx
  async (error) => {
    console.log(error);
    
    const originalRequest = error.config
    console.log(originalRequest);
    
    if(error.response.status === 400){
      console.log(1);
      
      // call api tao access token moi
      const newAccessToken = await extendToken()
      originalRequest.headers["token"] = newAccessToken
      return axiosInstance(originalRequest)
    }
  }, // response co status khac 2xx
)


export const fetchFromAPI = async (url) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const getListVideo = async () => {
  const {data} = await axiosInstance.get(`${BASE_URL}/video/get-videos`,options)
  return data
}

export const getType = async () => {
  const {data} = await axiosInstance.get(`${BASE_URL}/video/get-type`,{requireAuth: true},options)
  return data
}

export const getListVideoType = async (typeId) => {
  const {data} = await axiosInstance.get(`${BASE_URL}/video/get-video-type-by-id/${typeId}`)
  return data
}

export const registerApi = async (payload) => {
  const {data} = await axiosInstance.post(`${BASE_URL}/auth/register`, payload)
  return data
}

export const loginApi = async (payload) => {
  const {data} = await axiosInstance.post(`${BASE_URL}/auth/login`, payload, {
    withCredentials: true // cho phep gui va nhan cookie tu server
  })
  return data
}


export const loginFacebookApi = async (payload) => {
  const {data} = await axiosInstance.post(`${BASE_URL}/auth/login-face`, payload)
  return data
}

export const forgotPassApi = async (email) => {
  const {data} = await axiosInstance.post(`${BASE_URL}/auth/forgot-password`, email)
  return data
}