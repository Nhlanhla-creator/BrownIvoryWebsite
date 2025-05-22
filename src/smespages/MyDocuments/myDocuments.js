import { useEffect, useState } from "react";
import "./myDocuments.css";
import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import get from "lodash.get"
import { ChevronDown, ChevronUp, FileText, ExternalLink, Loader } from "lucide-react";


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

  const DOCUMENT_PATHS = {
    "Pitch Deck": "enterpriseReadiness.pitchDeckFile",
    "Business Plan": "enterpriseReadiness.businessPlanFile",
    "Company Registration Certificate": "entityOverview.registrationCertificate",
    "Certified IDs of Directors & Shareholders": "ownershipManagement.certifiedIds",
    "Share Register": "ownershipManagement.shareRegister",
    "Proof of Address (Utility Bill, Lease Agreement)": "contactDetails.proofOfAddress",
    "Tax Clearance Certificate": "legalCompliance.taxClearanceCert",
    "B-BBEE Certificate": "legalCompliance.bbbeeCert",
    "VAT/UIF/PAYE/COIDA Certificates": [
      "legalCompliance.vatNumber",
      "legalCompliance.uifNumber",
      "legalCompliance.coidaNumber",
      "legalCompliance.payeNumber"
    ],
    "Industry Accreditations": "legalCompliance.industryAccreditationDocs",
    "Company Profile / Brochure": "productsServices.companyProfile",
    "Client References": "productsServices.clientReferences",
    "5 Year Budget (Income Statement, Cashflows, Balance Sheet)": "useOfFunds.budgetDocuments",
    "Previous Program Reports": "enterpriseReadiness.programReports",
    "Bank Statements (6 months)": "financialOverview.bankStatements",
    "Bank Details Confirmation Letter": "financialOverview.bankConfirmation",
    "Loan Agreements": "financialOverview.loanAgreements",
    "Financial Statements": "financialOverview.financialStatements",
    "Support Letters / Endorsements": "growthPotential.supportLetters",
    "Scope of Work": null // Placeholder if not available
  };

  const [profileData, setProfileData] = useState({});



  const getDocumentURL = (label) => {
    const path = DOCUMENT_PATHS[label];
    if (!path) return null;

    const value = Array.isArray(path)
      ? path.map(p => get(profileData, p)).find(v => !!v)
      : get(profileData, path);

    return Array.isArray(value) ? value[0] : value;
  };

  const renderDocumentLink = (label) => {
    const url = getDocumentURL(label);
    if (!url) return "No document uploaded";

    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="document-link">
        <FileText size={16} />
        <span>View Document</span>
        <ExternalLink size={14} />
      </a>
    );
  };

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
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const profileRef = doc(db, "universalProfiles", user.uid);
        const profileSnap = await getDoc(profileRef);
        if (!profileSnap.exists()) return;

        const data = profileSnap.data();
        setProfileData(data); // ✅ Save globally

        const submitted = [];

        for (const [label, path] of Object.entries(DOCUMENT_PATHS)) {
          if (!path) continue;

          const value = Array.isArray(path)
            ? path.map(p => get(data, p)).find(v => !!v)
            : get(data, path);

          if (value && (Array.isArray(value) ? value.length > 0 : true)) {
            submitted.push(label);
          }
        }

        setSubmittedDocuments(submitted);
      } catch (err) {
        console.error("Failed to load user documents:", err);
      }
    };

    fetchUserDocuments();
  }, []);

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
                            {renderDocumentLink(doc)}
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
