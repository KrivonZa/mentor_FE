import axios from 'axios';
import athenService from './authenService'
import { apiInstance, apiPrivateInstance } from '../constants';
import { Conversation, Message, GroupConversationCreateRequest} from '../types/chatModel';

const API_URL_LOCAL = 'http://localhost:9090/empoweru/sba/chat';
// const API_URL = 'http://empoweru.trangiangkhanh.site/empoweru/sba/chat';
const API_URL = 'http://empower-u.sytes.net:9090/empoweru/sba/chat';

const courseApi = apiInstance({
    // baseURL: API_URL
    baseURL: API_URL_LOCAL
  });
  
  const coursePrivateApi = apiPrivateInstance({
    baseURL: API_URL_LOCAL
  })

class ChatService {
  async getConversations(): Promise<Conversation[]> {
    const response = await axios.get<Conversation[]>(API_URL + 'conversations');
    return response.data;
  }
  
  async getMessages(conversationId: string, page: number = 0, size: number = 10): Promise<Message[]> {
    const response = await axios.get<Message[]>(
      `${API_URL}conversations/${conversationId}/messages?page=${page}&size=${size}`
    );
    return response.data;
  }
  
  async createOneToOneConversation(userId: string): Promise<Conversation> {
    const response = await axios.get<Conversation>(API_URL + 'conversations/direct');
    return response.data;
  }
  
  async createGroupConversation(request: GroupConversationCreateRequest): Promise<Conversation> {
    const response = await axios.post<Conversation>(API_URL + 'conversations/group', request);
    return response.data;
  }
}

export default new ChatService();