import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Message, ReadReceipt } from '../types/chatModel';

type MessageHandler = (message: Message) => void;
type ReadReceiptHandler = (readReceipt: ReadReceipt) => void;
type ConnectionStateHandler = (connected: boolean) => void;

class WebSocketClient {
  private client: Client | null = null;
  private messageHandlers: MessageHandler[] = [];
  private readReceiptHandlers: ReadReceiptHandler[] = [];
  private connectionStateHandlers: ConnectionStateHandler[] = [];

  connect(): void {
    const userToken = localStorage.getItem("USER");


    this.client = new Client({
      // webSocketFactory: () => new SockJS('http://localhost:9090/ws'),
      webSocketFactory: () => new SockJS('http://empower-u.sytes.net:9090/ws'),
      connectHeaders: {
        Authorization: `Bearer ${userToken}`,
      },
      debug: (msg: string) => {
        console.log('STOMP: ' + msg);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.client.onConnect = () => {
      // Subscribe to private messages queue
      this.client?.subscribe('/user/queue/messages', (message: IMessage) => {
        const messageData = JSON.parse(message.body) as Message;
        this.messageHandlers.forEach(handler => handler(messageData));
      });

      // Subscribe to read receipts
      this.client?.subscribe('/user/queue/read-receipts', (message: IMessage) => {
        const readReceiptData = JSON.parse(message.body) as ReadReceipt;
        this.readReceiptHandlers.forEach(handler => handler(readReceiptData));
      });

      // Notify connection established
      this.connectionStateHandlers.forEach(handler => handler(true));
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
    };

    this.client.onWebSocketClose = () => {
      this.connectionStateHandlers.forEach(handler => handler(false));
    };

    this.client.activate();
  }

  disconnect(): void {
    if (this.client && this.client.active) {
      this.client.deactivate();
    }
  }

  subscribeToConversation(conversationId: string, callback: MessageHandler): () => void {
    if (!this.client || !this.client.active) {
      console.error('Cannot subscribe: WebSocket not connected');
      return () => { };
    }

    const subscription = this.client.subscribe(`/topic/conversation.${conversationId}`, (message) => {
      const messageData = JSON.parse(message.body) as Message;
      callback(messageData);
    });

    return () => {
      subscription.unsubscribe();
    };
  }

  sendMessage(conversationId: string, content: string): void {
    if (!this.client || !this.client.active) {
      console.error('Cannot send message: WebSocket not connected');
      return;
    }

    this.client.publish({
      destination: '/app/send',
      body: JSON.stringify({
        conversationId,
        content
      })
    });
  }

  markAsRead(messageId: string): void {
    if (!this.client || !this.client.active) {
      console.error('Cannot mark as read: WebSocket not connected');
      return;
    }

    this.client.publish({
      destination: '/app/read',
      body: JSON.stringify({
        messageId
      })
    });
  }

  onMessage(handler: MessageHandler): () => void {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  onReadReceipt(handler: ReadReceiptHandler): () => void {
    this.readReceiptHandlers.push(handler);
    return () => {
      this.readReceiptHandlers = this.readReceiptHandlers.filter(h => h !== handler);
    };
  }

  onConnectionStateChange(handler: ConnectionStateHandler): () => void {
    this.connectionStateHandlers.push(handler);
    return () => {
      this.connectionStateHandlers = this.connectionStateHandlers.filter(h => h !== handler);
    };
  }
}

export default new WebSocketClient();