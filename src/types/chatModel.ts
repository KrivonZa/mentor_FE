export interface Conversation {
    id: string;
    name: string;
    type: string;
    participants: User[];
    latestMessage: Message;
  }
  
  export interface GroupConversationCreateRequest {
    forCourseId?: string;
    name: string;
    participantEmails: string[];
  }
  
  export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    timestamp: string;
  }
  
  export interface User {
    id: string;
    fullname: string;
    email: string;
    role: Role;
    phoneNumber: string;
    avatar: string;
  }
  
  export enum Role {
    STUDENT = "STUDENT",
    ADMIN = "ADMIN",
    MENTOR = "MENTOR",
  }

  export interface ReadReceipt {
    messageId: string;
    userId: string;
    conversationId: string;
    timestamp: string;
  }
  
  