import React, { createContext, useContext, useState } from "react";

// Tạo Context
const ChatbotContext = createContext();

// Hook để sử dụng context
export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};

// Cấu hình Gemini AI
const GEMINI_API_KEY = "AIzaSyDq5Eu9otnj3KD_-K7-cNei3TqePLnl2cA";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// System prompt cho Gemini
const SYSTEM_PROMPT = `
Bạn là trợ lý ảo thông minh của EmpowerU - nền tảng học tập 1-1 hàng đầu Việt Nam.

THÔNG TIN VỀ EMPOWERU:
- Nền tảng học tập cá nhân hóa 1-1 với mentor chuyên nghiệp
- 200+ mentor từ nhiều lĩnh vực: IT, Marketing, Business, Design, etc.
- 64+ khóa học chất lượng cao với phương pháp học tương tác
- Học phí từ 50,000đ - 2,000,000đ tùy theo khóa học
- Thanh toán qua PayOS hoặc ví EmpowerU
- Hỗ trợ 24/7 qua nhiều kênh

CÁC TRANG CHÍNH:
- /courses: Khóa học
- /auth/signup: Đăng ký
- /about: Giới thiệu
- /trainers: Đội Ngũ Phát Triển EmpowerU

NHIỆM VỤ:
1. Trả lời thân thiện, nhiệt tình bằng tiếng Việt
2. Cung cấp thông tin chính xác về EmpowerU
3. Hướng dẫn người dùng đến đúng trang cần thiết
4. Luôn khuyến khích trải nghiệm các dịch vụ nhưng không quảng cáo quá mức
5. Tư vấn dựa trên nhu cầu và câu hỏi của người dùng
6. Không sử dụng từ ngữ phức tạp, tránh thuật ngữ chuyên ngành
7. Nếu không chắc chắn, hãy trả lời một cách lịch sự và hướng dẫn người dùng gọi cho đội ngũ hỗ trợ
8. Không trả lời các câu hỏi ngoài phạm vi EmpowerU hoặc không liên quan đến học tập
9. Không sử dụng từ ngữ tiêu cực, luôn giữ thái độ tích cực và thân thiện
10. Không cung cấp thông tin cá nhân hoặc nhạy cảm của người dùng
11. Không khuyến khích hành vi xấu hoặc vi phạm pháp luật
12. Trả lời ngắn gọn, dễ hiểu (tối đa 150 từ)
13. Tập trung vào việc tư vấn hướng nghiệp và phát triển bản thân
14. Nếu câu hỏi không rõ ràng, hãy yêu cầu người dùng cung cấp thêm thông tin

CÁC CÂU HỎI THƯỜNG GẶP:
1. EmpowerU có những khóa học nào?
2. Làm thế nào để đăng ký tài khoản EmpowerU?
3. Học phí các khóa học là bao nhiêu?
4. Làm thế nào để thanh toán học phí?
5. EmpowerU hỗ trợ những hình thức thanh toán nào?

ĐỊNH DẠNG TRẢ LỜI:
- Câu trả lời thân thiện
- Nút hành động (nếu cần): [TEXT_NÚT|LINK]

VÍ DỤ: 
"EmpowerU có nhiều khóa học IT từ cơ bản đến nâng cao với mentor giàu kinh nghiệm. Bạn muốn tìm hiểu lĩnh vực nào cụ thể? [Khám Phá Khóa Học|/courses]"
`;

