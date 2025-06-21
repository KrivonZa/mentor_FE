import React, { useState, useEffect, useRef } from "react";
import { useChatbot } from "./ChatBotContext";
import "./Chatbot.css";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const chatBodyRef = useRef(null);

  const { messages, addMessage, clearMessages, sendMessageToAI } = useChatbot();

  // Quick action options
  const quickOptions = [
    { icon: "bi-book", text: "Khám phá khóa học", action: "browseCourses" },
    { icon: "bi-person-plus", text: "Đăng ký tài khoản", action: "register" },
    {
      icon: "bi-question-circle",
      text: "Cách thức hoạt động",
      action: "howItWorks",
    },
    { icon: "bi-headset", text: "Liên hệ hỗ trợ", action: "support" },
  ];

  // Auto scroll to bottom when new messages
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Hide notification badge after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && showBadge) {
      setShowBadge(false);
    }
  };

  const handleQuickOption = async (action, text) => {
    // Add user message
    addMessage(text, "user");

    // Show typing indicator
    setIsTyping(true);

    // Get response based on action
    let response;
    switch (action) {
      case "browseCourses":
        response = {
          text: "EmpowerU cung cấp hơn 60+ khóa học đa dạng về IT, Marketing, Kinh doanh và nhiều lĩnh vực khác. Mỗi khóa học được thiết kế để bạn có được trải nghiệm trực tiếp và cá nhân hoá nhất với mentor giàu kinh nghiệm, giúp bạn phát triển kỹ năng thực tiễn nhanh chóng.",
          buttonText: "Xem Các Khóa Học",
          buttonLink: "/courses",
        };
        break;
      case "register":
        response = {
          text: "Bạn chỉ mất 1 phút để đăng ký tài khoản EmpowerU và bắt đầu hành trình phát triển bản thân cùng mentor chuyên nghiệp. Đăng ký hoàn toàn miễn phí và dễ dàng!",
          buttonText: "Đăng Ký Tài Khoản",
          buttonLink: "/auth/signup",
        };
        break;
      case "howItWorks":
        response = {
          text: `EmpowerU kết nối bạn với mentor chuyên nghiệp qua 4 bước:<br><br> <strong>1. Đăng ký tài khoản: </strong> Đăng ký tài khoản nhanh chóng và miễn phí.<br> <strong>2. Đăng kí lớp học: </strong> Khám phá mentor và khóa học phù hợp với năng lực và đam mê của chính mình!<br> <strong>3. Theo dõi lịch học: </strong> Theo dõi và tham gia các lớp học trực tuyến với mentor. <br> <strong>4. Nhận hỗ trợ: </strong> Nhận hỗ trợ, phản hồi và phát triển kỹ năng cá nhân.`,
          buttonText: "Tìm Hiểu Thêm",
          buttonLink: "/about",
        };
        break;
      case "support":
        response = {
          text: "Đội ngũ hỗ trợ EmpowerU luôn sẵn sàng 24/7. Bạn có thể liên hệ qua email, điện thoại hoặc chat trực tiếp với chúng tôi.",
          buttonText: "Gọi Ngay",
          buttonLink: "tel:0364946910",
        };
        break;
      default:
        // Use AI for other questions
        await sendMessageToAI(text);
        setIsTyping(false);
        return;
    }

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      addMessage(
        response.text,
        "bot",
        response.buttonText,
        response.buttonLink
      );
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const message = inputValue.trim();
    setInputValue("");

    // Add user message
    addMessage(message, "user");

    // Show typing indicator
    setIsTyping(true);

    // Send to AI
    await sendMessageToAI(message);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleNavigate = (link) => {
    window.location.href = link;
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`chatbot-float ${isOpen ? "active" : ""}`}
        onClick={toggleChat}
      >
        <i className={isOpen ? "bi bi-x" : "bi bi-chat-dots"}></i>
        {showBadge && !isOpen && <span className="notification-badge">!</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window show">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="d-flex align-items-center gap-2">
              <div className="bot-avatar">
                <i className="bi bi-robot"></i>
              </div>
              <div>
                <h5>EmpowerU Assistant</h5>
                <small style={{ opacity: 0.8 }}>
                  Luôn sẵn sàng hỗ trợ bạn 24/7
                </small>
              </div>
            </div>
            <button className="chat-close" onClick={toggleChat}>
              <i className="bi bi-x"></i>
            </button>
          </div>

          {/* Chat Body */}
          <div className="chat-body" ref={chatBodyRef}>
            {/* Welcome Message */}
            {messages.length === 0 && (
              <>
                <div className="welcome-message">
                  <div className="bot-avatar">
                    <i className="bi bi-robot"></i>
                  </div>
                  <h6
                    style={{ color: "var(--dark-green)", marginBottom: "10px" }}
                  >
                    Xin chào! 👋
                  </h6>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>
                    Tôi là trợ lý ảo của EmpowerU, luôn sẵn sàng hỗ trợ bạn
                    24/7.
                    <br />
                    Bạn có thể hỏi tôi về cách xem các khóa học, cách đăng ký, hỗ trợ kỹ
                    thuật, hoặc nhận tư vấn định hướng nghề nghiệp phù hợp với
                    bản thân.
                    <br />
                    Hãy chọn một gợi ý bên dưới hoặc nhập câu hỏi của bạn để bắt
                    đầu nhé!
                  </p>
                </div>

                {/* Quick Options */}
                <div className="quick-options">
                  {quickOptions.map((option, index) => (
                    <button
                      key={index}
                      className="quick-option"
                      onClick={() =>
                        handleQuickOption(option.action, option.text)
                      }
                    >
                      <i className={option.icon}></i>
                      {option.text}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Chat Messages */}
            <div id="chatMessages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${message.sender}-message`}
                >
                  {message.sender === "bot" && (
                    <div className="bot-avatar">
                      <i className="bi bi-robot"></i>
                    </div>
                  )}
                  <div className="message-content">
                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                    {message.buttonText && message.buttonLink && (
                      <button
                        className="btn btn-sm mt-2"
                        style={{
                          background: "var(--primary-green)",
                          color: "white",
                          border: "none",
                          padding: "8px 15px",
                          borderRadius: "15px",
                          fontSize: "0.85rem",
                        }}
                        onClick={() => handleNavigate(message.buttonLink)}
                      >
                        {message.buttonText}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Typing Indicator */}
            {isTyping && (
              <div className="typing-indicator">
                <div className="bot-avatar">
                  <i className="bi bi-robot"></i>
                </div>
                <div>
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={isTyping}
            />
            <button
              className="send-btn"
              onClick={handleSendMessage}
              disabled={isTyping || !inputValue.trim()}
            >
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
