const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock database
let documents = {
  taxClearance: false,
  registrationDoc: false,
  directorIds: false,
  shareholderCerts: false
};

// Calculate compliance (3 required docs = 100%)
function calculateCompliance() {
  const requiredDocs = ['taxClearance', 'registrationDoc', 'directorIds'];
  const uploadedCount = requiredDocs.filter(doc => documents[doc]).length;
  return Math.round((uploadedCount / 3) * 100);
}

// API endpoint to get compliance status
app.get('/api/compliance', (req, res) => {
  res.json({ compliancePercentage: calculateCompliance() });
});

// API endpoint to "upload" documents
app.post('/api/upload', (req, res) => {
  const { documentType, isUploaded } = req.body;
  
  if (documents.hasOwnProperty(documentType)) {
    documents[documentType] = isUploaded;
    res.json({ 
      success: true,
      compliance: calculateCompliance()
    });
  } else {
    res.status(400).json({ success: false });
  }
});

// Start server
app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});