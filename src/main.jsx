import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./main.css"
import "/public/js/main.js"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "swiper/swiper-bundle.css";
//SweetAlert
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./routes/AppProvider"
import { AuthVerify } from "./thirdParty";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
        <ToastContainer />
        <AuthVerify />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
