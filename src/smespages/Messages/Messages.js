import React, { useState, useEffect } from 'react';
import './Messages.css';
import { collection, query, where, onSnapshot, doc, getDoc, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebaseConfig";

const Messages = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [newMessage, setNewMessage] = useState({
    to: '',
    toName: '',
    subject: '',
    content: ''
  });

  const [messages, setMessages] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  // Moved formatDate to top so it's available for all JSX usage
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.sender?.toLowerCase().includes(searchQuery.toLowerCase());
    return msg.type === activeTab && (searchQuery === '' || matchesSearch);
  });

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "messages"), where("to", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const inboxMessages = [];
      querySnapshot.forEach((doc) => {
        inboxMessages.push({ id: doc.id, ...doc.data() });
      });

      setMessages((prevMessages) => {
        const sentMessages = prevMessages.filter(msg => msg.type === "sent");
        return [...inboxMessages, ...sentMessages];
      });
      setUnreadCount(inboxMessages.filter(msg => !msg.read).length);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "messages"), where("from", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sentMessages = [];
      querySnapshot.forEach((doc) => {
        sentMessages.push({ id: doc.id, ...doc.data(), type: "sent" });
      });

      setMessages((prevMessages) => {
        const inboxMessages = prevMessages.filter(msg => msg.type === "inbox");
        return [...inboxMessages, ...sentMessages];
      });
    });

    return () => unsubscribe();
  }, []);

  const handleMessageSelect = async (message) => {
    setSelectedMessage(message);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === message.id ? { ...msg, read: true } : msg
      )
    );

    if (message.from) {
      try {
        const senderDoc = await getDoc(doc(db, "MyuniversalProfiles", message.from));
        if (senderDoc.exists()) {
          const data = senderDoc.data();
          const fundName = data?.formData?.productsServices?.funds?.[0]?.name;
          setSenderName(fundName || "Unnamed Funder");
        } else {
          setSenderName("Unknown Funder");
        }
      } catch (error) {
        console.error("Error fetching sender profile:", error);
        setSenderName("Unknown Funder");
      }
    }
  };

  const handleReply = async () => {
    if (!selectedMessage) return;

    let name = "";
    try {
      const senderDoc = await getDoc(doc(db, "MyuniversalProfiles", selectedMessage.from));
      if (senderDoc.exists()) {
        const data = senderDoc.data();
        name = data?.formData?.entityOverview?.tradingName || data?.formData?.productsServices?.funds?.[0]?.name || "Unnamed User";
      }
    } catch (error) {
      console.error("Error fetching sender profile for reply:", error);
      name = "Unknown";
    }

    setIsComposing(true);
    setNewMessage({
      to: selectedMessage.from,
      toName: name,
      subject: `Re: ${selectedMessage.subject}`,
      content: ''
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

  const handleSend = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    try {
      const messageToSend = {
        from: user.uid,
        to: newMessage.to,
        toName: newMessage.toName,
        subject: newMessage.subject,
        content: newMessage.content,
        date: new Date().toISOString(),
        read: false,
        type: 'inbox',
      };

      await addDoc(collection(db, "messages"), messageToSend);

      const sentMessage = {
        ...messageToSend,
        sender: 'You',
        recipient: newMessage.to,
        type: 'sent'
      };

      setMessages([sentMessage, ...messages]);
      setIsComposing(false);
      setSelectedMessage(sentMessage);
      setActiveTab('sent');
      setNewMessage({ to: '', toName: '', subject: '', content: '' });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(filteredMessages.length > 1 ? filteredMessages[0] : null);
    }
  };

  const handleSaveDraft = () => {
    const newId = `draft-${Date.now()}`;
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
        <h2>Messages {unreadCount > 0 && <span className="notification-dot">{unreadCount}</span>}</h2>
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
        {/* Tabs */}
        <div className="messages-sidebar">
          <div className="messages-tabs">
            <button className={`tab-btn ${activeTab === 'inbox' ? 'active' : ''}`} onClick={() => { setActiveTab('inbox'); setSelectedMessage(null); }}>
              Inbox ({messages.filter(msg => msg.type === 'inbox' && !msg.read).length})
            </button>
            <button className={`tab-btn ${activeTab === 'sent' ? 'active' : ''}`} onClick={() => { setActiveTab('sent'); setSelectedMessage(null); }}>
              Sent
            </button>
            <button className={`tab-btn ${activeTab === 'drafts' ? 'active' : ''}`} onClick={() => { setActiveTab('drafts'); setSelectedMessage(null); }}>
              Drafts ({messages.filter(msg => msg.type === 'drafts').length})
            </button>
          </div>

          {/* Message list */}
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
                    <span className="message-date">{formatDate(message.date)}</span>
                    {message.attachments && message.attachments.length > 0 && (
                      <span className="attachment-indicator">📎</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-messages">{searchQuery ? 'No messages match your search' : 'No messages found'}</div>
            )}
          </div>
        </div>

        {/* Right pane content */}
        <div className="message-content">
          {isComposing ? (
            <div className="compose-message">
              <div className="compose-header">
                <h3>{selectedMessage ? 'Reply to Message' : 'New Message'}</h3>
              </div>
              <div className="compose-form">
                <div className="form-group">
                  <label>To:</label>
                  <input type="text" value={newMessage.toName} disabled placeholder="Recipient Name" />
                </div>
                <div className="form-group">
                  <label>Subject:</label>
                  <input type="text" value={newMessage.subject} onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Message:</label>
                  <textarea value={newMessage.content} onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })} rows="10" />
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
                  <div><span className="meta-label">From:</span> <span className="sender">{senderName}</span></div>
                  {selectedMessage.recipient && (
                    <div><span className="meta-label">To:</span> <span className="recipient">{selectedMessage.recipient}</span></div>
                  )}
                  <div><span className="meta-label">Date:</span> <span className="date">{formatDate(selectedMessage.date)}</span></div>
                </div>
              </div>

              <div className="message-body">
                {selectedMessage.content.split("\n\nMeeting Details:")[0] && (
                  <p style={{ whiteSpace: 'pre-wrap', marginBottom: "1rem" }}>
                    {selectedMessage.content.split("\n\nMeeting Details:")[0]}
                  </p>
                )}

                {selectedMessage.content.includes("Meeting Details:") && (() => {
                  const details = selectedMessage.content.split("\n\nMeeting Details:")[1];
                  const timeMatch = details.match(/Time:\s*(.+)/);
                  const locationMatch = details.match(/Location:\s*(.+)/);
                  const formattedTime = timeMatch ? formatDate(timeMatch[1].trim()) : "Not specified";

                  return (
                    <div className="meeting-details-box">
                      <h4>Meeting Details</h4>
                      <p><strong>Time:</strong> {formattedTime}</p>
                      <p><strong>Location:</strong> {locationMatch ? locationMatch[1].trim() : "Not specified"}</p>
                    </div>
                  );
                })()}

                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                  <div className="attachments">
                    <h4>Attachments:</h4>
                    <ul>
                      {selectedMessage.attachments.map((file, index) => (
                        <li key={index}><a href="#" className="attachment-link">{file}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="message-actions">
                <button className="reply-btn" onClick={handleReply}>Reply</button>
                <button className="forward-btn" onClick={handleForward}>Forward</button>
                <button className="delete-btn" onClick={() => handleDelete(selectedMessage.id)}>Delete</button>
              </div>
            </>
          ) : (
            <div className="no-message-selected">
              <div className="empty-state-icon">✉️</div>
              <h3>Select a message to read</h3>
              <p>Choose a message from the list to view its contents</p>
              <button className="new-message-btn" onClick={() => setIsComposing(true)}>+ New Message</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
