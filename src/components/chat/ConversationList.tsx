import React, { useEffect, useState } from 'react';
import { Conversation } from '../../types/chatModel';
import chatService from '../../services/chatService';
import { formatDistanceToNow } from 'date-fns';

interface ConversationListProps {
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  onSelectConversation, 
  selectedConversationId 
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await chatService.getConversations();
        setConversations(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load conversations');
        setLoading(false);
        console.error(err);
      }
    };

    fetchConversations();
  }, []);

  if (loading) return <div>Loading conversations...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="conversation-list">
      <h2>Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations yet</p>
      ) : (
        <ul>
          {conversations.map(conversation => (
            <li 
              key={conversation.id} 
              className={conversation.id === selectedConversationId ? 'selected' : ''}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className="conversation-item">
                <div className="conversation-name">
                  {conversation.type === 'GROUP' 
                    ? conversation.name 
                    : conversation.participants.find(p => p.id !== conversation.id)?.fullname || 'Unknown'}
                </div>
                {conversation.latestMessage && (
                  <>
                    <div className="conversation-message">
                      {conversation.latestMessage.content.substring(0, 30)}
                      {conversation.latestMessage.content.length > 30 ? '...' : ''}
                    </div>
                    <div className="conversation-time">
                      {formatDistanceToNow(new Date(conversation.latestMessage.timestamp), { addSuffix: true })}
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};