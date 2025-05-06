"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import "./Application.css"
import { db, auth, storage, doc, setDoc, getDoc, ref, uploadBytes, getDownloadURL } from "../../firebaseConfig"

const africanCountries = [
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo",
  "DR Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Ivory Coast",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",
]

const industrySectors = [
  "Agriculture & Agribusiness",
  "Mining & Minerals",
  "Oil & Gas",
  "Manufacturing",
  "Construction & Real Estate",
  "Retail & Wholesale Trade",
  "Transportation & Logistics",
  "Information Technology",
  "Telecommunications",
  "Financial Services",
  "Insurance",
  "Healthcare & Pharmaceuticals",
  "Education & Training",
  "Hospitality & Tourism",
  "Media & Entertainment",
  "Renewable Energy",
  "Utilities",
  "Professional Services",
  "Creative Industries",
  "Textiles & Apparel",
  "Food & Beverage",
  "Automotive",
  "Aviation & Aerospace",
  "Maritime",
  "Chemicals",
  "Biotechnology",
  "E-commerce",
  "Fintech",
  "Edtech",
  "Healthtech",
  "Artificial Intelligence",
  "Blockchain",
  "Cybersecurity",
  "Data Analytics",
  "Internet of Things",
  "Robotics",
  "3D Printing",
  "Nanotechnology",
  "Water & Sanitation",
  "Waste Management",
  "Forestry",
  "Fishing",
  "Handicrafts",
  "Social Enterprises",
  "Non-Profit Organizations",
  "Other",
]

const funderTypes = {
  "Equity Investors": [
    "Angel Investors (Early-stage, high-risk)",
    "Venture Capital (VC) Firms (Startups/growth-stage)",
    "Private Equity (PE) Firms (Mature businesses, buyouts)",
    "Corporate Venture Capital (CVC) (Strategic investments)",
    "Family Offices (Wealthy families investing directly)",
    "Crowdfunding Platforms (Equity-based)",
  ],
  "Debt Providers": [
    "Commercial Banks (Term loans, overdrafts)",
    "Non-Banking Financial Companies (NBFCs) (Flexible debt)",
    "Microfinance Institutions (MFIs) (Small-ticket loans)",
    "Peer-to-Peer (P2P) Lenders (Marketplace lending)",
    "Development Banks (SME-focused, low-interest)",
  ],
  "Alternative Financing": [
    "Revenue-Based Financing (Repay via % revenue)",
    "Convertible Note Investors (Debt → equity)",
    "Mezzanine Financing (Hybrid debt/equity)",
    "Factoring Companies (Invoice-based advances)",
    "Supply Chain Financiers (Supplier/vendor credit)",
  ],
  "Grants & Subsidies": [
    "Government Grants (Non-repayable, sector-specific)",
    "Corporate Grants (CSR/foundation funding)",
    "International Aid Agencies (UNDP, World Bank)",
  ],
  "Specialized Funders": [
    "Impact Investors (ESG/social impact focus)",
    "Real Estate Financiers (Property-backed loans)",
    "Equipment Lessors (Hardware/tech leasing)",
    "Franchise Financiers (Franchise-specific capital)",
  ],
  Other: [
    "Incubators/Accelerators (Funding + mentorship)",
    "Tokenized Investment Pools (Crypto/DeFi)",
    "Trade Unions/Associations (Sector-specific loans)",
  ],
}

const fundingTypes = [
  "Equity Investment",
  "Debt Financing",
  "Convertible Debt",
  "Revenue-Based Financing",
  "Grants",
  "Mezzanine Financing",
  "Venture Debt",
  "Asset-Based Lending",
  "Invoice Factoring",
  "Equipment Leasing",
  "Microloans",
  "Crowdfunding",
  "Tokenized Funding",
]

const businessModels = [
  "Manufacturer",
  "Retailer",
  "E-commerce",
  "Private Label / White Label",
  "Consulting / Agency",
  "Freemium",
  "Subscription",
  "Pay-Per-Use",
  "Time-Based Billing",
  "Marketplace",
  "Two-Sided Platform",
  "Peer-to-Peer (P2P)",
  "Aggregator",
  "Licensing",
  "Franchise",
  "Patent Licensing",
  "SaaS (Software as a Service)",
  "PaaS / IaaS",
  "Open-Source + Support",
  "Data Monetization",
  "Brokerage",
  "Lending / Credit",
  "Leasing",
  "Crowdfunding",
  "Razor and Blade",
  "Freemium-to-Paid Upgrade",
  "Pay-What-You-Want",
  "Usage-Based Pricing",
  "Circular Economy",
  "Other",
]

const businessStages = [
  "Idea Stage",
  "Concept Validation",
  "Prototype Ready",
  "MVP Launched",
  "Early Traction",
  "Revenue-Generating",
  "Product-Market Fit",
  "Scaling / Growth",
  "Expansion / Internationalization",
  "Established / Mature",
  "Pivoting",
  "Exit Stage (e.g. Acquisition / IPO)",
]

