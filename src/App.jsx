import useRoutesElements from "./routes/useRoutesElements";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ConfigProvider } from "antd";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const routesElements = useRoutesElements();
  return (
    <ConfigProvider theme={{}}>
      <ScrollToTop />
      {routesElements}
    </ConfigProvider>
  );
}

export default App;
