import { useState, useEffect } from "react"
import { Eye, ExternalLink, Search, Check, FileText } from "lucide-react"
import styles from "./funding.module.css"
import { db } from "../../firebaseConfig"
import { doc, getDoc, collection, getDocs, addDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import InvestorProfileSummary from "../../investorpages/InvestorUniversalProfile/investor-profile-summary";




const ADJACENT_INDUSTRIES = {
  ict: ["technology", "software", "digital services"],
  education: ["e-learning", "training", "edtech"],
  manufacturing: ["construction", "engineering", "industrial"],
  healthcare: ["medtech", "biotech", "pharmaceuticals"]
}



const FUNDING_STAGES = ["Pre-Seed", "Seed", "Series A", "Series B", "Growth"]

const DOCUMENTS = [
  "Pitch Deck",
  "Business Plan",
  "Company Registration Certificate ",
  "Certified IDs of Directors & Shareholders",
  "Share Register",
  "Proof of Address (Utility Bill, Lease Agreement)",
  "Tax Clearance Certificate",
  "Use of Funds Breakdown",
  "B-BBEE Certificate",
  "VAT/UIF/PAYE/COIDA Certificates",
  "Industry Accreditations",
  "Company Profile / Brochure",
  "Client References )",
  "5 Year Budget (Income Statement, Cashflows, Balance Sheet) ",
  "Previous Program Reports",
  "Bank Statements (6 months) ",
  "Bank Details Confirmation Letter",
  "Loan Agreements ",
  "Financial Statements",
  "Support Letters / Endorsements ",
  "Scope of Work"
]

export function FundingTable({ filters }) {
  const [funders, setFunders] = useState([])
  const [currentBusiness, setCurrentBusiness] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [statuses, setStatuses] = useState({})
  const [modalFunder, setModalFunder] = useState(null)
  const [applyingFunder, setApplyingFunder] = useState(null)
  const [selectedDocs, setSelectedDocs] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth()
        const user = auth.currentUser

        if (!user) throw new Error("User not authenticated")

        const businessRef = doc(db, "universalProfiles", user.uid)
        const businessSnap = await getDoc(businessRef)

        if (!businessSnap.exists()) throw new Error("Business profile not found")

        const businessData = {
          ...(businessSnap.data().entityOverview || {}),
          financials: businessSnap.data().financialOverview || {},
          useOfFunds: businessSnap.data().useOfFunds || {},
          smeId: user.uid
        }

        setCurrentBusiness(businessData)

        const investorsSnapshot = await getDocs(collection(db, "MyuniversalProfiles"))
        const matchedFunds = []

        investorsSnapshot.forEach(investorDoc => {
          const investorData = investorDoc.data()
          const funds = investorData.formData?.productsServices?.funds || []

          funds.forEach(fund => {
            const matchScore = calculateMatchScore(businessData, fund)

            if (matchScore >= 30) {
              matchedFunds.push({
                id: `${investorDoc.id}_${fund.name}`,
                funderId: investorDoc.id,
                name: fund.name || "Unnamed Fund",
                matchPercentage: matchScore,
                investmentType: (fund.type || []).join(", ") || "Various",
                targetStage: (fund.stages || []).join(", ") || "Various",
                ticketSize: formatTicketSize(fund.ticketMin, fund.ticketMax),
                sectorFocus: (fund.sectorFocus || []).join(", ") || "Various",
                geographicFocus: (fund.geographicFocus || []).join(", ") || "Various",
                supportOffered: (fund.supportOffered || []).join(", ") || "Not specified",
                website: investorData.formData?.contactDetails?.website || "#",
                minInvestment: Number(fund.ticketMin) || 0,
                maxInvestment: Number(fund.ticketMax) || 0
              })
            }
          })
        })

        setFunders(matchedFunds.sort((a, b) =>
          b.matchPercentage - a.matchPercentage ||
          a.minInvestment - b.minInvestment
        ))

      } catch (error) {
        setNotification({
          type: "error",
          message: "Failed to load funder data. Please try again later."
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleViewClick = async (funder) => {
    const funderId = funder.funderId;
    const profileId = funderId.split("_")[0];

    try {
      const docRef = doc(db, "MyuniversalProfiles", profileId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setModalFunder({ name: funder.name, data: data.formData }); // pass formData into summary
      } else {
        console.warn("Profile not found for funder:", funderId);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }

  const calculateMatchScore = (business, fund) => {
    let score = 0
    const businessSector = (business.economicSector || "").toLowerCase().trim()
    const businessStage = (business.operationStage || "").toLowerCase().trim()
    const businessLocation = (business.location || "").toLowerCase().trim()
    const requestedAmount = parseFloat(business.useOfFunds?.amountRequested || 0)

    if (fund.sectorFocus?.some(s => s.toLowerCase() === businessSector)) {
      score += 30
    } else if (ADJACENT_INDUSTRIES[businessSector]?.some(ai =>
      fund.sectorFocus?.includes(ai))) {
      score += 20
    }

    const stageIndex = FUNDING_STAGES.indexOf(business.operationStage)
    const fundStageIndex = FUNDING_STAGES.indexOf(fund.stages?.[0])
    if (stageIndex === fundStageIndex) {
      score += 30
    } else if (Math.abs(stageIndex - fundStageIndex) === 1) {
      score += 15
    }

    const min = parseFloat(fund.ticketMin || 0)
    const max = parseFloat(fund.ticketMax || Infinity)
    if (requestedAmount >= min && requestedAmount <= max) {
      score += 25
    } else {
      const midpoint = (min + max) / 2
      const penalty = Math.abs(requestedAmount - midpoint) / (max - min) * 25
      score += Math.max(0, 25 - penalty)
    }

    if (fund.geographicFocus?.some(l => l.toLowerCase() === businessLocation)) {
      score += 15
    }

    return Math.min(100, Math.round(score))
  }

  const formatTicketSize = (min, max) => {
    if (!min && !max) return "Not specified"
    return `R${Number(min).toLocaleString()} - R${Number(max).toLocaleString()}`
  }

  const submitApplication = async (funderId) => {
    try {
      const auth = getAuth()
      const user = auth.currentUser

      if (!user) throw new Error("User not authenticated")
      if (!currentBusiness) throw new Error("Business data not loaded")

      const funder = funders.find(f => f.id === funderId)
      if (!funder) throw new Error("Funder not found")

      const applicationData = {
        smeId: user.uid,
        funderId: funder.funderId,
        fundName: funder.name,
        smeName: currentBusiness.entityName || "Unnamed Business",
        investmentType: funder.investmentType,
        matchPercentage: funder.matchPercentage,
        location: currentBusiness.location || "Not specified",
        stage: currentBusiness.operationStage || "Not specified",
        sector: currentBusiness.economicSector || "Not specified",
        fundingNeeded: currentBusiness.useOfFunds?.amountRequested || "Not specified",
        applicationDate: new Date().toISOString().split('T')[0],
        status: "Application Received",
        teamSize: currentBusiness.teamSize || "Not specified",
        revenue: currentBusiness.financials?.annualRevenue || "Not specified",
        focusArea: currentBusiness.businessDescription || "Not specified",
        documents: selectedDocs,
        createdAt: new Date().toISOString()
      }

      await addDoc(collection(db, "investorApplications"), applicationData)

      setStatuses(prev => ({ ...prev, [funderId]: "Application Sent" }))
      setApplyingFunder(null)

      setNotification({
        type: "success",
        message: "Application submitted successfully!"
      })

    } catch (error) {
      setNotification({
        type: "error",
        message: `Failed to submit application: ${error.message}`
      })
    }
  }

  const toggleDoc = (doc) => {
    setSelectedDocs(prev =>
      prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]
    )
  }

  const closeModal = () => setModalFunder(null)

  if (loading) {
    return <div className={styles.loadingContainer}>
      <p>Loading matches...</p>
      <p>Debug info: Fetching data from Firestore</p>
    </div>
  }

  const Info = ({ label, value }) => (
    <div className="info-item p-2 rounded">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )

  return (
    <div className={modalFunder || applyingFunder ? styles.blurredContainer : ""}>
      <h2 className={styles.sectionTitle}>Funding Matches</h2>

      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      {funders.length === 0 ? (
        <div className={styles.noResults}>
          <p>No matching funders found. Try adjusting your business profile.</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.refreshButton}
          >
            Refresh Data
          </button>
        </div>
      ) : (
        <table className={styles.fundingTable}>
          <thead>
            <tr>
              <th>Funder</th>
              <th>Match</th>
              <th>Type</th>
              <th>Stage</th>
              <th>Ticket Size</th>
              <th>Sector</th>
              <th>Location</th>
              <th>Support</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {funders.map(funder => (
              <tr key={funder.id}>
                <td>{funder.name}</td>
                <td>{funder.matchPercentage}%</td>
                <td>{funder.investmentType}</td>
                <td>{funder.targetStage}</td>
                <td>{funder.ticketSize}</td>
                <td>{funder.sectorFocus}</td>
                <td>{funder.geographicFocus}</td>
                <td>{funder.supportOffered}</td>
                <td>{statuses[funder.id] || "Not Applied"}</td>
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => handleViewClick(funder)}
                  >
                    <Eye size={16} /> View
                  </button>
                  {statuses[funder.id] ? (
                    <span className={styles.sentBadge}>
                      <Check size={16} /> Sent
                    </span>
                  ) : (
                    <button
                      className={styles.applyButton}
                      onClick={() => setApplyingFunder(funder.id)}
                    >
                      Apply
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalFunder && modalFunder.data && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{modalFunder.name} Profile Summary</h3>
              <button onClick={() => setModalFunder(null)}>✖</button>
            </div>

            <div className={styles.modalBody}>
              <InvestorProfileSummary data={modalFunder.data} onEdit={() => { }} />
            </div>

            <div className={styles.modalActions}>
              <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
              <button
                onClick={() => setModalFunder(null)}
                className={styles.cancelButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {applyingFunder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Application Documents</h3>
              <button onClick={() => setApplyingFunder(null)}>✖</button>
            </div>
            <div className={styles.documentsList}>
              {/* Required Documents Section */}
              <div className={styles.requiredDocuments}>
                <p><strong>Required Documents by Funder:</strong></p>
                <ul>
                  <li>Business Plan</li>
                  <li>Pitch Deck</li>
                </ul>
              </div>

              {/* Document Checklist */}
              <p><strong>Select the relevant ones to include in your application:</strong></p>
              {DOCUMENTS.map(doc => (
                <label key={doc} className={styles.documentItem}>
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(doc)}
                    onChange={() => toggleDoc(doc)}
                  />
                  <span>{doc}</span>
                </label>
              ))}
            </div>
            <div className={styles.modalActions}>
              <button
                onClick={() => submitApplication(applyingFunder)}
                disabled={selectedDocs.length === 0}
                className={styles.submitButton}
              >
                Submit Application
              </button>
              <button
                onClick={() => setApplyingFunder(null)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