const bbbeeStatuses = [
  "Level 1 Contributor",
  "Level 2 Contributor",
  "Level 3 Contributor",
  "Level 4 Contributor",
  "Level 5 Contributor",
  "Level 6 Contributor",
  "Level 7 Contributor",
  "Level 8 Contributor",
  "Non-Compliant",
  "Not Applicable",
]

const profitabilityStatuses = ["Pre-Revenue", "Break-Even", "Profitable", "Loss-Making"]

const summarySteps = [
  "Company Overview",
  "Ownership & Compliance",
  "Financial Due Diligence",
  "Operational Due Diligence",
  "Pitch & Market",
]

const summaryStepContent = {
  "Company Overview": ["companyDescription", "businessModel", "stageOfBusiness", "targetMarket", "keyProducts"],
  "Ownership & Compliance": [
    "ownershipStructure",
    "bbbeeStatus",
    "taxClearance",
    "registrationNumber",
    "registrationDoc",
    "directorIds",
    "shareholderCerts",
  ],
  "Financial Due Diligence": [
    "annualRevenue",
    "profitabilityStatus",
    "fundingRound",
    "askAmount",
    "useOfFunds",
    "financialStatements",
    "accountingSoftware",
  ],
  "Operational Due Diligence": [
    "keyPartners",
    "keyActivities",
    "revenueStreams",
    "keyResources",
    "valueProposition",
    "channels",
    "costStructure",
    "customerSegments",
    "customerRelationships",
  ],
  "Pitch & Market": ["pitchDeck"],
}

const formatSectionName = (name) => {
  return name.replace(/\s+/g, "")
}

