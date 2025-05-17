
import "./FundingApplication.css" ;
export const applicationType = [
  { value: "funding", label: "Funding" },
  { value: "incubation", label: "Incubation" },
  { value: "acceleration", label: "Acceleration" },
  { value: "esd", label: "ESD" },
  { value: "marketAccess", label: "Market Access" },
  { value: "businessMentorship", label: "Business Mentorship" },
  { value: "technicalSupport", label: "Technical Support" },
 
];

export const businessFundingStage = [
  { value: "preSeed", label: "Pre-Seed" },
  { value: "seed", label: "Seed" },
  { value: "seriesA", label: "Series A" },
  { value: "seriesB", label: "Series B" },
  { value: "maturity", label: "Maturity" },
  { value: "exit", label: "Exit" },
];

export const urgencyOptions = [
  { value: "immediate", label: "Immediate" },
  { value: "1-3months", label: "1-3 months" },
  { value: "6-12months", label: "6-12 months" },
];

export const supportFormatOptions = [
  { value: "cohort", label: "Cohort" },
  { value: "oneOnOne", label: "One-on-One" },
  { value: "online", label: "Online" },
  { value: "blended", label: "Blended" },
  { value: "noPreference", label: "No Preference" },
];

export const fundingInstrumentOptions = [
  { value: "workingCapital", label: "Working Capital Loans" },
  { value: "ventureCapital", label: "Venture Capital" },
  { value: "invoiceDiscounting", label: "Invoice Discounting" },
  { value: "mezzanine", label: "Mezzanine Finance" },
  { value: "common_shares", label: "Common Shares" },
  { value: "preferred_shares", label: "Preferred Shares" },
  { value: "safe", label: "SAFE (Simple Agreement for Future Equity)" },
  { value: "convertible_note", label: "Convertible Note" },
  { value: "equity_warrant", label: "Equity Warrant" },
  { value: "innovation_grant", label: "Innovation Grant" },
  { value: "matching_grant", label: "Matching Grant" },
  { value: "milestone_grant", label: "Milestone-Based Grant" },
  { value: "technical_assistance", label: "Technical Assistance Grant" }
];

export const fundingCategoryOptions = [
  { value: "setup", label: "Set-Up" },
  { value: "capex", label: "Capex" },
  { value: "upgrade", label: "Upgrade" },
  { value: "expansion", label: "Expansion" },
  { value: "workingCapital", label: "Working Capital" },
  { value: "acquisition", label: "Acquisition" },
  { value: "businessDevelopment", label: "Business Development" },
];

export const subAreaOptions = {
  setup: [{ value: "feasibility", label: "Feasibility" }],
  upgrade: [
    { value: "upgrade", label: "Upgrade" },
    { value: "expansion", label: "Expansion" },
  ],
  workingCapital: [{ value: "bridgingFinance", label: "Bridging Finance" }],
  acquisition: [
    { value: "franchise", label: "Franchise" },
    { value: "assetAcquisition", label: "Asset Acquisition" },
  ],
  businessDevelopment: [
    { value: "productDesign", label: "Product Design & Development" },
    { value: "packagingDesign", label: "Packaging Design & Development" },
    { value: "conformityAssessment", label: "Conformity Assessment Certification" },
    { value: "itSystems", label: "IT Systems" },
    { value: "processOptimisation", label: "Process Optimisation" },
    { value: "patents", label: "Patents" },
    { value: "logistics", label: "Logistics" },
    { value: "salesMarketing", label: "Sales and Marketing" },
    { value: "postInvestment", label: "Post-investment Support" },
  ],
};

export const barrierOptions = [
  { value: "skills", label: "Skills" },
  { value: "accessToCapital", label: "Access to Capital" },
  { value: "marketAccess", label: "Market Access" },
  { value: "systems", label: "Systems" },

];

export const profitabilityOptions = [
  { value: "profitable", label: "Profitable" },
  { value: "breakeven", label: "Breakeven" },
  { value: "lossMaking", label: "Loss-making" },
];