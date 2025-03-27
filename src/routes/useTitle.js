import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const useTitle = (titleMap, defaultTitle = "Homepage") => {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    let matchedTitle = titleMap[location.pathname] || defaultTitle;
    Object.keys(titleMap).forEach((pathTemplate) => {
      if (pathTemplate.includes(":")) {
        const regex = new RegExp(
          `^${pathTemplate.replace(/:[^\s/]+/g, "[^/]+")}$`
        );
        if (regex.test(location.pathname)) {
          matchedTitle = titleMap[pathTemplate];
        }
      }
    });

    document.title = matchedTitle;
  }, [location.pathname, titleMap, defaultTitle, params]);
};

export default useTitle;
