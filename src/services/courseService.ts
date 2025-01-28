import React from 'react'
import { apiInstance } from '../constants/apiInstance';

const categoryApi = apiInstance({
    baseURL: "http://empoweru.trangiangkhanh.site/...",
});

const courseService = {
  getAllCoursePagination: async (page: number, limit: number) => {
    //   const list = await ...
    //   return list;
  }
}

export default courseService