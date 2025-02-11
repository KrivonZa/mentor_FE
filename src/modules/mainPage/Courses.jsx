import { createContext, useEffect, useState } from "react";
import CourseLayout from "../../layouts/CourseLayout";
import courseService from "../../services/courseService";

export const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");

  const itemsPerPage = 10;
  const totalPages = Math.ceil(courseList.length / itemsPerPage);

  const fetchCoursePagi = async (page, filter) => {
    setIsLoading(true);
    const response = await courseService.getAllCoursePagination(page, filter);
    setCourseList(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCoursePagi(currentPage, searchFilter);
  }, [currentPage, searchFilter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <CourseContext.Provider value={{ courseList, isLoading }}>
      {children}

      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </CourseContext.Provider>
  );
};

export default function Courses() {
  return (
    <CourseProvider>
      <CourseLayout />
    </CourseProvider>
  );
}
