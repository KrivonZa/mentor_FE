import React from "react";
import CourseRender from "../components/templates/course/CourseRender";
import PageBanner from "../components/templates/PageBanner";

export const CourseLayout = () => {
  return (
    <div className="main">
      <PageBanner
        title="Các Khoá Học"
        description="Khám phá các khoá học, buổi định hướng kỹ năng nghề nghiệp và nhiều chương trình phát triển cá nhân,... được thiết kế phù hợp với bạn, cùng đội ngũ mentor chất lượng hàng đầu."
      />
      <CourseRender />
    </div>
  );
};

export default CourseLayout;