const ApplicationSummary = () => {
  const [applicationData, setApplicationData] = useState({})
  const [loading, setLoading] = useState(true)

  const loadAllApplicationData = async () => {
    try {
      if (!auth.currentUser) {
        setLoading(false)
        return
      }

      const data = {}
      for (const step of summarySteps) {
        const docName = formatSectionName(step)
        const docRef = doc(db, "SMEs", auth.currentUser.uid, "application", docName)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          data[step] = docSnap.data()
        }
      }
      setApplicationData(data)
    } catch (err) {
      console.error("Error fetching application data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllApplicationData()
  }, [])

  if (loading) return <div>Loading application summary...</div>

  const hasData = Object.keys(applicationData).length > 0

  if (!hasData) {
    return (
      <div className="application-summary empty-summary">
        <h2>Application Summary</h2>
        <p>No application data found. Please start your application to see a summary here.</p>
      </div>
    )
  }

  return (
    <div className="application-summary">
      <h2>Application Summary</h2>
      {summarySteps.map((step) => {
        const sectionData = applicationData[step]
        if (!sectionData) return null

        return (
          <div key={step} className="application-section">
            <h3>{step}</h3>
            <ul>
              {summaryStepContent[step].map((field) => {
                const value = sectionData[field]
                const fileName = sectionData[`${field}_filename`]

                return (
                  <li key={field}>
                    <strong>{field}:</strong>{" "}
                    {typeof value === "string" && value.startsWith("https://") ? (
                      <a href={value} target="_blank" rel="noopener noreferrer">
                        {fileName || "View File"}
                      </a>
                    ) : (
                      <span>{value || "Not provided"}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "#754A2D",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#754A2D",
    borderBottom: "1px solid #754A2D",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: "40%",
    fontSize: 12,
    fontWeight: "bold",
  },
  value: {
    width: "60%",
    fontSize: 12,
  },
  multiValue: {
    fontSize: 12,
    marginBottom: 3,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#666",
  },
})

const ApplicationPDF = ({ formData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Investment Application Summary</Text>
        <Text style={styles.subtitle}>Generated on {new Date().toLocaleDateString()}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company Profile</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Company Name:</Text>
          <Text style={styles.value}>{formData.companyName || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Country of Operation:</Text>
          <Text style={styles.value}>{formData.country || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Industry Sector:</Text>
          <Text style={styles.value}>{formData.industry || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Website:</Text>
          <Text style={styles.value}>{formData.website || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Looking For:</Text>
          <View style={styles.value}>
            {formData.services && formData.services.length > 0 ? (
              formData.services.map((service, index) => (
                <Text key={index} style={styles.multiValue}>
                  • {service}
                </Text>
              ))
            ) : (
              <Text>N/A</Text>
            )}
          </View>
        </View>
      </View>
      {formData.companyDescription && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Overview</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Business Model:</Text>
            <Text style={styles.value}>{formData.businessModel || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Stage of Business:</Text>
            <Text style={styles.value}>{formData.stageOfBusiness || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Target Market:</Text>
            <Text style={styles.value}>{formData.targetMarket || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Company Description:</Text>
            <Text style={styles.value}>{formData.companyDescription || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Key Products/Services:</Text>
            <Text style={styles.value}>{formData.keyProducts || "N/A"}</Text>
          </View>
        </View>
      )}
      {formData.ownershipStructure && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ownership & Compliance</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Ownership Structure:</Text>
            <Text style={styles.value}>{formData.ownershipStructure || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>B-BBEE Status:</Text>
            <Text style={styles.value}>{formData.bbbeeStatus || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Registration Number:</Text>
            <Text style={styles.value}>{formData.registrationNumber || "N/A"}</Text>
          </View>
        </View>
      )}
      {formData.annualRevenue && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Due Diligence</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Annual Revenue:</Text>
            <Text style={styles.value}>
              {formData.annualRevenue ? `$${formData.annualRevenue.toLocaleString()}` : "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Profitability Status:</Text>
            <Text style={styles.value}>{formData.profitabilityStatus || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Funding Round:</Text>
            <Text style={styles.value}>{formData.fundingRound || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ask Amount:</Text>
            <Text style={styles.value}>{formData.askAmount ? `$${formData.askAmount.toLocaleString()}` : "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Use of Funds:</Text>
            <Text style={styles.value}>{formData.useOfFunds || "N/A"}</Text>
          </View>
        </View>
      )}
      {formData.keyPartners && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operational Due Diligence</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Key Partners:</Text>
            <Text style={styles.value}>{formData.keyPartners || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Key Activities:</Text>
            <Text style={styles.value}>{formData.keyActivities || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Revenue Streams:</Text>
            <Text style={styles.value}>{formData.revenueStreams || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Value Proposition:</Text>
            <Text style={styles.value}>{formData.valueProposition || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Customer Segments:</Text>
            <Text style={styles.value}>{formData.customerSegments || "N/A"}</Text>
          </View>
        </View>
      )}
      <Text style={styles.footer}>Confidential - For Investor Review Only</Text>
    </Page>
  </Document>
)

const Application = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState("Company Profile")
  const [formData, setFormData] = useState({
    companyName: "",
    country: "",
    industry: "",
    website: "",
    services: [],
    companyDescription: "",
    businessModel: "",
    stageOfBusiness: "",
    targetMarket: "",
    keyProducts: "",
    ownershipStructure: "",
    bbbeeStatus: "",
    registrationNumber: "",
    annualRevenue: "",
    profitabilityStatus: "",
    fundingRound: "",
    askAmount: "",
    useOfFunds: "",
    keyPartners: "",
    keyActivities: "",
    revenueStreams: "",
    valueProposition: "",
    customerSegments: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pitchEvaluation, setPitchEvaluation] = useState(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [isEditMode, setIsEditMode] = useState(true)
  const [showSummary, setShowSummary] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [viewApplicationSummary, setViewApplicationSummary] = useState(false)
  const [multiselectOpen, setMultiselectOpen] = useState({})
  const [searchTerm, setSearchTerm] = useState("")

  const steps = [
    "Company Profile",
    "Company Overview",
    "Ownership & Compliance",
    "Financial Due Diligence",
    "Operational Due Diligence",
    "Pitch & Market",
  ]

  const stepDescriptions = {
    "Company Profile": [
      "• Provide your basic company information",
      "• Select your country of operation and industry sector",
      "• Specify what you're looking for (funding, growth enablers, etc.)",
    ],
    "Company Overview": [
      "• Provide a clear and compelling description of your company's purpose and vision",
      "• Define your target market with as much specificity as possible",
      "• Highlight your key products/services and what makes them unique",
    ],
    "Ownership & Compliance": [
      "• Detail your company's ownership structure and equity distribution",
      "• Upload all required legal documents for verification",
      "• Ensure registration numbers match official records",
      "• Include identification for all directors and major shareholders",
    ],
    "Financial Due Diligence": [
      "• Report accurate financial figures from your most recent fiscal year",
      "• Be transparent about your current profitability status",
      "• Specify the type of funding round you're currently pursuing",
      "• Clearly articulate how you will use the requested funds",
      "• Upload complete financial statements for the past 2-3 years",
    ],
    "Operational Due Diligence": [
      "• Identify key partners that contribute to your business success",
      "• Describe the core activities that drive your operations",
      "• Outline all revenue streams and their relative importance",
      "• List critical resources required for business continuity",
      "• Articulate your unique value proposition clearly",
      "• Explain your customer acquisition and distribution channels",
      "• Provide insight into your cost structure and major expenses",
      "• Define your target customer segments precisely",
      "• Describe how you maintain relationships with customers",
    ],
    "Pitch & Market": [
      "• Upload a comprehensive pitch deck (PDF format preferred)",
      "• Ensure your deck includes: Problem statement, Solution, Market size, Business model, and Ask",
      "• Our AI will evaluate your pitch on key dimensions and provide feedback",
      "• You'll receive a detailed scorecard with improvement suggestions",
      "• You may revise and resubmit based on the feedback before final submission",
    ],
  }

  const stepContent = {
    "Company Profile": {
      fields: [
        { name: "companyName", label: "Company Name", type: "text", required: true },
        { name: "country", label: "Country of Operation", type: "select", options: africanCountries, required: true },
        { name: "industry", label: "Industry Sector", type: "select", options: industrySectors, required: true },
        { name: "website", label: "Website / Social Media Links", type: "url" },
       
        {
          name: "selectedFundingTypes",
          label: "Funding Types Offered",
          type: "checkboxGroup",
          options: fundingTypes,
          required: true,
        },
      ],
    },
    "Company Overview": {
      fields: [
        { name: "companyDescription", label: "Company Description", type: "textarea", required: true },
        { name: "businessModel", label: "Business Model", type: "select", options: businessModels, required: true },
        {
          name: "stageOfBusiness",
          label: "Stage of Business",
          type: "select",
          options: businessStages,
          required: true,
        },
        { name: "targetMarket", label: "Target Market/Geography", type: "text", required: true },
        { name: "keyProducts", label: "Key Products/Services", type: "textarea", required: true },
      ],
    },
    "Ownership & Compliance": {
      fields: [
        { name: "ownershipStructure", label: "Ownership Structure", type: "textarea", required: true },
        { name: "bbbeeStatus", label: "B-BBEE Status", type: "select", options: bbbeeStatuses, required: true },
        { name: "taxClearance", label: "Tax Clearance Certificate", type: "file", required: true },
        { name: "registrationNumber", label: "Registration Number", type: "text", required: true },
        { name: "registrationDoc", label: "Company Registration Document", type: "file", required: true },
        { name: "directorIds", label: "Director IDs", type: "file", required: true },
        { name: "shareholderCerts", label: "Shareholder Certificates", type: "file" },
      ],
    },
    "Financial Due Diligence": {
      fields: [
        { name: "annualRevenue", label: "Annual Revenue (Last FY)", type: "number", required: true },
        {
          name: "profitabilityStatus",
          label: "Profitability Status",
          type: "select",
          options: profitabilityStatuses,
          required: true,
        },
        {
          name: "fundingRound",
          label: "Current Funding Round",
          type: "select",
          options: businessStages,
          required: true,
        },
        { name: "askAmount", label: "Ask Amount (Funding Required)", type: "number", required: true },
        { name: "useOfFunds", label: "Use of Funds (breakdown %)", type: "textarea", required: true },
        { name: "financialStatements", label: "Financial Statements (upload)", type: "file", required: true },
        { name: "accountingSoftware", label: "Accounting Software Used", type: "text" },
      ],
    },
    "Operational Due Diligence": {
      fields: [
        { name: "keyPartners", label: "Key Partners", type: "textarea", required: true },
        { name: "keyActivities", label: "Key Activities", type: "textarea", required: true },
        { name: "revenueStreams", label: "Revenue Streams", type: "textarea", required: true },
        { name: "keyResources", label: "Key Resources", type: "textarea", required: true },
        { name: "valueProposition", label: "Value Proposition", type: "textarea", required: true },
        { name: "channels", label: "Channels", type: "textarea", required: true },
        { name: "costStructure", label: "Cost Structure", type: "textarea", required: true },
        { name: "customerSegments", label: "Customer Segments", type: "textarea", required: true },
        { name: "customerRelationships", label: "Customer Relationships", type: "textarea", required: true },
      ],
    },
    "Pitch & Market": {
      fields: [
        {
          name: "pitchDeck",
          label: "Pitch Deck (PDF, PPT, or DOCX)",
          type: "file",
          required: true,
          accept: ".pdf,.ppt,.pptx,.doc,.docx",
        },
      ],
    },
  }

  const uploadFile = async (file, fieldName) => {
    if (!file) return null

    try {
      const fileRef = ref(storage, `SMEs/${auth.currentUser.uid}/application/${fieldName}/${file.name}`)
      await uploadBytes(fileRef, file)
      return await getDownloadURL(fileRef)
    } catch (error) {
      console.error("Error uploading file:", error)
      throw error
    }
  }

  const loadApplicationData = async () => {
    if (!auth.currentUser) {
      navigate("/login")
      return
    }

    try {
      setLoading(true)
      const loadedData = {}

      for (const step of steps) {
        const docName = formatSectionName(step)
        const docRef = doc(db, "SMEs", auth.currentUser.uid, "application", docName)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          loadedData[docName] = docSnap.data()
        }
      }

      setFormData((prev) => ({
        ...prev,
        ...Object.values(loadedData).reduce((acc, section) => ({ ...acc, ...section }), {}),
      }))
    } catch (err) {
      console.error("Error loading application data:", err)
      setError("Failed to load application data")
    } finally {
      setLoading(false)
    }
  }

  const saveSectionToFirestore = async (sectionName) => {
    if (!auth.currentUser) return

    try {
      const sectionData = {}
      const fields = stepContent[sectionName].fields

      for (const field of fields) {
        const fieldValue = formData[field.name]

        if (fieldValue !== undefined) {
          if (field.type === "file") {
            if (fieldValue instanceof File) {
              const fileUrl = await uploadFile(fieldValue, field.name)
              if (fileUrl) {
                sectionData[field.name] = fileUrl
                sectionData[`${field.name}_filename`] = fieldValue.name
              }
            } else if (typeof fieldValue === "string") {
              sectionData[field.name] = fieldValue
            }
          } else {
            sectionData[field.name] = fieldValue
          }
        }
      }

      const docName = formatSectionName(sectionName)
      const docRef = doc(db, "SMEs", auth.currentUser.uid, "application", docName)
      await setDoc(docRef, sectionData)
    } catch (error) {
      console.error(`Error saving ${sectionName} data:`, error)
      setError(`Failed to save ${sectionName} data`)
    }
  }

  useEffect(() => {
    loadApplicationData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleMultiSelectChange = (name, value, isChecked) => {
    setFormData((prev) => {
      const currentValues = prev[name] || []
      if (isChecked) {
        return { ...prev, [name]: [...currentValues, value] }
      } else {
        return { ...prev, [name]: currentValues.filter((item) => item !== value) }
      }
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const toggleMultiselect = (name) => {
    setMultiselectOpen({
      ...multiselectOpen,
      [name]: !multiselectOpen[name],
    })
    setSearchTerm("")
  }

  const validateStep = () => {
    const currentFields = stepContent[activeStep].fields
    const newErrors = {}

    currentFields.forEach((field) => {
      if (field.required) {
        if (field.type === "multiselect" && (!formData[field.name] || formData[field.name].length === 0)) {
          newErrors[field.name] = "Please select at least one option"
        } else if (!formData[field.name]) {
          newErrors[field.name] = "This field is required"
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (!validateStep()) return

    try {
      await saveSectionToFirestore(activeStep)

      const currentIndex = steps.indexOf(activeStep)
      if (currentIndex < steps.length - 1) {
        setActiveStep(steps[currentIndex + 1])
      } else {
        setShowSummary(true)
      }
    } catch (err) {
      console.error("Error saving section:", err)
      setError("Failed to save section")
    }
  }

  const handleBack = () => {
    const currentIndex = steps.indexOf(activeStep)
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1])
    }
  }

  const evaluatePitch = () => {
    setIsEvaluating(true)

    setTimeout(() => {
      const scores = [
        {
          name: "Problem Clarity",
          score: Math.floor(Math.random() * 51) + 50,
          weight: 20,
          description: "How clearly you articulate the problem you solve and its significance",
        },
        {
          name: "Solution Uniqueness",
          score: Math.floor(Math.random() * 51) + 50,
          weight: 20,
          description: "The distinctiveness and defensibility of your solution",
        },
        {
          name: "Business Model",
          score: Math.floor(Math.random() * 51) + 50,
          weight: 20,
          description: "The viability and scalability of your revenue model",
        },
        {
          name: "Market Size",
          score: Math.floor(Math.random() * 51) + 50,
          weight: 10,
          description: "The attractiveness and growth potential of your target market",
        },
        {
          name: "Market Size",
          score: Math.floor(Math.random() * 51) + 50,
          weight: 10,
          description: "The attractiveness and growth potential of your target market",
        },
        {
          name: "Competitive Advantage",
          score: Math.floor(Math.random() * 51) + 50,
          weight: 10,
          description: "Your sustainable differentiation from competitors",
        },
        {
          name: "Team Strength",
          score: Math.floor(Math.random() * 51) + 50,
          weight: 10,
          description: "The experience and capability of your founding team",
        },
      ]

      const totalScore = scores.reduce((sum, item) => sum + (item.score * item.weight) / 100, 0)

      setPitchEvaluation({
        scores,
        totalScore,
        recommendations: [
          totalScore > 80
            ? "Your pitch is investor-ready with all key elements well presented. Consider adding more detailed financial projections if not already included."
            : totalScore > 70
              ? "Strong foundation with a few areas that could be enhanced. Focus on strengthening your competitive differentiation and traction metrics."
              : totalScore > 60
                ? "Good start but needs refinement. Work on clearer problem articulation and more compelling market size evidence."
                : "Significant improvements needed. Focus on clarifying your value proposition and providing more concrete evidence of traction.",
        ],
      })
      setIsEvaluating(false)
    }, 3000)
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    if (activeStep === "Pitch & Market" && !pitchEvaluation) {
      evaluatePitch()
      return
    }

    setIsSubmitting(true)

    try {
      await saveSectionToFirestore(activeStep)

      const appStatusRef = doc(db, "SMEs", auth.currentUser.uid, "application", "status")
      await setDoc(
        appStatusRef,
        {
          status: "submitted",
          submittedAt: new Date(),
          completedSections: steps.map((step) => formatSectionName(step)),
        },
        { merge: true },
      )

      navigate("/dashboard?application=submitted")
    } catch (err) {
      console.error("Error submitting application:", err)
      setError("Failed to submit application")
    } finally {
      setIsSubmitting(false)
    }
  }

  const saveDraft = async () => {
    try {
      await saveSectionToFirestore(activeStep)
      alert("Draft saved successfully!")
    } catch (err) {
      console.error("Error saving draft:", err)
      alert("Failed to save draft")
    }
  }

  const handleUpdate = () => {
    setIsEditMode(true)
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep()) return

    try {
      await saveSectionToFirestore(activeStep)
      setIsEditMode(false)
      handleNext()
    } catch (err) {
      console.error("Error saving profile:", err)
      setError("Failed to save profile")
    }
  }

  const toggleSummary = () => {
    setShowSummary(!showSummary)
  }

  const toggleApplicationSummary = () => {
    setViewApplicationSummary(!viewApplicationSummary)
  }

  const filteredFunderTypes = () => {
    if (!searchTerm) return funderTypes

    const filtered = {}
    for (const category in funderTypes) {
      const filteredItems = funderTypes[category].filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      if (filteredItems.length > 0) {
        filtered[category] = filteredItems
      }
    }
    return filtered
  }

  const renderCheckboxGroup = (field) => {
    return (
      <div className="checkbox-group-container">
        {field.name === "selectedFunderTypes" ? (
          // Render funder types with categories
          Object.entries(field.options).map(([category, options]) => (
            <div key={category} className="checkbox-category">
              <h4 className="category-title">{category}</h4>
              <div className="checkbox-options">
                {options.map((option) => {
                  const optionValue = `${category}:${option}`
                  return (
                    <label key={optionValue} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData[field.name]?.includes(optionValue) || false}
                        onChange={(e) => handleMultiSelectChange(field.name, optionValue, e.target.checked)}
                      />
                      <span className="option-text">{option}</span>
                      <span className="tooltip-text">
                        {option.includes("(") ? option.split("(")[1].replace(")", "") : ""}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))
        ) : (
          // Render funding types as a flat list
          <div className="checkbox-options funding-types">
            {field.options.map((option) => (
              <label key={option} className="checkbox-option">
                <input
                  type="checkbox"
                  checked={formData[field.name]?.includes(option) || false}
                  onChange={(e) => handleMultiSelectChange(field.name, option, e.target.checked)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
        {errors[field.name] && <p className="error-message">{errors[field.name]}</p>}
      </div>
    )
  }

  const renderField = (field) => {
    switch (field.type) {
      case "checkboxGroup":
        return renderCheckboxGroup(field)
      case "textarea":
        return (
          <textarea
            name={field.name}
            rows={4}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            className={errors[field.name] ? "error" : ""}
          />
        )
      case "select":
        return (
          <select
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            className={errors[field.name] ? "error" : ""}
          >
            <option value="">Select an option</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )
      case "multiselect":
        if (field.name === "services") {
          const options = filteredFunderTypes()
          return (
            <div className={`multiselect-container ${multiselectOpen[field.name] ? "open" : ""}`}>
              <div className="selected-count" onClick={() => toggleMultiselect(field.name)}>
                <span>
                  {formData[field.name]?.length === 0 || !formData[field.name]
                    ? `Select ${field.label}`
                    : `${formData[field.name]?.length} selected`}
                </span>
                <span className="dropdown-arrow">{multiselectOpen[field.name] ? "▲" : "▼"}</span>
              </div>

              {formData[field.name] && formData[field.name].length > 0 && (
                <div className="selected-tags">
                  {formData[field.name].map((value) => (
                    <div key={value} className="selected-tag">
                      {value}
                      <span
                        className="tag-remove"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMultiSelectChange(field.name, value, false)
                        }}
                      >
                        ×
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {multiselectOpen[field.name] && (
                <div className="multiselect-dropdown">
                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="options-container">
                    {Object.keys(options).map((category) => (
                      <div key={category} className="option-group">
                        <div className="group-header">{category}</div>
                        {options[category].map((option) => (
                          <label key={option} className="multiselect-option">
                            <input
                              type="checkbox"
                              checked={formData[field.name]?.includes(option) || false}
                              onChange={(e) => handleMultiSelectChange(field.name, option, e.target.checked)}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {errors[field.name] && <p className="error-message">{errors[field.name]}</p>}
            </div>
          )
        }
        return (
          <div className="multiselect-container">
            <div className="selected-count">{formData[field.name]?.length || 0} selected</div>
            <div className="multiselect-options">
              {field.options.map((option) => (
                <label key={option} className="multiselect-option">
                  <input
                    type="checkbox"
                    checked={formData[field.name]?.includes(option) || false}
                    onChange={(e) => handleMultiSelectChange(field.name, option, e.target.checked)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors[field.name] && <p className="error-message">{errors[field.name]}</p>}
          </div>
        )
      case "file":
        return (
          <div className="file-upload">
            <input
              type="file"
              name={field.name}
              onChange={handleInputChange}
              className={errors[field.name] ? "error" : ""}
              accept={field.accept}
            />
            {formData[field.name] && (
              <div className="file-name">
                Selected: {formData[field.name].name || formData[`${field.name}_filename`]}
              </div>
            )}
          </div>
        )
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            className={errors[field.name] ? "error" : ""}
          />
        )
    }
  }

  const renderSummaryReport = () => (
    <div className="summary-report">
      <div className="summary-header">
        <h3>Application Summary</h3>
        <div className="summary-actions">
          <button onClick={toggleSummary} className="back-btn">
            Back to Form
          </button>
          <PDFDownloadLink
            document={<ApplicationPDF formData={formData} />}
            fileName="investment_application.pdf"
            className="download-btn"
          >
            {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
          </PDFDownloadLink>
          <button onClick={handleSubmit} className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
      <div className="summary-content">
        <div className="summary-section">
          <h4>Company Profile</h4>
          <p>
            <strong>Company Name:</strong> {formData.companyName || "N/A"}
          </p>
          <p>
            <strong>Country:</strong> {formData.country || "N/A"}
          </p>
          <p>
            <strong>Industry:</strong> {formData.industry || "N/A"}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            {formData.website ? (
              <a href={formData.website} target="_blank" rel="noreferrer">
                {formData.website}
              </a>
            ) : (
              "N/A"
            )}
          </p>
          <p>
            
          </p>
          <p>
            <strong>Funding Types Offered:</strong>
            {formData.selectedFundingTypes && formData.selectedFundingTypes.length > 0 ? (
              <ul>
                {formData.selectedFundingTypes.map((fundingType, index) => (
                  <li key={index}>{fundingType}</li>
                ))}
              </ul>
            ) : (
              "N/A"
            )}
          </p>
        </div>
        {formData.companyDescription && (
          <div className="summary-section">
            <h4>Company Overview</h4>
            <p>
              <strong>Business Model:</strong> {formData.businessModel || "N/A"}
            </p>
            <p>
              <strong>Stage of Business:</strong> {formData.stageOfBusiness || "N/A"}
            </p>
            <p>
              <strong>Target Market:</strong> {formData.targetMarket || "N/A"}
            </p>
            <p>
              <strong>Company Description:</strong> {formData.companyDescription || "N/A"}
            </p>
            <p>
              <strong>Key Products/Services:</strong> {formData.keyProducts || "N/A"}
            </p>
          </div>
        )}
        {formData.ownershipStructure && (
          <div className="summary-section">
            <h4>Ownership & Compliance</h4>
            <p>
              <strong>Ownership Structure:</strong> {formData.ownershipStructure || "N/A"}
            </p>
            <p>
              <strong>B-BBEE Status:</strong> {formData.bbbeeStatus || "N/A"}
            </p>
            <p>
              <strong>Registration Number:</strong> {formData.registrationNumber || "N/A"}
            </p>
          </div>
        )}
        {formData.annualRevenue && (
          <div className="summary-section">
            <h4>Financial Due Diligence</h4>
            <p>
              <strong>Annual Revenue:</strong>{" "}
              {formData.annualRevenue ? `$${formData.annualRevenue.toLocaleString()}` : "N/A"}
            </p>
            <p>
              <strong>Profitability Status:</strong> {formData.profitabilityStatus || "N/A"}
            </p>
            <p>
              <strong>Funding Round:</strong> {formData.fundingRound || "N/A"}
            </p>
            <p>
              <strong>Ask Amount:</strong> {formData.askAmount ? `$${formData.askAmount.toLocaleString()}` : "N/A"}
            </p>
            <p>
              <strong>Use of Funds:</strong> {formData.useOfFunds || "N/A"}
            </p>
          </div>
        )}
        {formData.keyPartners && (
          <div className="summary-section">
            <h4>Operational Due Diligence</h4>
            <p>
              <strong>Key Partners:</strong> {formData.keyPartners || "N/A"}
            </p>
            <p>
              <strong>Key Activities:</strong> {formData.keyActivities || "N/A"}
            </p>
            <p>
              <strong>Revenue Streams:</strong> {formData.revenueStreams || "N/A"}
            </p>
            <p>
              <strong>Value Proposition:</strong> {formData.valueProposition || "N/A"}
            </p>
            <p>
              <strong>Customer Segments:</strong> {formData.customerSegments || "N/A"}
            </p>
          </div>
        )}
        {pitchEvaluation && (
          <div className="summary-section">
            <h4>Pitch Evaluation</h4>
            <p>
              <strong>Overall Score:</strong> {pitchEvaluation.totalScore.toFixed(1)}/100
            </p>
            <div className="score-breakdown">
              {pitchEvaluation.scores.map((item, index) => (
                <div key={index} className="score-item">
                  <p>
                    <strong>{item.name}:</strong> {item.score}/100
                  </p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <div className="recommendations">
              <h5>Recommendations:</h5>
              {pitchEvaluation.recommendations.map((rec, i) => (
                <p key={i}>{rec}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderStepContent = () => {
    if (showSummary) {
      return renderSummaryReport()
    }

    if (viewApplicationSummary) {
      return <ApplicationSummary />
    }

    if (activeStep === "Company Profile") {
      return isEditMode ? (
        <form onSubmit={handleProfileSubmit} className="profile-form">
          <div className="form-section">
            <h3>Basic Information</h3>

            {stepContent["Company Profile"].fields.map((field) => (
              <div key={field.name} className="form-group">
                <label>{field.label}</label>
                {renderField(field)}
                {errors[field.name] && <p className="error-message">{errors[field.name]}</p>}
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="summary-card">
          <p>
            <strong>Company Name:</strong> {formData.companyName}
          </p>
          <p>
            <strong>Country:</strong> {formData.country}
          </p>
          <p>
            <strong>Industry:</strong> {formData.industry}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            {formData.website ? (
              <a href={formData.website} target="_blank" rel="noreferrer">
                {formData.website}
              </a>
            ) : (
              "N/A"
            )}
          </p>
          <p>
            <strong>Looking for:</strong>
            {formData.services && formData.services.length > 0 ? (
              <ul>
                {formData.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            ) : (
              "N/A"
            )}
          </p>
          <div className="form-actions">
            <button className="save-btn" onClick={handleUpdate}>
              Update
            </button>
            <button className="next-btn" onClick={handleNext}>
              Continue
            </button>
          </div>
        </div>
      )
    }

    return (
      <form className="application-form">
        {stepContent[activeStep]?.fields.map((field) => (
          <div key={field.name} className="form-field">
            <label>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            {renderField(field)}
            {errors[field.name] && <p className="error-message">{errors[field.name]}</p>}
          </div>
        ))}

        {activeStep === "Pitch & Market" && pitchEvaluation && (
          <div className="pitch-evaluation">
            <div className="evaluation-header">
              <h4>Pitch Evaluation Results</h4>
              <div className="overall-score">
                <div className="total-score-display">
                  <span className="score-number">{pitchEvaluation.totalScore.toFixed(0)}</span>
                  <span className="score-divider">/</span>
                  <span className="score-total">100</span>
                </div>
                <div className="score-description">Overall Pitch Score</div>
              </div>
            </div>
            <div className="score-breakdown">
              <h5>Detailed Breakdown:</h5>
              {pitchEvaluation.scores.map((item, index) => (
                <div key={index} className="score-item">
                  <p>
                    <strong>{item.name}:</strong> {item.score}/100
                  </p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <div className="recommendations">
              <h5>Recommendations:</h5>
              <div className="recommendation-content">
                {pitchEvaluation.recommendations.map((rec, i) => (
                  <p key={i}>{rec}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {isEvaluating && (
          <div className="evaluation-loading">
            <div className="spinner"></div>
            <p>Analyzing your pitch deck...</p>
          </div>
        )}

        <div className="form-actions">
          <div className="left-actions">
            <button type="button" className="save-draft-btn" onClick={saveDraft}>
              Save Draft
            </button>
          </div>
          <div className="right-actions">
            {steps.indexOf(activeStep) > 0 && (
              <button type="button" className="back-btn" onClick={handleBack}>
                Back
              </button>
            )}
            <button
              type="button"
              className="next-btn"
              onClick={activeStep === "Pitch & Market" && !pitchEvaluation ? evaluatePitch : handleNext}
              disabled={isSubmitting || isEvaluating}
            >
              {isSubmitting
                ? "Submitting..."
                : isEvaluating
                  ? "Analyzing..."
                  : activeStep === "Pitch & Market" && !pitchEvaluation
                    ? "Evaluate Pitch"
                    : "Continue"}
            </button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <div className="application-page">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading your application...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="application-header">
        <h2>Investment Application</h2>
        <p className="application-description">
          Complete all sections to submit your application for funding consideration.
        </p>
        <div className="view-toggle">
          <button
            className={`toggle-btn ${!viewApplicationSummary ? "active" : ""}`}
            onClick={() => setViewApplicationSummary(false)}
          >
            Application Form
          </button>
          <button
            className={`toggle-btn ${viewApplicationSummary ? "active" : ""}`}
            onClick={() => setViewApplicationSummary(true)}
          >
            View Summary
          </button>
        </div>
      </div>

      {!showSummary && !viewApplicationSummary && (
        <div className={`application-tracker step-${steps.indexOf(activeStep) + 1}`}>
          <div className="application-tracker">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <div
                  className={`tracker-step ${activeStep === step ? "active" : ""} ${
                    steps.indexOf(step) < steps.indexOf(activeStep) ? "completed" : ""
                  }`}
                  onClick={() => {
                    if (
                      step === "Company Profile" ||
                      (index > 0 && formData[stepContent[steps[index - 1]].fields[0].name])
                    ) {
                      setActiveStep(step)
                    }
                  }}
                >
                  <div className="step-icon">{index + 1}</div>
                  <div className="step-name">{step}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <div className="step-content-container">
        <div className="step-content">
          {!showSummary && !viewApplicationSummary && (
            <div className="step-header">
              <h3>{activeStep}</h3>
              <p className="step-description">{stepContent[activeStep]?.description}</p>
              <div className="step-requirements">
                <h4>Key Requirements:</h4>
                <ul>
                  {stepDescriptions[activeStep].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {renderStepContent()}
        </div>
      </div>
    </div>
  )
}

export default Application;