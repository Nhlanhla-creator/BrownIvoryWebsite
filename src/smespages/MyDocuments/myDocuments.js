import { useEffect, useState } from "react";
import "./myDocuments.css";
import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"

const MyDocuments = () => {
  const DOCUMENTS = [
    "Pitch Deck",
    "Business Plan",
    "Company Registration Certificate",
    "Certified IDs of Directors & Shareholders",
    "Share Register",
    "Proof of Address (Utility Bill, Lease Agreement)",
    "Tax Clearance Certificate",
    "Use of Funds Breakdown",
    "B-BBEE Certificate",
    "VAT/UIF/PAYE/COIDA Certificates",
    "Industry Accreditations",
    "Company Profile / Brochure",
    "Client References",
    "5 Year Budget (Income Statement, Cashflows, Balance Sheet)",
    "Previous Program Reports",
    "Bank Statements (6 months)",
    "Bank Details Confirmation Letter",
    "Loan Agreements",
    "Financial Statements",
    "Support Letters / Endorsements",
    "Scope of Work"
  ];

  const [submittedDocuments, setSubmittedDocuments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getDocumentCategory = (doc) => {
    if (doc.includes("Certificate") || doc.includes("Registration")) return "Legal Documents";
    if (doc.includes("Plan") || doc.includes("Budget") || doc.includes("Statement")) return "Financial Documents";
    if (doc.includes("Address") || doc.includes("ID") || doc.includes("Register")) return "Company Details";
    return "Other Documents";
  };

  useEffect(() => {
    const fetchUserDocuments = async () => {
      try {
        const auth = getAuth()
        const user = auth.currentUser
        if (!user) return

        const profileRef = doc(db, "universalProfiles", user.uid)
        const profileSnap = await getDoc(profileRef)
        if (!profileSnap.exists()) return

        const profileData = profileSnap.data()

        const submitted = new Set()

        // Recursively check all nested fields
        const extractDocs = (obj) => {
          if (Array.isArray(obj)) {
            obj.forEach(item => {
              if (typeof item === "string" && item.startsWith("http")) {
                // Match known document names based on rough guess
                DOCUMENTS.forEach(doc => {
                  const normalized = doc.toLowerCase().replace(/[^a-z]/g, "")
                  if (item.toLowerCase().includes(normalized.slice(0, 6))) {
                    submitted.add(doc)
                  }
                })
              } else if (typeof item === "object" && item !== null) {
                extractDocs(item)
              }
            })
          } else if (typeof obj === "object" && obj !== null) {
            Object.values(obj).forEach(value => extractDocs(value))
          }
        }

        extractDocs(profileData)
        setSubmittedDocuments(Array.from(submitted))
      } catch (err) {
        console.error("Failed to load user documents:", err)
      }
    }

    fetchUserDocuments()
  }, [])

  const handleUpload = (doc) => {
    setSubmittedDocuments([...submittedDocuments, doc]);
  };

  const handleDelete = (doc) => {
    setSubmittedDocuments(submittedDocuments.filter((d) => d !== doc));
  };

  const filteredDocuments = DOCUMENTS.filter((doc) => {
    const isSubmitted = submittedDocuments.includes(doc);
    const matchFilter =
      filter === "all" || (filter === "submitted" && isSubmitted) || (filter === "pending" && !isSubmitted);
    const matchSearch = doc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="my-documents-wrapper">
      <div className="sidebar-space" />

      <div className="my-documents-page">
        <div className="my-documents-header">
          <div>
            <h1>My Documents</h1>
            <p>Track all your submitted documents in one place</p>
          </div>
          <button className="upload-button">Upload Document</button>
        </div>

        <div className="document-controls">
          <div>
            {['all', 'submitted', 'pending'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`filter-btn ${filter === type ? 'active' : ''}`}
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

        {filteredDocuments.length === 0 ? (
          <div className="empty-state">No documents found</div>
        ) : (
          <div className="documents-table-container">
            <table className="documents-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => {
                  const isSubmitted = submittedDocuments.includes(doc);
                  return (
                    <tr key={doc}>
                      <td>{doc}</td>
                      <td>
                        <span className={`status-badge ${isSubmitted ? 'status-submitted' : 'status-pending'}`}>
                          {isSubmitted ? 'Submitted' : 'Pending'}
                        </span>
                      </td>
                      <td className="document-actions">
                        {isSubmitted ? (
                          <>
                            <button>View</button>
                            <button onClick={() => handleDelete(doc)}>Delete</button>
                          </>
                        ) : (
                          <button onClick={() => handleUpload(doc)}>Upload</button>
                        )}
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
