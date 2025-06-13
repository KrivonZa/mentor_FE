import React, { useState, useEffect } from 'react';
import chatService from '../../services/chatService';

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface NewConversationModalProps {
  onClose: () => void;
  onConversationCreated: () => void;
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({
  onClose,
  onConversationCreated
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [isGroup, setIsGroup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This would be replaced with your actual user fetch API
    const fetchUsers = async () => {
      try {
        // Replace with your actual API call
        // const response = await fetch('http://localhost:9090/api/users');
        const response = await fetch('http://empower-u.sytes.net:9090/api/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedUsers.length === 0) {
        setError('Please select at least one user');
        return;
      }

      if (isGroup) {
        if (!groupName.trim()) {
          setError('Please enter a group name');
          return;
        }

        await chatService.createGroupConversation({
          name: groupName,
          participantEmails: selectedUsers
        });
      } else {
        if (selectedUsers.length !== 1) {
          setError('Please select exactly one user for direct message');
          return;
        }

        await chatService.createOneToOneConversation(selectedUsers[0]);
      }

      onConversationCreated();
      onClose();
    } catch (err) {
      setError('Failed to create conversation');
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isGroup ? 'Create Group Chat' : 'Start Direct Message'}</h2>

        <div className="toggle-container">
          <button
            className={!isGroup ? 'active' : ''}
            onClick={() => setIsGroup(false)}
          >
            Direct Message
          </button>
          <button
            className={isGroup ? 'active' : ''}
            onClick={() => setIsGroup(true)}
          >
            Group Chat
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isGroup && (
            <div className="form-group">
              <label htmlFor="groupName">Group Name</label>
              <input
                id="groupName"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Select {isGroup ? 'Participants' : 'User'}</label>
            {loading ? (
              <div>Loading users...</div>
            ) : (
              <ul className="user-list">
                {users.map(user => (
                  <li key={user.id}>
                    <label>
                      <input
                        type={isGroup ? 'checkbox' : 'radio'}
                        name="selectedUser"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserSelect(user.id)}
                      />
                      {user.fullName} ({user.email})
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
