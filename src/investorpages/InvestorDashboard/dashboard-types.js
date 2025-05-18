// Dashboard Types (JavaScript version)

// ProfileData is an object structure example
export const ProfileData = {
    entityOverview: {
      registrationCertificate: null,
      proofOfAddress: null,
      financialYearEnd: "",
      yearsInOperation: "",
      employeeCount: "",
      operationStage: "",
      businessDescription: "",
      targetMarket: "",
    },
    ownershipManagement: {
      certifiedIds: null,
      shareRegister: null,
      directors: [],
    },
    legalCompliance: {
      taxClearanceCert: null,
      bbbeeCert: null,
      taxClearanceNumber: "",
      vatNumber: "",
    },
    productsServices: {
      annualTurnover: "",
      keyClients: [],
      productCategories: {
        products: [],
      },
      serviceCategories: {
        services: [],
      },
    },
    contactDetails: {
      website: "",
    },
    howDidYouHear: {
      source: "",
    },
    declarationConsent: {
      signedDocument: null,
      accuracy: false,
      dataProcessing: false,
    },
  }
  
  // CategoryScores
  export const CategoryScores = {
    financialHealth: 0,
    operationalStrength: 0,
    pitchQuality: 0,
    impactProof: 0,
  }
  
  // TrackerStep
  export const TrackerStep = {
    label: "",
    description: "",
    completed: false,
    active: false,
    showDetails: false,
  }
  
  // Deadline
  export const Deadline = {
    date: 0,
    title: "",
  }
  
  // Event
  export const Event = {
    title: "",
    date: "",
    type: "meeting", // meeting | workshop | deadline
    description: "",
  }
  
  // Review
  export const Review = {
    name: "",
    rating: 0,
    date: "",
    comment: "",
    company: "",
    position: "",
  }
  
  // ScoreItem
  export const ScoreItem = {
    name: "",
    value: 0,
    color: "",
  }
  
  // CategoryItem
  export const CategoryItem = {
    name: "",
    serviceCategory: "",
    serviceNeeded: "",
    serviceOffered: "",
    investmentType: "",
    programType: "",
    match: 0,
    location: "",
    dealSize: "",
    rating: "",
    stageFocus: "",
    focusArea: "",
    status: "",
  }
  
  // CategoryData (as a map of arrays)
  export const CategoryData = {
    // Example: "Financial Services": [CategoryItem, CategoryItem]
  }
  