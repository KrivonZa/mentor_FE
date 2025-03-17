import React, { useEffect, useState, useRef } from 'react';
import { Conversation, Message, User } from '../../types/chatModel';
import chatService from '../../services/chatService';
import websocketService from '../../services/webSocketClient';
import { format } from 'date-fns';
import authService from '../services/authService';

interface ChatWindowProps {
  conversation: Conversation | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = authService.getCurrentUser();
  
  useEffect(() => {
    if (conversation) {
      loadMessages(true);
    }
  }, [conversation?.id]);
  
  useEffect(() => {
    if (!conversation) return;
    
    // Subscribe to new messages
    const unsubscribeMessage = websocketService.onMessage((newMsg) => {
      if (newMsg.conversationId === conversation.id) {
        setMessages(prev => [newMsg, ...prev]);
      }
    });
    
    // Subscribe to specific conversation topic
    const unsubscribeConversation = websocketService.subscribeToConversation(
      conversation.id,
      (newMsg) => {
        setMessages(prev => [newMsg, ...prev]);
      }
    );
    
    return () => {
      unsubscribeMessage();
      unsubscribeConversation();
    };
  }, [conversation]);
  
  const loadMessages = async (reset: boolean = false) => {
    if (!conversation) return;
    
    try {
      setLoading(true);
      setError(null);
      const newPage = reset ? 0 : page;
      const newMessages = await chatService.getMessages(conversation.id, newPage);
      
      if (newMessages.length === 0) {
        setHasMore(false);
      } else {
        setMessages(prev => reset ? newMessages : [...prev, ...newMessages]);
        setPage(newPage + 1);
      }
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conversation || !newMessage.trim()) return;
    
    websocketService.sendMessage(conversation.id, newMessage.trim());
    setNewMessage('');
  };
  
  const handleMarkAsRead = (messageId: string) => {
    websocketService.markAsRead(messageId);
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(scrollToBottom, [messages]);
  
  if (!conversation) {
    return <div className="chat-window empty">Select a conversation to start chatting</div>;
  }
  
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>
          {conversation.type === 'GROUP' 
            ? conversation.name 
            : conversation.participants.find(p => p.id !== currentUser?.id)?.fullname || 'Unknown'}
        </h2>
      </div>
      
      <div className="messages-container">
        {loading && page === 0 ? (
          <div className="loading">Loading messages...</div>
        ) : (
          <>
            {hasMore && (
              <button 
                className="load-more-btn" 
                onClick={() => loadMessages(false)}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load more messages'}
              </button>
            )}
            
            <div className="messages-list">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.senderId === currentUser?.id ? 'sent' : 'received'}`}
                  onMouseEnter={() => {
                    if (message.senderId !== currentUser?.id && !message.readBy.includes(currentUser?.id || '')) {
                      handleMarkAsRead(message.id);
                    }
                  }}
                >
                  <div className="message-content">{message.content}</div>
                  <div className="message-info">
                    <span className="message-time">
                      {format(new Date(message.timestamp), 'h:mm a')}
                    </span>
                    {message.senderId === currentUser?.id && (
                      <span className="read-status">
                        {message.readBy.length > 1 ? 'Read' : 'Sent'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </>
        )}
      </div>
      
      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
        />
        <button type="submit" disabled={!newMessage.trim() || loading}>
          Send
        </button>
      </form>
    </div>
  );
};