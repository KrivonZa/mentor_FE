import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTitle = (titleMap, defaultTitle = "Homepage") => {
  const location = useLocation();

  useEffect(() => {
    const matchedTitle = titleMap[location.pathname] || defaultTitle;
    document.title = matchedTitle;
  }, [location.pathname, titleMap, defaultTitle]);
};

export default useTitle;
