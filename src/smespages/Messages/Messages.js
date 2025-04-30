import React, { useState, useEffect } from 'react';
import './Messages.css';

const Messages = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [newMessage, setNewMessage] = useState({
    to: '',
    subject: '',
    content: ''
  });
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Investor X',
      subject: 'Meeting Request',
      content: 'We would like to schedule a meeting to discuss your proposal. Please let us know your availability for next week.',
      date: '2023-05-15',
      read: false,
      type: 'inbox',
      attachments: ['proposal_review.pdf']
    },
    {
      id: 2,
      sender: 'Partner Y',
      subject: 'Project Update',
      content: 'Here is the latest update on our joint project. We have completed phase 1 and are moving to phase 2 next week.',
      date: '2023-05-10',
      read: true,
      type: 'inbox'
    },
    {
      id: 3,
      sender: 'You',
      recipient: 'Investor Z',
      subject: 'Follow-up on funding',
      content: 'Following up on our conversation last week regarding the potential funding round.',
      date: '2023-05-08',
      read: true,
      type: 'sent'
    },
    {
      id: 4,
      sender: 'Team Member',
      subject: 'Draft: Q2 Strategy',
      content: 'Here is the draft for our Q2 strategy document. Please review and provide feedback.',
      date: '2023-05-05',
      read: true,
      type: 'drafts',
      attachments: ['q2_strategy_draft.docx']
    },
  ]);

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         msg.sender.toLowerCase().includes(searchQuery.toLowerCase());
    return msg.type === activeTab && (searchQuery === '' || matchesSearch);
  });

  useEffect(() => {
    if (filteredMessages.length > 0 && !selectedMessage) {
      setSelectedMessage(filteredMessages[0]);
    }
  }, [activeTab, filteredMessages]);

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    setMessages(messages.map(msg => 
      msg.id === message.id ? {...msg, read: true} : msg
    ));
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(filteredMessages.length > 1 ? filteredMessages[0] : null);
    }
  };

  const handleReply = () => {
    if (!selectedMessage) return;
    setIsComposing(true);
    setNewMessage({
      to: selectedMessage.sender,
      subject: `Re: ${selectedMessage.subject}`,
      content: `\n\n---- Original Message ----\nFrom: ${selectedMessage.sender}\nDate: ${selectedMessage.date}\n\n${selectedMessage.content}`
    });
  };

  const handleForward = () => {
    if (!selectedMessage) return;
    setIsComposing(true);
    setNewMessage({
      to: '',
      subject: `Fwd: ${selectedMessage.subject}`,
      content: `\n\n---- Forwarded Message ----\nFrom: ${selectedMessage.sender}\nDate: ${selectedMessage.date}\n\n${selectedMessage.content}`
    });
  };

  const handleSend = () => {
    const newId = Math.max(...messages.map(m => m.id)) + 1;
    const sentMessage = {
      id: newId,
      sender: 'You',
      recipient: newMessage.to,
      subject: newMessage.subject,
      content: newMessage.content,
      date: new Date().toISOString().split('T')[0],
      read: true,
      type: 'sent'
    };
    
    setMessages([sentMessage, ...messages]);
    setIsComposing(false);
    setSelectedMessage(sentMessage);
    setActiveTab('sent');
    setNewMessage({ to: '', subject: '', content: '' });
  };

  const handleSaveDraft = () => {
    const newId = Math.max(...messages.map(m => m.id)) + 1;
    const draftMessage = {
      id: newId,
      sender: 'You',
      subject: newMessage.subject,
      content: newMessage.content,
      date: new Date().toISOString().split('T')[0],
      read: true,
      type: 'drafts'
    };
    
    setMessages([draftMessage, ...messages]);
    setIsComposing(false);
    setSelectedMessage(draftMessage);
    setActiveTab('drafts');
    setNewMessage({ to: '', subject: '', content: '' });
  };

  return (
    <div className="messages-page">
      <div className="messages-header">
        <h2>Messages</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="new-message-btn"
            onClick={() => {
              setIsComposing(true);
              setSelectedMessage(null);
            }}
          >
            + New Message
          </button>
        </div>
      </div>
      
      <div className="messages-container">
        <div className="messages-sidebar">
          <div className="messages-tabs">
            <button
              className={`tab-btn ${activeTab === 'inbox' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('inbox');
                setSelectedMessage(null);
              }}
            >
              Inbox ({messages.filter(msg => msg.type === 'inbox' && !msg.read).length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'sent' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('sent');
                setSelectedMessage(null);
              }}
            >
              Sent
            </button>
            <button
              className={`tab-btn ${activeTab === 'drafts' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('drafts');
                setSelectedMessage(null);
              }}
            >
              Drafts ({messages.filter(msg => msg.type === 'drafts').length})
            </button>
          </div>
          
          <div className="messages-list">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message-item ${!message.read ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                  onClick={() => handleMessageSelect(message)}
                >
                  <div className="message-sender">{message.sender}</div>
                  <div className="message-subject">{message.subject}</div>
                  <div className="message-preview">{message.content.substring(0, 60)}...</div>
                  <div className="message-meta">
                    <span className="message-date">{message.date}</span>
                    {message.attachments && message.attachments.length > 0 && (
                      <span className="attachment-indicator">📎</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-messages">
                {searchQuery ? 'No messages match your search' : 'No messages found'}
              </div>
            )}
          </div>
        </div>
        
        <div className="message-content">
          {isComposing ? (
            <div className="compose-message">
              <div className="compose-header">
                <h3>{selectedMessage ? 'Reply to Message' : 'New Message'}</h3>
              </div>
              <div className="compose-form">
                <div className="form-group">
                  <label>To:</label>
                  <input 
                    type="text" 
                    value={newMessage.to}
                    onChange={(e) => setNewMessage({...newMessage, to: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Subject:</label>
                  <input 
                    type="text" 
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Message:</label>
                  <textarea 
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                    rows="10"
                  />
                </div>
                <div className="compose-actions">
                  <button className="send-btn" onClick={handleSend}>Send</button>
                  <button className="save-draft-btn" onClick={handleSaveDraft}>Save Draft</button>
                  <button className="cancel-btn" onClick={() => setIsComposing(false)}>Cancel</button>
                </div>
              </div>
            </div>
          ) : selectedMessage ? (
            <>
              <div className="message-header">
                <h3>{selectedMessage.subject}</h3>
                <div className="message-meta">
                  <div>
                    <span className="meta-label">From:</span> 
                    <span className="sender">{selectedMessage.sender}</span>
                  </div>
                  {selectedMessage.recipient && (
                    <div>
                      <span className="meta-label">To:</span> 
                      <span className="recipient">{selectedMessage.recipient}</span>
                    </div>
                  )}
                  <div>
                    <span className="meta-label">Date:</span> 
                    <span className="date">{selectedMessage.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="message-body">
                <p style={{ whiteSpace: 'pre-wrap' }}>{selectedMessage.content}</p>
                
                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                  <div className="attachments">
                    <h4>Attachments:</h4>
                    <ul>
                      {selectedMessage.attachments.map((file, index) => (
                        <li key={index}>
                          <a href="#" className="attachment-link">{file}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="message-actions">
                <button className="reply-btn" onClick={handleReply}>Reply</button>
                <button className="forward-btn" onClick={handleForward}>Forward</button>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className="no-message-selected">
              <div className="empty-state-icon">✉️</div>
              <h3>Select a message to read</h3>
              <p>Choose a message from the list to view its contents</p>
              <button 
                className="new-message-btn"
                onClick={() => setIsComposing(true)}
              >
                + New Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;