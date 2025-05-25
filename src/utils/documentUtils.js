import get from "lodash.get";

export const DOCUMENT_PATHS = {
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
  "Scope of Work": null
};

export const checkSubmittedDocs = (requiredDocs, profileData) => {
  const submitted = [];
  for (const docLabel of requiredDocs) {
    const path = DOCUMENT_PATHS[docLabel];
    if (!path) continue;
    const value = Array.isArray(path)
      ? path.map(p => get(profileData, p)).find(v => !!v)
      : get(profileData, path);
    if (value && (Array.isArray(value) ? value.length > 0 : true)) {
      submitted.push(docLabel);
    }
  }
  return submitted;
};

export const getDocumentURL = (label, profileData) => {
  const path = DOCUMENT_PATHS[label];
  if (!path) return null;
  const value = Array.isArray(path)
    ? path.map(p => get(profileData, p)).find(v => !!v)
    : get(profileData, path);
  return Array.isArray(value) ? value[0] : value;
};
