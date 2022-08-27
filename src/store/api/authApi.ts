import {createApi, BaseQueryFn} from '@reduxjs/toolkit/dist/query/react';
import axios, {AxiosRequestConfig, AxiosError} from 'axios';

// const getData = async () => {
//   const token = await AsyncStorage.getItem('token');
//   if (token !== null) {
//     return token;
//   } else {
//     return null;
//   } eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmNkMTg2MzMyODdmMzEwM2Q0OWNiMGIiLCJpYXQiOjE2NjE1NjIwODEsImV4cCI6MTY2NDE1NDA4MX0.0Q4nde6XJWrUxz8oIzYTEXr-NRj4kVBRtG6eD0D9KlY
// };

const axiosBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: ''},
  ): BaseQueryFn<{
    url: string | null;
    method: AxiosRequestConfig['method'];
    data?: {email: string; password: string};
    headers?: AxiosRequestConfig['headers'];
  }> =>
  async ({url, method, data, headers}) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        headers,
      });

      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({baseUrl: 'https://server.cum.com.ru'}),
  endpoints: build => ({
    getUserInfoWithToken: build.query({
      query: (token: string) => ({
        url: '/auth/me',
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    postLoginUser: build.mutation({
      query: ({email, password}) => ({
        url: '/auth/login',
        method: 'post',
        data: {
          email,
          password,
        },
      }),
    }),
  }),
});
