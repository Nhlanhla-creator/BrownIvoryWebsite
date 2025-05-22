"use client"
import { useEffect, useState } from "react"
import FormField from "./form-field"
import FileUpload from "./file-upload"
import './UniversalProfile.css';
import { db, auth } from "../../firebaseConfig"
import { doc, getDoc } from "firebase/firestore"

export default function ContactDetails({ data = {}, updateData }) {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  // Load data from Firebase when component mounts
  useEffect(() => {
    const loadContactDetails = async () => {
      try {
        setIsLoading(true)
        const userId = auth.currentUser?.uid
        
        if (!userId) {
          setIsLoading(false)
          return
        }

        // Load from the universalProfiles collection (matching your main structure)
        const docRef = doc(db, "universalProfiles", userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const profileData = docSnap.data()
          
          // Check if contactDetails data exists
          if (profileData.contactDetails) {
            const contactData = profileData.contactDetails
            setFormData(contactData)
            updateData(contactData)
          } else {
            // If no data exists, initialize with passed data or default structure
            const initData = Object.keys(data).length > 0 ? data : {
              contactTitle: "",
              contactName: "",
              contactId: "",
              businessPhone: "",
              mobile: "",
              email: "",
              website: "",
              physicalAddress: "",
              sameAsPhysical: false,
              postalAddress: "",
              linkedin: "",
              otherSocial: "",
              proofOfAddress: []
            }
            setFormData(initData)
            updateData(initData)
          }
        } else {
          // No profile exists yet, use passed data or default structure
          const initData = Object.keys(data).length > 0 ? data : {
            contactTitle: "",
            contactName: "",
            contactId: "",
            businessPhone: "",
            mobile: "",
            email: "",
            website: "",
            physicalAddress: "",
            sameAsPhysical: false,
            postalAddress: "",
            linkedin: "",
            otherSocial: "",
            proofOfAddress: []
          }
          setFormData(initData)
          updateData(initData)
        }
      } catch (error) {
        console.error("Error loading contact details:", error)
        // Fallback to passed data on error
        const fallbackData = Object.keys(data).length > 0 ? data : {
          contactTitle: "",
          contactName: "",
          contactId: "",
          businessPhone: "",
          mobile: "",
          email: "",
          website: "",
          physicalAddress: "",
          sameAsPhysical: false,
          postalAddress: "",
          linkedin: "",
          otherSocial: "",
          proofOfAddress: []
        }
        setFormData(fallbackData)
        updateData(fallbackData)
      } finally {
        setIsLoading(false)
      }
    }

    loadContactDetails()
  }, []) // Remove data dependency to prevent infinite loops

  // Update form data when data prop changes (but only if not loading from Firebase)
  useEffect(() => {
    if (!isLoading && Object.keys(formData).length === 0) {
      setFormData(data)
    }
  }, [data, isLoading])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const updatedValue = type === "checkbox" ? checked : value
    const updatedData = { ...formData, [name]: updatedValue }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const handleFileChange = (name, files) => {
    const updatedData = { ...formData, [name]: files }
    setFormData(updatedData)
    updateData(updatedData)
  }

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="contact-details-loading">
        <h2 className="text-2xl font-bold text-brown-800 mb-6">Contact Details</h2>
        <p>Loading your information...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-brown-800 mb-6">Contact Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-brown-700 mb-4">Primary Contact Person</h3>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <FormField label="Title" required>
              <select
                name="contactTitle"
                value={formData.contactTitle || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              >
                <option value="">Select</option>
                <option value="mr">Mr</option>
                <option value="mrs">Mrs</option>
                <option value="ms">Ms</option>
                <option value="dr">Dr</option>
                <option value="prof">Prof</option>
              </select>
            </FormField>

            <FormField label="Name" required className="col-span-2">
              <input
                type="text"
                name="contactName"
                value={formData.contactName || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              />
            </FormField>
          </div>

          <FormField label="ID Number" required>
            <input
              type="number"
              name="contactId"
              value={formData.contactId || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Business Phone" required>
            <input
              type="number"
              name="businessPhone"
              value={formData.businessPhone || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Mobile" required>
            <input
              type="number"
              name="mobile"
              value={formData.mobile || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Email" required>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Website">
            <input
              type="url"
              name="website"
              value={formData.website || ""}
              onChange={handleChange}
              placeholder="https://"
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-brown-700 mb-4">Address Information</h3>

          <FormField label="Physical Address" required>
            <textarea
              name="physicalAddress"
              value={formData.physicalAddress || ""}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            ></textarea>
          </FormField>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sameAsPhysical"
                checked={formData.sameAsPhysical || false}
                onChange={handleChange}
                className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
              />
              <span className="ml-2 text-sm text-brown-700">Postal address same as physical</span>
            </label>
          </div>

          {!formData.sameAsPhysical && (
            <FormField label="Postal Address" required>
              <textarea
                name="postalAddress"
                value={formData.postalAddress || ""}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required={!formData.sameAsPhysical}
              ></textarea>
            </FormField>
          )}

          <h3 className="text-lg font-semibold text-brown-700 mt-6 mb-4">Social Media Links</h3>

          <FormField label="LinkedIn">
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/..."
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>

          <FormField label="Other Social Media">
            <input
              type="url"
              name="otherSocial"
              value={formData.otherSocial || ""}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>
        </div>
      </div>

      <div className="mt-8 border-t border-brown-200 pt-6">
        <h3 className="text-lg font-semibold text-brown-700 mb-4">Required Documents</h3>

        <FileUpload
          label="Proof of Address (Utility Bill, Lease Agreement)"
          accept=".pdf,.jpg,.jpeg,.png"
          required
          onChange={(files) => handleFileChange("proofOfAddress", files)}
          value={formData.proofOfAddress || []}
        />
      </div>

      <div className="mt-8 flex justify-end">
       
      </div>
    </div>
  )
}