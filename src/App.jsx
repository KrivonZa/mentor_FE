import useRoutesElements from "./routes/useRoutesElements";
import { useLocation } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { AuthVerify } from "./thirdParty"

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}


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
