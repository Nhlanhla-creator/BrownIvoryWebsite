import React, { useState, useEffect } from 'react';
import './Messages.css';
import { collection, query, where, onSnapshot, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
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

  const filteredMessages = messages.filter(msg =>
    msg.type === activeTab &&
    (searchQuery === '' ||
      msg.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.sender?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

  const handleMessageSelect = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      await updateDoc(doc(db, "messages", msg.id), { read: true });
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
    }

    if (msg.from) {
      try {
        const senderDoc = await getDoc(doc(db, "universalProfiles", msg.from));
        if (senderDoc.exists()) {
          const data = senderDoc.data();
          const entityName =
            data?.formData?.entityOverview?.tradingName ||
            data?.formData?.entityOverview?.registeredName ||
            data?.formData?.contactDetails?.contactName ||
            "Unknown User";
          setSenderName(entityName);
        } else {
          setSenderName("Unknown");
        }
      } catch {
        setSenderName("Unknown");
      }
    }
  };

  const handleReply = async () => {
    if (!selectedMessage) return;

    let name = "Unknown";
    try {
      const docRef = await getDoc(doc(db, "MyuniversalProfiles", selectedMessage.from));
      if (docRef.exists()) {
        const data = docRef.data();
        name = data?.formData?.entityOverview?.tradingName ||
          data?.formData?.entityOverview?.registeredName || "Unnamed User";
      }
    } catch { }

    setNewMessage({
      to: selectedMessage.from,
      toName: name,
      subject: `Re: ${selectedMessage.subject}`,
      content: ''
    });
    setIsComposing(true);
  };

  const handleForward = () => {
    if (!selectedMessage) return;
    setNewMessage({
      to: '',
      toName: '',
      subject: `Fwd: ${selectedMessage.subject}`,
      content: `\n\n---- Forwarded Message ----\nFrom: ${selectedMessage.sender}\nDate: ${formatDate(selectedMessage.date)}\n\n${selectedMessage.content}`
    });
    setIsComposing(true);
  };

  const handleSend = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const base = {
      from: user.uid,
      to: newMessage.to,
      toName: newMessage.toName,
      subject: newMessage.subject,
      content: newMessage.content,
      date: new Date().toISOString(),
      read: false
    };

    await addDoc(collection(db, "messages"), { ...base, type: "inbox" });
    await addDoc(collection(db, "messages"), { ...base, read: true, type: "sent" });

    setIsComposing(false);
    setNewMessage({ to: '', toName: '', subject: '', content: '' });
    setActiveTab("sent");
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const handleSaveDraft = () => {
    const draft = {
      id: `draft-${Date.now()}`,
      subject: newMessage.subject,
      content: newMessage.content,
      date: new Date().toISOString(),
      read: true,
      type: "drafts"
    };
    setMessages([draft, ...messages]);
    setIsComposing(false);
    setActiveTab("drafts");
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
                  const timeText = timeMatch ? timeMatch[1].trim() : "Not specified";
                  const rsvpLink = timeText.includes("http") ? timeText.match(/\((.*?)\)/)?.[1] : null;

                  return (
                    <div className="meeting-details-box">
                      <h4>Meeting Details</h4>
                      <p>
                        <strong>Time:</strong>{" "}
                        {rsvpLink ? (
                          <a href={rsvpLink} target="_blank" rel="noopener noreferrer">
                            click to RSVP
                          </a>
                        ) : (
                          timeText
                        )}
                      </p>
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
