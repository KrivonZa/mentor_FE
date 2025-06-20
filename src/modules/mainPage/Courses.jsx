import { createContext, useEffect, useState, useMemo } from "react";
import CourseLayout from "../../layouts/CourseLayout";
import classService from "../../services/classService";

export const CourseContext = createContext({});

export const CourseProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState([]); // Store tất cả courses
  const [filteredCourses, setFilteredCourses] = useState([]); // Courses đã filter
  const [isLoading, setIsLoading] = useState(false);
  const [skillsList, setSkillsList] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    skills: [],
    priceStart: 0,
    priceEnd: 0,
    level: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 6,
    totalPages: 0,
    totalElements: 0,
  });

  // Fetch tất cả courses một lần
  const fetchAllCourses = async () => {
    setIsLoading(true);
    try {
      // Fetch nhiều pages để lấy tất cả data
      let allData = [];
      let currentPage = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await classService.getClassPagination({
          page: currentPage,
          name: "",
          perPage: 50, // Lấy nhiều item mỗi lần
          priceStart: 0,
          priceEnd: 0,
        });

        allData = [...allData, ...(response.data?.content || [])];
        hasMore = currentPage < (response.data?.totalPages || 1);
        currentPage++;
      }

      setAllCourses(allData);
      setFilteredCourses(allData); // Initially show all
    } catch (error) {
      console.error("Error fetching courses:", error);
      setAllCourses([]);
      setFilteredCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter courses 
  const filterCourses = useMemo(() => {
    let filtered = [...allCourses];

    // Filter by name
    if (searchFilters.name.trim()) {
      filtered = filtered.filter((course) =>
        course.courseDetail.courseName
          .toLowerCase()
          .includes(searchFilters.name.toLowerCase())
      );
    }

    // Filter by skills
    if (searchFilters.skills.length > 0) {
      filtered = filtered.filter((course) =>
        course.courseDetail.skills.some((skill) =>
          searchFilters.skills.includes(skill.skillID)
        )
      );
    }

    // Filter by price range
    if (searchFilters.priceStart > 0) {
      filtered = filtered.filter(
        (course) => course.price >= searchFilters.priceStart
      );
    }
    if (searchFilters.priceEnd > 0) {
      filtered = filtered.filter(
        (course) => course.price <= searchFilters.priceEnd
      );
    }

    // Filter by level
    if (searchFilters.level) {
      filtered = filtered.filter(
        (course) => course.courseDetail.courseLevel === searchFilters.level
      );
    }

    return filtered;
  }, [allCourses, searchFilters]);

  // Update filtered courses và pagination khi filter changes
  useEffect(() => {
    const filtered = filterCourses;
    setFilteredCourses(filtered);

    // Update pagination
    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / pagination.perPage);

    setPagination((prev) => ({
      ...prev,
      totalPages,
      totalElements,
      // Reset về page 1 nếu current page > totalPages
      page: prev.page > totalPages ? 1 : prev.page,
    }));
  }, [filterCourses, pagination.perPage]);

  // Get paginated courses for display
  const paginatedCourses = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;
    return filteredCourses.slice(startIndex, endIndex);
  }, [filteredCourses, pagination.page, pagination.perPage]);

  // Helper functions
  const updateSearchFilters = (newFilters) => {
    setSearchFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to page 1 when filtering
  };

  const resetFilters = () => {
    setSearchFilters({
      name: "",
      skills: [],
      priceStart: 0,
      priceEnd: 0,
      level: "",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const toggleSkillFilter = (skillId) => {
    const currentSkills = searchFilters.skills;
    const newSkills = currentSkills.includes(skillId)
      ? currentSkills.filter((id) => id !== skillId)
      : [...currentSkills, skillId];

    updateSearchFilters({ skills: newSkills });
  };

  // Initialize data
  useEffect(() => {
    fetchAllCourses();
  }, []);

  // Create courseList object for backward compatibility
  const courseList = {
    content: paginatedCourses,
    totalPages: pagination.totalPages,
    totalElements: pagination.totalElements,
    number: pagination.page - 1, // 0-based page number
    size: pagination.perPage,
  };

  return (
    <CourseContext.Provider
      value={{
        courseList,
        isLoading,
        searchFilters,
        updateSearchFilters,
        resetFilters,
        changePage,
        pagination,
        skillsList,
        toggleSkillFilter,
        allCoursesCount: allCourses.length,
        filteredCoursesCount: filteredCourses.length,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export function Courses() {
  return (
    <CourseProvider>
      <CourseLayout />
    </CourseProvider>
  );
}
