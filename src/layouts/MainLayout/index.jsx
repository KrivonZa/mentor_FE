import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ChatBot from "../../components/ui/chatbot/ChatBot";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
       <ChatBot />
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
        style={{ display: 'none' }}
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
}