import React, { useContext, useState, useRef, useEffect } from "react";
import { CourseContext } from "../../../modules/mainPage/Courses";

const CustomSearch = () => {
  const {
    searchFilters,
    updateSearchFilters,
    resetFilters,
    toggleSkillFilter,
    allCoursesCount,
    filteredCoursesCount,
  } = useContext(CourseContext);

    const [skillsList, setSkillsList] = useState([]);

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState(searchFilters.name || "");
  const [priceRange, setPriceRange] = useState({
    start: searchFilters.priceStart || 0,
    end: searchFilters.priceEnd || 0,
  });

  const skillsDropdownRef = useRef(null);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        skillsDropdownRef.current &&
        !skillsDropdownRef.current.contains(event.target)
      ) {
        setShowSkillsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search input với debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateSearchFilters({ name: searchValue });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  // Handle price range change
  const handlePriceChange = (type, value) => {
    const newPriceRange = {
      ...priceRange,
      [type]: parseInt(value) || 0,
    };
    setPriceRange(newPriceRange);
    updateSearchFilters({
      priceStart: newPriceRange.start,
      priceEnd: newPriceRange.end,
    });
  };

  // Get selected skills names
    const getSelectedSkillsNames = () => {
      return skillsList
        .filter((skill) => searchFilters.skills.includes(skill.skillID))
        .map((skill) => skill.skillName);
    };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "https://empoweru.com.vn:8443/empoweru/sba/skill/get-all-skill"
        );
        const data = await response.json();
        setSkillsList(data.data || []); // Adjust if API response shape is different
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    fetchSkills();
  }, []);

  // Reset Filters
  const handleReset = () => {
  resetFilters();
  setPriceRange({ start: 0, end: 0 }); // <-- Add this line
};

  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchFilters.name) count++;
    if (searchFilters.skills.length > 0) count++;
    if (searchFilters.priceStart > 0 || searchFilters.priceEnd > 0) count++;
    if (searchFilters.level) count++;
    return count;
  };

  const levelOptions = [
    { value: "", label: "Tất cả" },
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)",
        borderRadius: "25px",
        padding: "32px",
        boxShadow: "0 20px 60px rgba(95, 207, 128, 0.15)",
        border: "1px solid rgba(95, 207, 128, 0.1)",
        marginBottom: "40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(95, 207, 128, 0.1) 0%, rgba(75, 170, 106, 0.05) 100%)",
          filter: "blur(40px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          left: "-30px",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(95, 207, 128, 0.08) 0%, rgba(75, 170, 106, 0.03) 100%)",
          filter: "blur(30px)",
        }}
      />

      {/* Main Search Bar */}
      <div className="position-relative mb-4">
        <div
          style={{
            position: "relative",
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(95, 207, 128, 0.1)",
            border: "2px solid transparent",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#5fcf80";
            e.currentTarget.style.boxShadow =
              "0 15px 40px rgba(95, 207, 128, 0.2)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.boxShadow =
              "0 10px 30px rgba(95, 207, 128, 0.1)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div className="d-flex align-items-center p-2">
            <div
              style={{
                background: "linear-gradient(135deg, #5fcf80 0%, #4baa6a 100%)",
                borderRadius: "16px",
                padding: "12px",
                marginRight: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i
                className="bi bi-search"
                style={{ color: "white", fontSize: "1rem" }}
              ></i>
            </div>

            <input
              type="text"
              className="form-control border-0"
              placeholder="Tìm kiếm khóa học, kỹ năng, mentor..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                fontSize: "1rem",
                padding: "12px 0",
                background: "transparent",
                boxShadow: "none",
                outline: "none",
                color: "grey"
              }}
            />

            <button
              style={{
                background: searchFilters.name
                  ? "linear-gradient(135deg, #5fcf80 0%, #4baa6a 100%)"
                  : "rgba(95, 207, 128, 0.1)",
                color: searchFilters.name ? "white" : "#5fcf80",
                border: "none",
                borderRadius: "12px",
                padding: "8px 12px",
                marginRight: "8px",
                transition: "all 0.3s ease",
                opacity: searchFilters.name ? 1 : 0.7,
              }}
              onClick={() => {
                setSearchValue("");
                updateSearchFilters({ name: "" });
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div style={{ color: "#666", fontSize: "0.95rem" }}>
            <span style={{ fontWeight: "600", color: "#5fcf80" }}>
              {filteredCoursesCount}
            </span>{" "}
            khóa học được tìm thấy
            {getActiveFiltersCount() > 0 && (
              <span> với {getActiveFiltersCount()} bộ lọc</span>
            )}
          </div>

          <button
            style={{
              background: "linear-gradient(135deg, #5fcf80 0%, #4baa6a 100%)",
              color: "white",
              border: "none",
              borderRadius: "15px",
              padding: "10px 20px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 20px rgba(95, 207, 128, 0.3)",
              position: "relative",
            }}
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 12px 25px rgba(95, 207, 128, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(95, 207, 128, 0.3)";
            }}
          >
            <i className="bi bi-sliders me-2"></i>
            Bộ Lọc Nâng Cao
            {getActiveFiltersCount() > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "#ff4757",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div
          style={{
            background: "rgba(95, 207, 128, 0.05)",
            borderRadius: "20px",
            padding: "24px",
            border: "1px solid rgba(95, 207, 128, 0.1)",
            animation: "slideDown 0.3s ease",
            marginTop: "20px",
          }}
        >
          <div className="row g-4">
            {/* Skills Filter */}
            <div className="col-lg-4 col-md-6">
              <label
                className="form-label fw-bold"
                style={{ color: "#2d5a3d", marginBottom: "12px" }}
              >
                <i className="bi bi-tags me-2"></i>
                Kỹ Năng
              </label>
              <div className="position-relative" ref={skillsDropdownRef}>
                <div
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    border: "2px solid #e9ecef",
                    padding: "12px 16px",
                    cursor: "pointer",
                    minHeight: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#5fcf80";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(95, 207, 128, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    if (!showSkillsDropdown) {
                      e.currentTarget.style.borderColor = "#e9ecef";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  <span
                    style={{
                      color:
                        searchFilters.skills.length === 0 ? "#999" : "#333",
                    }}
                  >
                    {searchFilters.skills.length === 0
                      ? "Chọn kỹ năng..."
                      : `Đã chọn ${searchFilters.skills.length} kỹ năng`}
                  </span>
                  <i
                    className={`bi bi-chevron-${
                      showSkillsDropdown ? "up" : "down"
                    }`}
                    style={{ color: "#5fcf80" }}
                  ></i>
                </div>

                {showSkillsDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      right: "0",
                      background: "white",
                      borderRadius: "15px",
                      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
                      border: "1px solid rgba(95, 207, 128, 0.2)",
                      zIndex: 1000,
                      maxHeight: "300px",
                      overflowY: "auto",
                      marginTop: "8px",
                    }}
                  >
                    {skillsList.map((skill) => (
                      <div
                        key={skill.skillID}
                        style={{
                          padding: "12px 16px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          borderRadius: "10px",
                          margin: "4px",
                        }}
                        onClick={() => toggleSkillFilter(skill.skillID)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(95, 207, 128, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={searchFilters.skills.includes(skill.skillID)}
                          onChange={() => {}}
                          style={{
                            accentColor: "#5fcf80",
                            transform: "scale(1.2)",
                          }}
                        />
                        <span style={{ fontWeight: "500" }}>
                          {skill.skillName}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Skills Display */}
              {searchFilters.skills.length > 0 && (
                <div className="mt-3">
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {getSelectedSkillsNames().map((skillName, index) => (
                      <span
                        key={index}
                        style={{
                          background:
                            "linear-gradient(135deg, #5fcf80 0%, #4baa6a 100%)",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 8px rgba(95, 207, 128, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 6px 12px rgba(95, 207, 128, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(95, 207, 128, 0.3)";
                        }}
                      >
                        {skillName}
                        <span
                          style={{
                            background: "rgba(255, 255, 255, 0.3)",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const skill = skillsList.find(
                              (s) => s.skillName === skillName
                            );
                            if (skill) toggleSkillFilter(skill.skillID);
                          }}
                        >
                          ×
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Level Filter */}
            <div className="col-lg-4 col-md-6">
              <label
                className="form-label fw-bold"
                style={{ color: "#2d5a3d", marginBottom: "12px" }}
              >
                <i className="bi bi-bar-chart-steps me-2"></i>
                Trình Độ
              </label>
              <select
                className="form-select"
                value={searchFilters.level}
                onChange={(e) => updateSearchFilters({ level: e.target.value })}
                style={{
                  borderRadius: "15px",
                  border: "2px solid #e9ecef",
                  padding: "12px 16px",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  background: "white",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#5fcf80";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(95, 207, 128, 0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="col-lg-4 col-md-12">
              <label
                className="form-label fw-bold"
                style={{ color: "#2d5a3d", marginBottom: "12px" }}
              >
                <i className="bi bi-currency-dollar me-2"></i>
                Khoảng Giá (VNĐ)
              </label>
              <div className="d-flex align-items-center gap-3">
                <div style={{ flex: 1 }}>
                  <label
                    className="form-label"
                    style={{
                      fontSize: "0.85rem",
                      color: "#666",
                      marginBottom: "4px",
                    }}
                  >
                    Từ
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    value={priceRange.start || ""}
                    onChange={(e) => handlePriceChange("start", e.target.value)}
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #e9ecef",
                      padding: "8px 12px",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#5fcf80";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(95, 207, 128, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e9ecef";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    color: "#5fcf80",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  —
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    className="form-label"
                    style={{
                      fontSize: "0.85rem",
                      color: "#666",
                      marginBottom: "4px",
                    }}
                  >
                    Đến
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Không giới hạn"
                    value={priceRange.end || ""}
                    onChange={(e) => handlePriceChange("end", e.target.value)}
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #e9ecef",
                      padding: "8px 12px",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#5fcf80";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(95, 207, 128, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e9ecef";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
              <div
                className="mt-2"
                style={{ fontSize: "0.85rem", color: "#666" }}
              >
                {priceRange.start > 0 || priceRange.end > 0 ? (
                  <span>
                    Giá từ{" "}
                    <strong style={{ color: "#5fcf80" }}>
                      {priceRange.start?.toLocaleString() || 0}đ
                    </strong>
                    {priceRange.end > 0 && (
                      <span>
                        {" "}
                        đến{" "}
                        <strong style={{ color: "#5fcf80" }}>
                          {priceRange.end.toLocaleString()}đ
                        </strong>
                      </span>
                    )}
                  </span>
                ) : (
                  "Tất cả mức giá"
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button
              style={{
                background: "transparent",
                color: "#dc3545",
                border: "2px solid #dc3545",
                borderRadius: "12px",
                padding: "10px 20px",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onClick={handleReset}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#dc3545";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#dc3545";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Đặt Lại
            </button>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CustomSearch;
