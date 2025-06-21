// src/App.tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ConfigProvider } from "antd";
import useRoutesElements from "./routes/useRoutesElements";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const routesElements = useRoutesElements();
  const location = useLocation();

  useEffect(() => {
    // Track page views khi route thay đổi
    if (window.gtag) {
      console.log("Tracking page view for:", location.pathname + location.search);
      window.gtag("config", "G-874WGDED57", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return (
    <ConfigProvider theme={{}}>
      <ScrollToTop />
      {routesElements}
    </ConfigProvider>
  );
}

export default App;
