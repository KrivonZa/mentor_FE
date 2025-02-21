import React from "react";
import CoursePortalTable from "../components/templates/coursePortal/CoursePortalTable";
import CourseDetailModal from "../components/templates/coursePortal/CourseDetailModal";
import LessonDetailModal from "../components/templates/coursePortal/LessonDetailModal";
import SchedulePlanModal from "../components/templates/coursePortal/SchedulePlanModal";

export const CoursePortalLayout = () => {
  return (
    <div data-aos="fade-up" data-aos-delay="100">
      <CoursePortalTable />
      <CourseDetailModal />
      <LessonDetailModal />
      <SchedulePlanModal />
    </div>
  );
};

export default CoursePortalLayout;