// Provider Component
export const ChatbotProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  // Thêm tin nhắn mới
  const addMessage = (text, sender, buttonText = null, buttonLink = null) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date(),
      buttonText,
      buttonLink,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  // Xóa tất cả tin nhắn
  const clearMessages = () => {
    setMessages([]);
  };

  // Gửi tin nhắn đến Gemini AI
  const sendMessageToAI = async (userMessage) => {
    try {
      // Kiểm tra API key
      if (!GEMINI_API_KEY) {
        addMessage(
          "Xin lỗi, hệ thống AI đang bảo trì. Vui lòng liên hệ trực tiếp với đội ngũ hỗ trợ để được giúp đỡ nhanh nhất!",
          "bot",
          "Liên Hệ Hỗ Trợ",
          "/contact"
        );
        return;
      }

      // Chuẩn bị context từ tin nhắn trước
      const conversationHistory = messages
        .slice(-6) // Lấy 6 tin nhắn gần nhất
        .map((msg) => `${msg.sender}: ${msg.text}`)
        .join("\n");

      const fullPrompt = `${SYSTEM_PROMPT}

LỊCH SỬ HỘI THOẠI:
${conversationHistory}

CÂUL HỎI MỚI: ${userMessage}

Hãy trả lời câu hỏi này theo định dạng yêu cầu:`;

      // Gọi Gemini API
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        let aiResponse = data.candidates[0].content.parts[0].text.trim();

        // Parse response để tách nội dung và nút hành động
        const buttonMatch = aiResponse.match(/\[([^\|]+)\|([^\]]+)\]/);
        let responseText = aiResponse;
        let buttonText = null;
        let buttonLink = null;

        if (buttonMatch) {
          responseText = aiResponse.replace(buttonMatch[0], "").trim();
          buttonText = buttonMatch[1];
          buttonLink = buttonMatch[2];
        }

        addMessage(responseText, "bot", buttonText, buttonLink);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Gemini AI Error:", error);

      // Fallback response
      const fallbackResponse = getLocalAutoReply(userMessage);
      addMessage(
        fallbackResponse.text,
        "bot",
        fallbackResponse.buttonText,
        fallbackResponse.buttonLink
      );
    }
  };

  // Fallback auto-reply khi AI không khả dụng
  const getLocalAutoReply = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("mentor")) {
      return {
        text: "Bạn có thể tìm mentor phù hợp tại trang Trainers. Chúng tôi có hơn 200+ chuyên gia từ nhiều lĩnh vực khác nhau!",
        buttonText: "Xem Danh Sách Mentor",
        buttonLink: "/trainers",
      };
    }

    if (msg.includes("khóa học") || msg.includes("course")) {
      return {
        text: "EmpowerU có 64+ khóa học chất lượng cao từ IT, Marketing đến Business. Tất cả đều được thiết kế theo phương pháp 1-1 cá nhân hóa.",
        buttonText: "Khám Phá Khóa Học",
        buttonLink: "/courses",
      };
    }

    if (
      msg.includes("giá") ||
      msg.includes("price") ||
      msg.includes("cost") ||
      msg.includes("phí")
    ) {
      return {
        text: "Học phí EmpowerU từ 50,000đ - 2,000,000đ tùy theo khóa học và mentor. Còn có nhiều khóa học miễn phí để trải nghiệm!",
        buttonText: "Xem Bảng Giá",
        buttonLink: "/courses",
      };
    }

    if (
      msg.includes("đăng ký") ||
      msg.includes("register") ||
      msg.includes("sign up")
    ) {
      return {
        text: "Đăng ký EmpowerU hoàn toàn miễn phí và chỉ mất 2 phút! Bạn sẽ có ngay quyền truy cập vào toàn bộ nền tảng.",
        buttonText: "Đăng Ký Ngay",
        buttonLink: "/auth/signup",
      };
    }

    if (msg.includes("thanh toán") || msg.includes("payment")) {
      return {
        text: "EmpowerU hỗ trợ thanh toán qua PayOS và ví điện tử EmpowerU. Giao dịch an toàn, nhanh chóng với nhiều ưu đãi!",
        buttonText: "Tìm Hiểu Thêm",
        buttonLink: "/courses",
      };
    }

    if (
      msg.includes("hỗ trợ") ||
      msg.includes("help") ||
      msg.includes("support")
    ) {
      return {
        text: "Đội ngũ EmpowerU luôn sẵn sàng hỗ trợ bạn 24/7! Bạn có thể liên hệ qua email, phone hoặc chat trực tiếp.",
        buttonText: "Liên Hệ Ngay",
        buttonLink: "/contact",
      };
    }

    if (msg.includes("cách hoạt động") || msg.includes("how it works")) {
      return {
        text: "EmpowerU hoạt động đơn giản: 1) Tìm mentor phù hợp 2) Đặt lịch học 3) Học 1-1 trực tuyến 4) Nhận feedback và phát triển kỹ năng.",
        buttonText: "Tìm Hiểu Thêm",
        buttonLink: "/about",
      };
    }

    // Default response
    return {
      text: "Cảm ơn bạn đã quan tâm đến EmpowerU! Đội ngũ hỗ trợ sẽ phản hồi sớm nhất. Trong lúc chờ đợi, bạn có thể khám phá thêm về chúng tôi.",
      buttonText: "Khám Phá EmpowerU",
      buttonLink: "/about",
    };
  };

  // Context value
  const value = {
    messages,
    addMessage,
    clearMessages,
    sendMessageToAI,
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};
