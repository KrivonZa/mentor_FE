import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

// Component Search đã được cải tiến
export default function CustomSearch({
  classFilter,
  setClassFilter,
  setCourseList,
}) {
  return (
    <div
      className="search-container"
      style={{
        maxWidth: "800px",
        margin: "0 auto 30px",
        position: "relative",
      }}
    >
      <Input.Search
        placeholder="Tìm kiếm khoá học yêu thích của bạn"
        allowClear
        enterButton={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <SearchOutlined style={{ marginRight: "5px" }} />
            <span>Tìm Kiếm</span>
          </div>
        }
        size="large"
        onSearch={(e) => {
          setCourseList({});
          setClassFilter({
            ...classFilter,
            name: e,
            page: 1,
          });
        }}
        style={{
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(95, 207, 128, 0.2)",
          transition: "all 0.3s ease",
          border: "none",
          height: "56px", 
        }}
        className="custom-search-input"
      />

      {/* CSS tùy chỉnh cho thanh search */}
      <style jsx global>{`
        .custom-search-input .ant-input-wrapper {
          height: 56px; /* Tăng chiều cao cho wrapper */
        }

        .custom-search-input .ant-input {
          border-top-left-radius: 10px !important;
          border-bottom-left-radius: 10px !important;
          border: none !important; /* Xóa viền xám */
          outline: none !important;
          font-size: 16px;
          padding: 10px 15px;
          height: 56px; /* Tăng chiều cao input */
          box-shadow: none !important;
          border-right: none !important;
          background-color: #f9f9f9; /* Màu nền nhẹ để phân biệt */
        }

        .custom-search-input .ant-input-group-addon {
          height: 56px;
        }

        /* Thay đổi styling khi focus */
        .custom-search-input .ant-input:focus,
        .custom-search-input .ant-input-focused {
          box-shadow: 0 0 0 1px #5fcf80 !important; /* Đổi thành viền xanh lá khi focus */
          border-color: #5fcf80 !important;
        }

        .custom-search-input .ant-input-affix-wrapper:focus,
        .custom-search-input .ant-input-affix-wrapper-focused {
          box-shadow: 0 0 0 1px #5fcf80 !important;
          border-color: #5fcf80 !important;
        }

        .ant-input-search-button {
          height: 56px !important;
        }

        .custom-search-input .ant-input-search-button {
          border-top-right-radius: 10px !important;
          border-bottom-right-radius: 10px !important;
          background-color:rgb(21, 135, 55) !important;
          border-color:rgb(16, 113, 45) !important;
          height: 56px !important; /* Tăng chiều cao nút tìm kiếm */
          min-width: 120px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .custom-search-input .ant-input-search-button:hover {
          background-color: #4baa6a !important;
          border-color: #4baa6a !important;
          box-shadow: 0 5px 15px rgba(75, 170, 106, 0.4);
        }

        .custom-search-input .ant-input-clear-icon {
          color: #5fcf80;
        }

        .custom-search-input:hover {
          box-shadow: 0 20px 40px rgba(16, 88, 38, 0.3);
        }

        .custom-search-input .ant-input:hover {
          border-color: transparent !important;
        }

        .custom-search-input .ant-input-affix-wrapper {
          height: 56px !important;
          border: none !important;
          padding: 0 11px !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
