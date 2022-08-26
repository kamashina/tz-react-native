import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import {IDriverResponse} from '../../types/DriverTypes';

const axiosBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: ''},
  ): BaseQueryFn<{
    url: string | null;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  }> =>
  async ({url, method, data, params}) => {
    try {
      const result = await axios({
        url: baseUrl + url + '.JSON',
        method,
        data,
        params,
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

export const driversApi = createApi({
  reducerPath: 'driversAPI',
  baseQuery: axiosBaseQuery({baseUrl: 'http://ergast.com/api/f1/drivers'}),
  endpoints: build => ({
    getAllDrivers: build.query({
      query: page => ({
        url: '',
        method: 'get',
        params: {offset: (page - 1) * 30, limit: 30},
      }),
    }),
    getDriverRace: build.query({
      query: driverId => ({
        url: `/${driverId}/races`,
        method: 'get',
      }),
    }),
    getOneDriverInfo: build.query({
      query: driverId => ({
        url: `/${driverId}`,
        method: 'get',
      }),
      transformResponse: (response: IDriverResponse) =>
        response?.MRData.DriverTable.Drivers[0],
    }),
  }),
});
