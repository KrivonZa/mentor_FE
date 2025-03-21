// src/App.tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ConfigProvider } from "antd";
import useRoutesElements from "./routes/useRoutesElements";
import { AppProvider } from "./routes/AppProvider"
import { AuthVerify } from "./thirdParty";

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
      <AppProvider>
        <ScrollToTop />
        {routesElements}
        <AuthVerify />
      </AppProvider>
    </ConfigProvider>
  );
}

export default App;