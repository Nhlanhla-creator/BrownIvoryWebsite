"use client"
import { useEffect, useState } from "react"
import FormField from "./form-field"
import FileUpload from "./file-upload"
import './UniversalProfile.css';
import { db, auth } from "../../firebaseConfig"
import { doc, getDoc } from "firebase/firestore"

const bbbeeOptions = [
  { value: "1", label: "Level 1" },
  { value: "2", label: "Level 2" },
  { value: "3", label: "Level 3" },
  { value: "4", label: "Level 4" },
  { value: "5", label: "Level 5" },
  { value: "6", label: "Level 6" },
  { value: "7", label: "Level 7" },
  { value: "8", label: "Level 8" },
  { value: "exempt", label: "Exempt" },
  { value: "none", label: "None" },
]

const cipcStatusOptions = [
  { value: "current", label: "Current" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
  { value: "na", label: "Not Applicable" },
]

export default function LegalCompliance({ data = {}, updateData }) {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  // Load data from Firebase when component mounts
  useEffect(() => {
    const loadLegalCompliance = async () => {
      try {
        setIsLoading(true)
        const userId = auth.currentUser?.uid
        
        if (!userId) {
          setIsLoading(false)
          return
        }

        // Load from the universalProfiles collection
        const docRef = doc(db, "universalProfiles", userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const profileData = docSnap.data()
          
          // Check if legalCompliance data exists
          if (profileData.legalCompliance) {
            const legalData = profileData.legalCompliance
            setFormData(legalData)
            updateData(legalData)
          } else {
            // If no data exists, initialize with passed data or default structure
            const initData = Object.keys(data).length > 0 ? data : {
              taxNumber: "",
              taxClearanceNumber: "",
              taxClearanceDate: "",
              vatNumber: "",
              rscNumber: "",
              uifNumber: "",
              payeNumber: "",
              bbbeeLevel: "",
              bbbeeCertRenewalDate: "",
              cipcStatus: "",
              coidaNumber: "",
              industryAccreditations: "",
              taxClearanceCert: [],
              bbbeeCert: [],
              otherCerts: [],
              industryAccreditationDocs: []
            }
            setFormData(initData)
            updateData(initData)
          }
        } else {
          // No profile exists yet, use passed data or default structure
          const initData = Object.keys(data).length > 0 ? data : {
            taxNumber: "",
            taxClearanceNumber: "",
            taxClearanceDate: "",
            vatNumber: "",
            rscNumber: "",
            uifNumber: "",
            payeNumber: "",
            bbbeeLevel: "",
            bbbeeCertRenewalDate: "",
            cipcStatus: "",
            coidaNumber: "",
            industryAccreditations: "",
            taxClearanceCert: [],
            bbbeeCert: [],
            otherCerts: [],
            industryAccreditationDocs: []
          }
          setFormData(initData)
          updateData(initData)
        }
      } catch (error) {
        console.error("Error loading legal compliance details:", error)
        // Fallback to passed data on error
        setFormData(data)
        updateData(data)
      } finally {
        setIsLoading(false)
      }
    }

    loadLegalCompliance()
  }, []) // Empty dependency array to run only once on mount

  // Update form data when data prop changes (but only if not loading from Firebase)
  useEffect(() => {
    if (!isLoading && Object.keys(formData).length === 0) {
      setFormData(data)
    }
  }, [data, isLoading])

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const handleFileChange = (name, files) => {
    const updatedData = { ...formData, [name]: files }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    updateData(updatedData)
  }

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="legal-compliance-loading">
        <h2 className="text-2xl font-bold text-brown-800 mb-6">Legal & Compliance</h2>
        <p>Loading your compliance information...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-brown-800 mb-6">Legal & Compliance</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormField label="Tax Number" required>
            <input
              type="text"
              name="taxNumber"
              value={formData.taxNumber || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tax Clearance Number" required>
              <input
                type="text"
                name="taxClearanceNumber"
                value={formData.taxClearanceNumber || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              />
            </FormField>

            <FormField label="Expiry Date" required>
              <input
                type="date"
                name="taxClearanceDate"
                value={formData.taxClearanceDate || ""}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              />
            </FormField>
          </div>

          <FormField label="VAT Number">
            <input
              type="text"
              name="vatNumber"
              value={formData.vatNumber || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>

          <FormField label="RSC Number (if any)">
            <input
              type="text"
              name="rscNumber"
              value={formData.rscNumber || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="UIF Number">
              <input
                type="text"
                name="uifNumber"
                value={formData.uifNumber || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              />
            </FormField>

            <FormField label="PAYE Number">
              <input
                type="text"
                name="payeNumber"
                value={formData.payeNumber || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="B-BBEE Level" required>
              <select
                name="bbbeeLevel"
                value={formData.bbbeeLevel || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              >
                <option value="">Select Level</option>
                {bbbeeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Certificate Renewal Date"
              required={formData.bbbeeLevel && formData.bbbeeLevel !== "none" && formData.bbbeeLevel !== "exempt"}
            >
              <input
                type="date"
                name="bbbeeCertRenewalDate"
                value={formData.bbbeeCertRenewalDate || ""}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required={formData.bbbeeLevel && formData.bbbeeLevel !== "none" && formData.bbbeeLevel !== "exempt"}
              />
            </FormField>
          </div>

          <FormField label="CIPC Returns Status" required>
            <select
              name="cipcStatus"
              value={formData.cipcStatus || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            >
              <option value="">Select Status</option>
              {cipcStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="COIDA No. (if applicable)">
            <input
              type="text"
              name="coidaNumber"
              value={formData.coidaNumber || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>

          <FormField label="Industry Accreditations (optional)">
            <textarea
              name="industryAccreditations"
              value={formData.industryAccreditations || ""}
              onChange={handleChange}
              rows={2}
              placeholder="List any industry-specific accreditations"
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            ></textarea>
          </FormField>
        </div>
      </div>

      <div className="mt-8 border-t border-brown-200 pt-6">
        <h3 className="text-lg font-semibold text-brown-700 mb-4">Required Documents</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Tax Clearance Certificate"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            onChange={(files) => handleFileChange("taxClearanceCert", files)}
            value={formData.taxClearanceCert || []}
          />

          <FileUpload
            label="B-BBEE Certificate"
            accept=".pdf,.jpg,.jpeg,.png"
            required={formData.bbbeeLevel && formData.bbbeeLevel !== "none" && formData.bbbeeLevel !== "exempt"}
            onChange={(files) => handleFileChange("bbbeeCert", files)}
            value={formData.bbbeeCert || []}
          />

          <FileUpload
            label="VAT/UIF/PAYE/COIDA Certificates (if applicable)"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={(files) => handleFileChange("otherCerts", files)}
            value={formData.otherCerts || []}
          />

          <FileUpload
            label="Industry Accreditations (if available)"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={(files) => handleFileChange("industryAccreditationDocs", files)}
            value={formData.industryAccreditationDocs || []}
          />
        </div>
      </div>
    </div>
  )
}