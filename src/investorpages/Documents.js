"use client";

import { useEffect, useState } from "react";
import "../smespages/MyDocuments/myDocuments.css";
 // Reuse the same styling
import { getAuth } from "firebase/auth";
import { getDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebaseConfig";
import { FileText, ExternalLink } from "lucide-react";
import get from "lodash.get";

// Define document labels and paths as in MyDocuments.js
const DOCUMENT_PATHS = {
  "Company Logo": "formData.entityOverview.companyLogo",
  "Certified IDs": "formData.ownershipManagement.certifiedIDs",
  "Share Register": "formData.ownershipManagement.shareRegister",
  "Registration Docs": "formData.ownershipManagement.registrationDocs",
  "Proof of Address": "formData.contactDetails.proofOfAddress",
  "Tax Clearance Certificate": "formData.legalCompliance.taxClearanceCert",
  "B-BBEE Certificate": "formData.legalCompliance.bbbeeCert",
  "Other Certificates": "formData.legalCompliance.otherCerts",
  "Industry Accreditations": "formData.legalCompliance.industryAccreditationDocs",
  "Fund Mandate": "formData.productsServices.fundMandate",
  "Fund Prospectus": "formData.productsServices.fundProspectus",
};

const DOCUMENTS = Object.keys(DOCUMENT_PATHS);

const Documents = () => {
  const [profileData, setProfileData] = useState({});
  const [submittedDocuments, setSubmittedDocuments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      const docRef = doc(db, "MyuniversalProfiles", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;

      const data = docSnap.data();
      setProfileData(data);

      const submitted = DOCUMENTS.filter(label => {
        const path = DOCUMENT_PATHS[label];
        return !!get(data, path);
      });

      setSubmittedDocuments(submitted);
    };

    fetchDocuments();
  }, []);

  const handleFileUpload = async (label, file) => {
    const user = getAuth().currentUser;
    if (!user || !file) return;

    const storage = getStorage();
    const storageRef = ref(storage, `documents/${user.uid}/${label}.pdf`);
    const downloadURL = await uploadBytes(storageRef, file).then(() =>
      getDownloadURL(storageRef)
    );

    const profileRef = doc(db, "MyuniversalProfiles", user.uid);
    const path = DOCUMENT_PATHS[label];
    const timestampField = `${path}UpdatedAt`;

    await updateDoc(profileRef, {
      [path]: downloadURL,
      [timestampField]: serverTimestamp(),
    });

    setSubmittedDocuments(prev => [...new Set([...prev, label])]);
    alert(`${label} uploaded successfully.`);
  };

  const filteredDocs = DOCUMENTS.filter(label => {
    const isSubmitted = submittedDocuments.includes(label);
    const matchesFilter =
      filter === "all" ||
      (filter === "submitted" && isSubmitted) ||
      (filter === "pending" && !isSubmitted);
    const matchesSearch = label.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderDocumentLink = (label) => {
    const url = get(profileData, DOCUMENT_PATHS[label]);
    if (!url) return "No document uploaded";
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="document-link">
        <FileText size={16} />
        <span>View Document</span>
        <ExternalLink size={14} />
      </a>
    );
  };

  return (
    <div className="my-documents-wrapper">
      <div className="sidebar-space" />
      <div className="my-documents-page">
        <div className="my-documents-header">
          <div>
            <h1>Investor Profile Documents</h1>
            <p>View and manage your submitted profile documents</p>
          </div>
        </div>

        <div className="document-controls">
          <div>
            {["all", "submitted", "pending"].map(type => (
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

        {filteredDocs.length === 0 ? (
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
                {filteredDocs.map((label) => {
                  const isSubmitted = submittedDocuments.includes(label);
                  const timestamp = get(profileData, `${DOCUMENT_PATHS[label]}UpdatedAt`);

                  return (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>
                        <span className={`status-badge ${isSubmitted ? "status-submitted" : "status-pending"}`}>
                          {isSubmitted ? "Submitted" : "Pending"}
                        </span>
                      </td>
                      <td>
                        {renderDocumentLink(label)}
                        <label className="upload-btn">
                          {isSubmitted ? "Update" : "Upload"}
                          <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileUpload(label, e.target.files[0])}
                          />
                        </label>
                      </td>
                      <td>
                        {timestamp
                          ? new Date(timestamp.seconds * 1000).toLocaleDateString()
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

export default Documents;
