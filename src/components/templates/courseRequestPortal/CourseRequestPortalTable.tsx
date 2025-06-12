import React, { useEffect, useState } from "react";
import { Tabs, Spin } from "antd";
import courseApprovalService from "../../../services/courseApprovalService";

export const CourseRequestPortalTable = () => {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [pageStat, setPageStat] = useState({
    currentPage: 1,
    totalPage: 0,
  });

  const [requestList, setRequestList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const tabItems = [
    {
      key: "ALL",
      label: (
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined">apps</span>
          <span>Tất Cả</span>
        </div>
      ),
    },
    {
      key: "PENDING",
      label: (
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-warning">
            pending
          </span>
          <span>Đang Xử Lý</span>
        </div>
      ),
    },
    {
      key: "APPROVED",
      label: (
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-success">
            check_circle
          </span>
          <span>Duyệt Thành Công</span>
        </div>
      ),
    },
    {
      key: "REJECTED",
      label: (
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-danger">cancel</span>
          <span>Bị Từ Chối</span>
        </div>
      ),
    },
  ];

  const fetchRequest = async (status: string | null) => {
    setLoading(true);
    const data = await courseApprovalService.fetchRequestForMentor(
      status === "ALL" ? null : status,
      pageStat.currentPage,
      null
    );
    setRequestList(data.data.content);
    setPageStat((prev) => ({
      ...prev,
      totalPage: data.data.totalPages,
    }));
    setLoading(false);
  };

  useEffect(() => {
    fetchRequest(activeTab === "ALL" ? null : activeTab);
  }, [activeTab, pageStat.currentPage]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setPageStat((prev) => ({ ...prev, currentPage: 1 }));
  };

  return (
    <div id="course-portal">
      <div id="webcrumbs">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">
              Quản Lý Các Yêu Cầu Duyệt Khoá Học
            </h1>
          </div>

          <Tabs
            activeKey={activeTab}
            items={tabItems}
            onChange={handleTabChange}
            className="mb-4"
          />

          <div className="bg-white rounded-lg border">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    style={{
                      borderTopLeftRadius: "25px",
                      background: "#148636",
                      color: "white",
                    }}
                    className="px-6 py-4 text-left fw-bold"
                  >
                    STT
                  </th>
                  <th
                    style={{
                      background: "#148636",
                      color: "white",
                    }}
                    className="px-6 py-4 text-left fw-bold"
                  >
                    Tên Khoá Học
                  </th>
                  <th
                    style={{
                      background: "#148636",
                      color: "white",
                    }}
                    className="px-6 py-4 text-left fw-bold"
                  >
                    Ghi Chú Sau Duyệt
                  </th>
                  <th
                    style={{
                      background: "#148636",
                      color: "white",
                    }}
                    className="px-6 py-4 text-left fw-bold"
                  >
                    Trạng Thái
                  </th>
                  <th
                    style={{
                      background: "#148636",
                      color: "white",
                      borderTopRightRadius: 25,
                    }}
                    className="px-6 py-4 text-left fw-bold"
                  >
                    Ngày Gửi Yêu Cầu
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {!loading &&
                  requestList?.map((request) => (
                    <tr
                      key={request?.courseApprovalRequestID}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        {request?.courseApprovalRequestID}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              request?.courseDetail?.thumbnail ||
                              "https://placehold.co/100x70"
                            }
                            alt="thumbnail"
                            className="rounded-lg w-[100px] h-[70px] object-cover"
                          />
                          <div>
                            <p className="font-medium">
                              {request?.courseDetail?.courseName}
                            </p>
                            <div
                              className="rich-text-content"
                              dangerouslySetInnerHTML={{
                                __html: request?.courseDetail?.description,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {request?.assigneeNote ? (
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium">
                                {request?.assigneeNote}
                              </p>
                              <p className="text-sm text-gray-500">
                                {request?.updatedAt}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`badge rounded-pill text-white px-3 py-2 
                            ${
                              request?.status === "PENDING"
                                ? "bg-warning"
                                : request?.status === "APPROVED"
                                ? "bg-success"
                                : request?.status === "REJECTED"
                                ? "bg-danger"
                                : ""
                            }`}
                        >
                          {request?.status == "PENDING" && "Đang Xử Lý"}
                          {request?.status == "APPROVED" && "Duyệt Thành Công"}
                          {request?.status == "REJECTED" && "Bị Từ Chối"}
                        </span>
                      </td>

                      <td className="px-6 py-4">{request?.createdAt}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {loading && (
              <div className="w-100">
                <Spin tip="Loading" size="small">
                  <div
                    style={{
                      padding: 50,
                      background: "rgba(0, 0, 0, 0.05)",
                      borderRadius: 4,
                    }}
                  ></div>
                </Spin>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Hiển thị trang {pageStat.currentPage} trên tổng số{" "}
              {pageStat.totalPage} trang
            </p>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={pageStat.currentPage <= 1}
                onClick={() => {
                  const newPage = pageStat.currentPage - 1;
                  setPageStat((prev) => ({
                    ...prev,
                    currentPage: newPage,
                  }));
                }}
              >
                Trang Trước
              </button>
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={pageStat.currentPage == pageStat.totalPage}
                onClick={() => {
                  const newPage = pageStat.currentPage + 1;
                  setPageStat((prev) => ({
                    ...prev,
                    currentPage: newPage,
                  }));
                }}
              >
                Kế Tiếp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRequestPortalTable;
