import React from 'react';
import { apiInstance } from '../constants/apiInstance';

// API Instance
const reportApi = apiInstance({
  baseURL: "http://empoweru.trangiangkhanh.site/empoweru/sba/Report"
});

// Service Object
export const reportService = {
  getAllReportPagination: async (page: number): Promise<ReportPagination> => {
    const response = await reportApi.get(`/get-all-report?page=${0}&size=10`);
    console.log(response.data);
    return response.data;
  }
};

// Enums
export enum ReportStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  MODERATOR = "MODERATOR"
}

// Interfaces
export interface ReportPagination {
  totalElement: number;
  totalPage: number;
  currentPage: number;
  message?: string;
  data: ReportOverall[];
}

export interface ReportOverall {
  reportId: number;
  reason: string;
  reportStatus: ReportStatus;
  createdAt: string;
  updatedAt: string;
  reporterCustom: ReporterCustomBasic;
  reportedAgainstCustom: ReporterCustomBasic;
}


interface ReporterCustomBasic {
  email: string;
}

export interface ReportDetailResponse {
  reportId: number;
  reporterId: number;
  reason: string;
  reporterCustom: ReporterCustomDetail;
  reportedAgainstCustom: ReporterCustomDetail;
  reportStatus: ReportStatus;
  createdAt: string;
  updatedAt: string;
}

interface ReporterCustomDetail {
  userId: number;
  email: string;
  fullname: string;
  role: Role;
  avatar: string;
  phoneNumber: string;
  createdAt: string;
  status: boolean;
}