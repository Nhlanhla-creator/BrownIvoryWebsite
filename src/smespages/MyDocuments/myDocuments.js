// MyDocuments.js — updated and debugged
import { useEffect, useState } from "react";
import "./myDocuments.css";
import { getAuth } from "firebase/auth";
import { getDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebaseConfig";
import { FileText, ExternalLink } from "lucide-react";
import get from "lodash.get";
import { DOCUMENT_PATHS, checkSubmittedDocs, getDocumentURL } from "../../utils/documentUtils";
import { onAuthStateChanged } from "firebase/auth";
const DOCUMENTS = Object.keys(DOCUMENT_PATHS);

const MyDocuments = () => {
  const [profileData, setProfileData] = useState({});
  const [submittedDocuments, setSubmittedDocuments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const profileRef = doc(db, "universalProfiles", user.uid);
        const profileSnap = await getDoc(profileRef);
        if (!profileSnap.exists()) return;

        const data = profileSnap.data();
        setProfileData(data);
        const submitted = checkSubmittedDocs(DOCUMENTS, data);
        setSubmittedDocuments(submitted);
      } catch (err) {
        console.error("Failed to load user documents:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); // If not signed in, stop loading too
    }
  });

  return () => unsubscribe(); // Cleanup listener on unmount
}, []);


  const handleFileUpload = async (docLabel, file) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || !file) return;

    const storage = getStorage();
    const storageRef = ref(storage, `documents/${user.uid}/${docLabel}.pdf`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const profileRef = doc(db, "universalProfiles", user.uid);
      const path = DOCUMENT_PATHS[docLabel];

      // Handle deeply nested UpdatedAt
      const timestampPath = (() => {
        const parts = path.split(".");
        if (parts.length === 1) return `${parts[0]}UpdatedAt`;
        parts.pop();
        return `${parts.join(".")}.UpdatedAt`;
      })();

      await updateDoc(profileRef, {
        [path]: downloadURL,
        [timestampPath]: serverTimestamp(),
      });

      setSubmittedDocuments((prev) =>
        Array.from(new Set([...prev, docLabel]))
      );
      alert(`${docLabel} uploaded successfully.`);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const filteredDocuments = DOCUMENTS.filter((doc) => {
    const isSubmitted = submittedDocuments.includes(doc);
    const matchFilter =
      filter === "all" ||
      (filter === "submitted" && isSubmitted) ||
      (filter === "pending" && !isSubmitted);
    const matchSearch = doc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const renderDocumentLink = (label) => {
    const url = getDocumentURL(label, profileData);
    if (!url) return "No document uploaded";
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="document-link"
      >
        <FileText size={16} />
        <span>View Document</span>
        <ExternalLink size={14} />
      </a>
    );
  };
if (!getAuth().currentUser && !loading) {
  return <div className="empty-state">Please sign in to view documents.</div>;
}

  return (
    <div className="my-documents-wrapper">
      <div className="sidebar-space" />
      <div className="my-documents-page">
        <div className="my-documents-header">
          <div>
            <h1>My Documents</h1>
            <p>Track all your submitted documents in one place</p>
          </div>
        </div>

        <div className="document-controls">
          <div>
            {["all", "submitted", "pending"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`filter-btn ${filter === type ? "active" : ""}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search documents..."
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="empty-state">Loading documents...</div>
        ) : filteredDocuments.length === 0 ? (
          <div className="empty-state">No documents found</div>
        ) : (
          <div className="documents-table-container">
            <table className="documents-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => {
                  const isSubmitted = submittedDocuments.includes(doc);
                  const base = DOCUMENT_PATHS[doc];

                  let updatedAt;
                  if (typeof base === "string") {
                    const parts = base.split(".");
                    const timestampPath =
                      parts.length === 1
                        ? `${parts[0]}UpdatedAt`
                        : `${parts.slice(0, -1).join(".")}.UpdatedAt`;
                    updatedAt = get(profileData, timestampPath);
                  }

                  return (
                    <tr key={doc}>
                      <td>{doc}</td>
                      <td>
                        <span
                          className={`status-badge ${isSubmitted ? "status-submitted" : "status-pending"
                            }`}
                        >
                          {isSubmitted ? "Submitted" : "Pending"}
                        </span>
                      </td>
                      <td>
                        {renderDocumentLink(doc)}
                        <label className="upload-btn">
                          {isSubmitted ? "Update" : "Upload"}
                          <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileUpload(doc, e.target.files[0])}
                          />
                        </label>
                      </td>
                      <td>
                        {updatedAt?.seconds
                          ? new Date(updatedAt.seconds * 1000).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDocuments;
