"use client"

import { useState, useEffect } from "react"
import "./billing-info-investors.css"

const BillingInfoInvestors = ({
  email: initialEmail = "",
  fullName: initialFullName = "",
  companyName: initialCompanyName = "",
  history = [],
  setHistory = () => {},
  setEmail: setParentEmail = () => {},
  setFullName: setParentFullName = () => {},
  setCompanyName: setParentCompanyName = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("billing-info")

  // Local editable state
  const [email, setEmail] = useState(initialEmail)
  const [fullName, setFullName] = useState(initialFullName)
  const [companyName, setCompanyName] = useState(initialCompanyName)
  const [country, setCountry] = useState("South Africa")
  const [stateRegion, setStateRegion] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [taxId, setTaxId] = useState("")
  const [emailInvoices, setEmailInvoices] = useState(false)
  const [errors, setErrors] = useState({})

  // Sync local state with parent setters
  useEffect(() => {
    setParentEmail(email)
  }, [email])

  useEffect(() => {
    setParentFullName(fullName)
  }, [fullName])

  useEffect(() => {
    setParentCompanyName(companyName)
  }, [companyName])

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) newErrors.email = "Email is required"
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email"

    if (!fullName) newErrors.fullName = "Full name is required"
    if (!companyName) newErrors.companyName = "Company name is required"
    if (!country) newErrors.country = "Country is required"
    if (!stateRegion) newErrors.stateRegion = "State/Region is required"
    if (!address) newErrors.address = "Address is required"
    if (!city) newErrors.city = "City is required"
    if (!postalCode) newErrors.postalCode = "Postal code is required"
    if (!taxId) newErrors.taxId = "Tax ID is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validate()) {
      alert("Billing information saved successfully!")
    }
  }

  return (
    <div className="billing-container">
      <div className="tab-navigation">
        <button className={`tab-button ${activeTab === "billing-history" ? "active" : "inactive"}`} onClick={() => setActiveTab("billing-history")}>
          Billing History
        </button>
        <button className={`tab-button ${activeTab === "billing-info" ? "active" : "inactive"}`} onClick={() => setActiveTab("billing-info")}>
          Billing Info
        </button>
        <button className={`tab-button ${activeTab === "payment-methods" ? "active" : "inactive"}`} onClick={() => setActiveTab("payment-methods")}>
          Payment Methods
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "billing-info" && (
          <div>
            <h2 className="section-title">Billing Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="form-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <div className="form-error">{errors.fullName}</div>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                placeholder="Enter company name"
                className="form-input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              {errors.companyName && <div className="form-error">{errors.companyName}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Country *</label>
                <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="South Africa">South Africa</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Other">Other</option>
                </select>
                {errors.country && <div className="form-error">{errors.country}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">State/Region *</label>
                <input
                  type="text"
                  placeholder="Enter state or region"
                  className="form-input"
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                />
                {errors.stateRegion && <div className="form-error">{errors.stateRegion}</div>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Address *</label>
              <input
                type="text"
                placeholder="Street or POB"
                className="form-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && <div className="form-error">{errors.address}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="form-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && <div className="form-error">{errors.city}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Postal Code *</label>
                <input
                  type="text"
                  placeholder="Enter postal code"
                  className="form-input"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                {errors.postalCode && <div className="form-error">{errors.postalCode}</div>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tax ID *</label>
              <input
                type="text"
                placeholder="Enter tax ID"
                className="form-input"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
              />
              {errors.taxId && <div className="form-error">{errors.taxId}</div>}
            </div>

            <div className="form-group">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="emailInvoices"
                  className="form-checkbox"
                  checked={emailInvoices}
                  onChange={(e) => setEmailInvoices(e.target.checked)}
                />
                <label htmlFor="emailInvoices" className="checkbox-label">
                  I want to get invoices via email as well.
                </label>
              </div>
            </div>

            <button className="button" onClick={handleSave}>
              Save Billing Information
            </button>
          </div>
        )}

        {activeTab === "payment-methods" && (
          <div>
            <h2 className="section-title">Payment Methods</h2>

            <div className="payment-method-container">
              <h3 className="payment-method-title">Current Payment Method</h3>
              <p className="payment-description">We currently support Paystack for all transactions.</p>

              <div className="payment-method-card">
                <div className="payment-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 4C2.89543 4 2 4.89543 2 6V10C2 11.1046 2.89543 12 4 12V6H14C15.1046 6 16 5.10457 16 4H4ZM6 10C6 8.89543 6.89543 8 8 8H16C17.1046 8 18 8.89543 18 10V14C18 15.1046 17.1046 16 16 16H8C6.89543 16 6 15.1046 6 14V10ZM14 14C15.1046 14 16 13.1046 16 12C16 10.8954 15.1046 10 14 10C12.8954 10 12 10.8954 12 12C12 13.1046 12.8954 14 14 14Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="payment-details">
                  <h4 className="payment-name">Paystack</h4>
                  <p className="payment-description">Secure payment processing</p>
                </div>
                <div className="payment-status">
                  <span className="status-badge">Active</span>
                </div>
              </div>
            </div>

            <p className="note">
              Additional payment methods will be available soon. For any payment-related inquiries, please contact our
              support team.
            </p>
          </div>
        )}

        {activeTab === "billing-history" && (
          <div>
            <h2 className="section-title">Transaction History</h2>

            {history.length > 0 ? (
              <div>
                <table className="transaction-table">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Email</th>
                      <th>Plan</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((entry) => (
                      <tr key={entry.id}>
                        <td className="transaction-id">{entry.id.slice(0, 8)}...</td>
                        <td>{entry.email}</td>
                        <td>{entry.plan}</td>
                        <td>{entry.amount === 0 ? "Free" : `ZAR ${entry.amount}.00`}</td>
                        <td className="transaction-date">{entry.date}</td>
                        <td>
                          <span
                            className={
                              entry.status === "Success" || entry.status === "Active"
                                ? "status-badge-success"
                                : entry.status === "Failed"
                                  ? "status-badge-failed"
                                  : "status-badge-cancelled"
                            }
                          >
                            {entry.status}
                          </span>
                        </td>
                        <td className="transaction-details">
                          {entry.reason ? (
                            <span>{entry.reason}</span>
                          ) : entry.status === "Success" || entry.status === "Active" ? (
                            <span className="transaction-success">✓ Completed successfully</span>
                          ) : (
                            <span>-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="summary-grid">
                  <div className="summary-card summary-card-success">
                    <div className="summary-value summary-value-success">
                      {history.filter((h) => h.status === "Success" || h.status === "Active").length}
                    </div>
                    <div className="summary-label summary-label-success">Successful</div>
                  </div>
                  <div className="summary-card summary-card-failed">
                    <div className="summary-value summary-value-failed">
                      {history.filter((h) => h.status === "Failed").length}
                    </div>
                    <div className="summary-label summary-label-failed">Failed</div>
                  </div>
                  <div className="summary-card summary-card-cancelled">
                    <div className="summary-value summary-value-cancelled">
                      {history.filter((h) => h.status === "Cancelled").length}
                    </div>
                    <div className="summary-label summary-label-cancelled">Cancelled</div>
                  </div>
                  <div className="summary-card summary-card-total">
                    <div className="summary-value summary-value-total">{history.length}</div>
                    <div className="summary-label summary-label-total">Total Transactions</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <p>No transaction history available yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BillingInfoInvestors
