"use client"

import { useState } from "react"
import { PaystackButton } from "react-paystack"
import { v4 as uuidv4 } from "uuid"
import BillingInfo from "./billing-info"
import "./my-subscriptions.css"


const MySubscriptions = () => {
  const publicKey = "pk_test_e99e9d341c8fa3182737cd26c5838dece90e3ed9"

  // Plan configuration based on your table
  const plans = {
    basic: {
      name: "Basic",
      price: 0,
      currency: "ZAR",
      features: {
        "Subscription Fee": "ZAR 0",
        "Success Fee (% of transaction value)": "0%",
        "Filters (passive matches)": false,
        "Advanced Filters": false,
        "BIG Score": false,
        "Profile Matches and Match filters": false,
        "BIG Score Improvement Recommendations": false,
        "Dashboards and Analytics": false,
        "Featured Placement": false,
      },
    },
    standard: {
      name: "Standard",
      price: 70,
      currency: "ZAR",
      features: {
        "Subscription Fee": "ZAR 70",
        "Success Fee (% of transaction value)": "0%",
        "Filters (passive matches)": false,
        "Advanced Filters": true,
        "BIG Score": true,
        "Profile Matches and Match filters": true,
        "BIG Score Improvement Recommendations": false,
        "Dashboards and Analytics": false,
        "Featured Placement": false,
      },
    },
    premium: {
      name: "Premium",
      price: 200,
      currency: "R",
      features: {
        "Subscription Fee": "R200",
        "Success Fee (% of transaction value)": "0%",
        "Filters (passive matches)": false,
        "Advanced Filters": true,
        "BIG Score": true,
        "Profile Matches and Match filters": true,
        "BIG Score Improvement Recommendations": true,
        "Dashboards and Analytics": true,
        "Featured Placement": true,
      },
    },
  }

  const featureOrder = [
    "Subscription Fee",
    "Success Fee (% of transaction value)",
    "Filters (passive matches)",
    "Advanced Filters",
    "BIG Score",
    "Profile Matches and Match filters",
    "BIG Score Improvement Recommendations",
    "Dashboards and Analytics",
    "Featured Placement",
  ]

  const [selectedPlan, setSelectedPlan] = useState("basic")
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [history, setHistory] = useState([])
  const [errors, setErrors] = useState({})
  const [showPaystack, setShowPaystack] = useState(false)
  const [showBillingInfo, setShowBillingInfo] = useState(false)

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) newErrors.email = "Email is required"
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePlanSelect = (planKey) => {
    setSelectedPlan(planKey)
    setShowPaystack(false)
    setErrors({})
  }

  const handlePay = () => {
    if (selectedPlan === "basic") {
      // Handle basic plan activation
      const newRecord = {
        id: uuidv4(),
        email,
        plan: plans[selectedPlan].name,
        amount: 0,
        fullName: "",
        companyName: "",
        date: new Date().toLocaleString(),
        status: "Active",
      }
      setHistory([newRecord, ...history])
      alert("Basic plan activated successfully!")
      return
    }

    if (validate()) {
      if (!fullName || !companyName) {
        setShowBillingInfo(true)
      } else {
        setShowPaystack(true)
      }
    }
  }

  const handleSuccess = () => {
    const newRecord = {
      id: uuidv4(),
      email,
      plan: plans[selectedPlan].name,
      amount: plans[selectedPlan].price,
      fullName: fullName || "",
      companyName: companyName || "",
      date: new Date().toLocaleString(),
      status: "Success",
    }
    setHistory([newRecord, ...history])
    alert("Payment successful! Your plan is now active.")
    setShowPaystack(false)
  }

  const handleFailure = (response) => {
    const newRecord = {
      id: uuidv4(),
      email,
      plan: plans[selectedPlan].name,
      amount: plans[selectedPlan].price,
      fullName: fullName || "",
      companyName: companyName || "",
      date: new Date().toLocaleString(),
      status: "Failed",
      reason: response?.message || "Transaction failed",
    }
    setHistory([newRecord, ...history])
    alert("Payment failed. Please try again.")
    setShowPaystack(false)
  }

  const handleClose = () => {
    const newRecord = {
      id: uuidv4(),
      email,
      plan: plans[selectedPlan].name,
      amount: plans[selectedPlan].price,
      fullName: fullName || "",
      companyName: companyName || "",
      date: new Date().toLocaleString(),
      status: "Cancelled",
      reason: "Payment cancelled by user",
    }
    setHistory([newRecord, ...history])
    alert("Payment cancelled")
    setShowPaystack(false)
  }

  const componentProps = {
    email,
    currency: "ZAR",
    amount: plans[selectedPlan].price * 100,
    metadata: {
      companyName,
      plan: plans[selectedPlan].name,
    },
    publicKey,
    text: `Confirm & Pay R${plans[selectedPlan].price}.00`,
    onSuccess: handleSuccess,
    onUnsuccessful: handleFailure,
    onError: handleFailure,
    onClose: handleClose,
    onCancel: handleClose,
  }

  return (
    <div className="container">
      <h1 className="page-title">Choose Your Subscription Plan</h1>

      {/* Plan Comparison Table */}
      <div className="table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Basic</th>
              <th>Standard</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            {featureOrder.map((feature, index) => (
              <tr key={feature}>
                <td className="feature-name">{feature}</td>
                {Object.entries(plans).map(([planKey, plan]) => (
                  <td key={planKey}>
                    {feature === "Subscription Fee" ? (
                      <span className="subscription-fee">{plan.features[feature]}</span>
                    ) : feature === "Success Fee (% of transaction value)" ? (
                      <span className="success-fee">{plan.features[feature]}</span>
                    ) : plan.features[feature] === true ? (
                      <svg className="feature-check" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : plan.features[feature] === false ? (
                      <svg className="feature-x" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span>{plan.features[feature]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Plan Selection Cards */}
      <div className="plan-grid">
        {Object.entries(plans).map(([planKey, plan]) => (
          <div
            key={planKey}
            className={`plan-card ${selectedPlan === planKey ? "selected" : ""}`}
            onClick={() => handlePlanSelect(planKey)}
          >
            <h3 className="plan-name">{plan.name}</h3>
            <div className="plan-price">
              {plan.price === 0 ? "Free" : `${plan.currency}${plan.price}`}
              {plan.price > 0 && <span className="plan-price-period">/month</span>}
            </div>

            {selectedPlan === planKey ? (
              <div className="selected-badge">Selected Plan</div>
            ) : (
              <button className="select-button">Select {plan.name}</button>
            )}
          </div>
        ))}
      </div>

      {/* Account Information Form */}
      {!showBillingInfo && (
        <div className="form-container">
          <h2 className="form-title">{selectedPlan === "basic" ? "Account Information" : "Account Information"}</h2>

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

          {selectedPlan !== "basic" && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="form-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  className="form-input"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="summary-box">
            <div className="summary-content">
              <div className="plan-summary">
                <h3>Selected Plan: {plans[selectedPlan].name}</h3>
                <p>
                  {selectedPlan === "basic"
                    ? "Free forever"
                    : `${plans[selectedPlan].currency}${plans[selectedPlan].price}.00/month`}
                </p>
              </div>
              <div className="price-summary">
                <p>Total Amount</p>
                <p className="total-price">
                  {selectedPlan === "basic" ? "Free" : `${plans[selectedPlan].currency}${plans[selectedPlan].price}.00`}
                </p>
              </div>
            </div>
          </div>

          {!showPaystack ? (
            <button className="button" onClick={handlePay}>
              {selectedPlan === "basic"
                ? "Activate Basic Plan"
                : `Pay ${plans[selectedPlan].currency}${plans[selectedPlan].price}.00`}
            </button>
          ) : (
            <PaystackButton {...componentProps} className="button" />
          )}
        </div>
      )}

      {/* Billing Information Component */}
      {showBillingInfo && (
        <BillingInfo
          email={email}
          fullName={fullName}
          companyName={companyName}
          history={history}
          setHistory={setHistory}
          setEmail={setEmail}
          setFullName={setFullName}
          setCompanyName={setCompanyName}
        />
      )}

      {/* Billing Info Button */}
      {!showBillingInfo && (
        <div className="nav-button-container">
          <button onClick={() => setShowBillingInfo(true)} className="nav-button">
            Manage Billing Information
          </button>
        </div>
      )}

      {/* Back to Subscriptions Button */}
      {showBillingInfo && (
        <div className="nav-button-container">
          <button onClick={() => setShowBillingInfo(false)} className="nav-button">
            Back to Subscriptions
          </button>
        </div>
      )}
    </div>
  )
}

export default MySubscriptions
