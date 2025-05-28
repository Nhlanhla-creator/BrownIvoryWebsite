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
        inboxMessages.push({ id: doc.id, ...doc.data(), type: 'inbox' });
      });

      setMessages(prev => {
        const sent = prev.filter(m => m.type === 'sent');
        return [...inboxMessages, ...sent];
      });

      setUnreadCount(inboxMessages.filter(m => !m.read).length);
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
        sentMessages.push({ id: doc.id, ...doc.data(), type: 'sent' });
      });

      setMessages(prev => {
        const inbox = prev.filter(m => m.type === 'inbox');
        return [...inbox, ...sentMessages];
      });
    });

    return () => unsubscribe();
  }, []);

  const handleMessageSelect = async (message) => {
    setSelectedMessage(message);
    setMessages(prev => prev.map(m => m.id === message.id ? { ...m, read: true } : m));

    if (message.from) {
      try {
        const senderDoc = await getDoc(doc(db, "MyuniversalProfiles", message.from));
        if (senderDoc.exists()) {
          const data = senderDoc.data();
          const name = data?.formData?.entityOverview?.tradingName ||
            data?.formData?.productsServices?.funds?.[0]?.name;
          setSenderName(name || "Unnamed Sender");
        } else {
          setSenderName("Unknown Sender");
        }
      } catch {
        setSenderName("Unknown Sender");
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
        name = data?.formData?.entityOverview?.tradingName ||
          data?.formData?.productsServices?.funds?.[0]?.name || "Unnamed User";
      }
    } catch {
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
      content: `\n\n---- Forwarded Message ----\nFrom: ${selectedMessage.sender}\nDate: ${formatDate(selectedMessage.date)}\n\n${selectedMessage.content}`
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
        type: 'sent'
      };

      setMessages([sentMessage, ...messages]);
      setIsComposing(false);
      setSelectedMessage(sentMessage);
      setActiveTab('sent');
      setNewMessage({ to: '', toName: '', subject: '', content: '' });
    } catch (error) {
      console.error("Send failed:", error);
    }
  };

  const handleSaveDraft = () => {
    const draftMessage = {
      id: `draft-${Date.now()}`,
      sender: 'You',
      subject: newMessage.subject,
      content: newMessage.content,
      date: new Date().toISOString(),
      read: true,
      type: 'drafts'
    };

    setMessages([draftMessage, ...messages]);
    setIsComposing(false);
    setSelectedMessage(draftMessage);
    setActiveTab('drafts');
    setNewMessage({ to: '', subject: '', content: '' });
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  return (
    <div className="messages-page">
      <div className="messages-header">
        <h2>Messages {unreadCount > 0 && <span className="notification-dot">{unreadCount}</span>}</h2>
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="new-message-btn" onClick={() => { setIsComposing(true); setSelectedMessage(null); }}>
          + New Message
        </button>
      </div>

      <div className="messages-tabs">
        {['inbox', 'sent', 'drafts'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab); setSelectedMessage(null); }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'inbox' && ` (${unreadCount})`}
          </button>
        ))}
      </div>

      <div className="messages-container">
        <div className="messages-list">
          {filteredMessages.map(message => (
            <div
              key={message.id}
              className={`message-item ${!message.read ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
              onClick={() => handleMessageSelect(message)}
            >
              <div className="message-sender">{message.sender || message.toName}</div>
              <div className="message-subject">{message.subject}</div>
              <div className="message-preview">{message.content.substring(0, 60)}...</div>
              <div className="message-date">{formatDate(message.date)}</div>
            </div>
          ))}
        </div>

        <div className="message-content">
          {isComposing ? (
            <div className="compose-form">
              <input type="text" value={newMessage.toName} disabled />
              <input type="text" value={newMessage.subject} onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })} />
              <textarea value={newMessage.content} onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })} />
              <button onClick={handleSend}>Send</button>
              <button onClick={handleSaveDraft}>Save Draft</button>
              <button onClick={() => setIsComposing(false)}>Cancel</button>
            </div>
          ) : selectedMessage ? (
            <div className="message-view">
              <h3>{selectedMessage.subject}</h3>
              <p><strong>From:</strong> {senderName}</p>
              <p><strong>Date:</strong> {formatDate(selectedMessage.date)}</p>
              <p style={{ whiteSpace: 'pre-wrap' }}>{selectedMessage.content}</p>
              <button onClick={handleReply}>Reply</button>
              <button onClick={handleForward}>Forward</button>
              <button onClick={() => handleDelete(selectedMessage.id)}>Delete</button>
            </div>
          ) : (
            <p>Select a message to view</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
