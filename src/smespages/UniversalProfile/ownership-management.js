"use client"
import { Plus, Trash2 } from 'lucide-react'
import FormField from "./form-field"
import FileUpload from "./file-upload"
import './UniversalProfile.css';
import { useEffect, useState } from 'react';
import { db, auth, storage } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const raceOptions = [
  { value: "black", label: "Black African" },
  { value: "coloured", label: "Coloured" },
  { value: "indian", label: "Indian/Asian" },
  { value: "white", label: "White" },
  { value: "other", label: "Other" },
]

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not", label: "Prefer not to say" },
]

const execOptions = [
  { value: "executive", label: "Executive" },
  { value: "non-executive", label: "Non-Executive" },
]

const africanCountries = [
  { value: "algeria", label: "Algeria" },
  { value: "angola", label: "Angola" },
  { value: "benin", label: "Benin" },
  { value: "botswana", label: "Botswana" },
  { value: "burkina_faso", label: "Burkina Faso" },
  { value: "burundi", label: "Burundi" },
  { value: "cabo_verde", label: "Cabo Verde" },
  { value: "cameroon", label: "Cameroon" },
  { value: "central_african_republic", label: "Central African Republic" },
  { value: "chad", label: "Chad" },
  { value: "comoros", label: "Comoros" },
  { value: "congo", label: "Congo" },
  { value: "cote_d_ivoire", label: "Côte d'Ivoire" },
  { value: "djibouti", label: "Djibouti" },
  { value: "drc", label: "DR Congo" },
  { value: "egypt", label: "Egypt" },
  { value: "equatorial_guinea", label: "Equatorial Guinea" },
  { value: "eritrea", label: "Eritrea" },
  { value: "eswatini", label: "Eswatini" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "gabon", label: "Gabon" },
  { value: "gambia", label: "Gambia" },
  { value: "ghana", label: "Ghana" },
  { value: "guinea", label: "Guinea" },
  { value: "guinea_bissau", label: "Guinea-Bissau" },
  { value: "kenya", label: "Kenya" },
  { value: "lesotho", label: "Lesotho" },
  { value: "liberia", label: "Liberia" },
  { value: "libya", label: "Libya" },
  { value: "madagascar", label: "Madagascar" },
  { value: "malawi", label: "Malawi" },
  { value: "mali", label: "Mali" },
  { value: "mauritania", label: "Mauritania" },
  { value: "mauritius", label: "Mauritius" },
  { value: "morocco", label: "Morocco" },
  { value: "mozambique", label: "Mozambique" },
  { value: "namibia", label: "Namibia" },
  { value: "niger", label: "Niger" },
  { value: "nigeria", label: "Nigeria" },
  { value: "rwanda", label: "Rwanda" },
  { value: "sao_tome_and_principe", label: "São Tomé and Príncipe" },
  { value: "senegal", label: "Senegal" },
  { value: "seychelles", label: "Seychelles" },
  { value: "sierra_leone", label: "Sierra Leone" },
  { value: "somalia", label: "Somalia" },
  { value: "south_africa", label: "South Africa" },
  { value: "south_sudan", label: "South Sudan" },
  { value: "sudan", label: "Sudan" },
  { value: "tanzania", label: "Tanzania" },
  { value: "togo", label: "Togo" },
  { value: "tunisia", label: "Tunisia" },
  { value: "uganda", label: "Uganda" },
  { value: "zambia", label: "Zambia" },
  { value: "zimbabwe", label: "Zimbabwe" },
]

export default function OwnershipManagement({ data = { shareholders: [], directors: [] }, updateData }) {
  const [formData, setFormData] = useState({ shareholders: [], directors: [] })
  const [isLoading, setIsLoading] = useState(true)

  // Load data from Firebase when component mounts
  useEffect(() => {
    const loadOwnershipManagement = async () => {
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
          
          // Check if ownershipManagement data exists
          if (profileData.ownershipManagement) {
            const ownershipData = profileData.ownershipManagement
            setFormData(ownershipData)
            updateData(ownershipData)
          } else {
            // If no data exists, initialize with passed data or default structure
            const initData = data.shareholders?.length > 0 || data.directors?.length > 0 ? data : {
              shareholders: [
                {
                  name: "",
                  idRegNo: "",
                  country: "",
                  shareholding: "",
                  race: "",
                  gender: "",
                  isYouth: false,
                  isDisabled: false,
                  idDocument: null,
                }
              ],
              directors: [
                {
                  name: "",
                  id: "",
                  position: "",
                  nationality: "",
                  isExec: false,
                  doc: null,
                }
              ],
            }
            setFormData(initData)
            updateData(initData)
          }
        } else {
          // No profile exists yet, use passed data or default structure
          const initData = data.shareholders?.length > 0 || data.directors?.length > 0 ? data : {
            shareholders: [
              {
                name: "",
                idRegNo: "",
                country: "",
                shareholding: "",
                race: "",
                gender: "",
                isYouth: false,
                isDisabled: false,
                idDocument: null,
              }
            ],
            directors: [
              {
                name: "",
                id: "",
                position: "",
                nationality: "",
                isExec: false,
                doc: null,
              }
            ],
          }
          setFormData(initData)
          updateData(initData)
        }
      } catch (error) {
        console.error("Error loading ownership management:", error)
        // Fallback to passed data on error
        const fallbackData = data.shareholders?.length > 0 || data.directors?.length > 0 ? data : {
          shareholders: [
            {
              name: "",
              idRegNo: "",
              country: "",
              shareholding: "",
              race: "",
              gender: "",
              isYouth: false,
              isDisabled: false,
              idDocument: null,
            }
          ],
          directors: [
            {
              name: "",
              id: "",
              position: "",
              nationality: "",
              isExec: false,
              doc: null,
            }
          ],
        }
        setFormData(fallbackData)
        updateData(fallbackData)
      } finally {
        setIsLoading(false)
      }
    }

    loadOwnershipManagement()
  }, []) // Remove data dependency to prevent infinite loops

  // Update form data when data prop changes (but only if not loading from Firebase)
  useEffect(() => {
    if (!isLoading && (!formData.shareholders?.length && !formData.directors?.length)) {
      setFormData(data)
    }
  }, [data, isLoading])

  const addShareholder = () => {
    const newShareholders = [
      ...formData.shareholders,
      { name: "", idRegNo: "", country: "", shareholding: "", race: "", gender: "", isYouth: false, isDisabled: false },
    ]
    const updatedData = { ...formData, shareholders: newShareholders }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const updateShareholder = (index, field, value) => {
    const newShareholders = [...formData.shareholders]
    newShareholders[index] = { ...newShareholders[index], [field]: value }
    const updatedData = { ...formData, shareholders: newShareholders }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const removeShareholder = (index) => {
    const newShareholders = [...formData.shareholders]
    newShareholders.splice(index, 1)
    const updatedData = { ...formData, shareholders: newShareholders }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const addDirector = () => {
    const newDirectors = [...formData.directors, { 
      name: "", 
      id: "", 
      position: "", 
      nationality: "", 
      execType: "", 
      race: "", 
      gender: "", 
      isYouth: false, 
      isDisabled: false 
    }]
    const updatedData = { ...formData, directors: newDirectors }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const updateDirector = (index, field, value) => {
    const newDirectors = [...formData.directors]
    newDirectors[index] = { ...newDirectors[index], [field]: value }
    const updatedData = { ...formData, directors: newDirectors }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const removeDirector = (index) => {
    const newDirectors = [...formData.directors]
    newDirectors.splice(index, 1)
    const updatedData = { ...formData, directors: newDirectors }
    setFormData(updatedData)
    updateData(updatedData)
  }

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

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="ownership-management-loading">
        <h2 className="text-2xl font-bold text-brown-800 mb-6">Ownership & Management</h2>
        <p>Loading your information...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-brown-800 mb-6">Ownership & Management</h2>

      <div className="mb-8">
        <FormField label="Total Shares" required>
          <input
            type="number"
            name="totalShares"
            value={formData.totalShares || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
          />
        </FormField>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-brown-700">Shareholder Table</h3>
          <button
            type="button"
            onClick={addShareholder}
            className="flex items-center px-3 py-1 bg-brown-100 text-brown-700 rounded-md hover:bg-brown-200"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Shareholder
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-brown-200 rounded-lg">
            <thead>
              <tr className="bg-brown-50">
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  ID/Reg No.
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Country
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  % Shareholding
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Race
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Gender
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Is Youth?
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Is Disabled?
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.shareholders?.map((shareholder, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-brown-50"}>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      value={shareholder.name || ""}
                      onChange={(e) => updateShareholder(index, "name", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="number"
                      value={shareholder.idRegNo || ""}
                      onChange={(e) => updateShareholder(index, "idRegNo", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={shareholder.country || ""}
                      onChange={(e) => updateShareholder(index, "country", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    >
                      <option value="">Select</option>
                      {africanCountries.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="number"
                      value={shareholder.shareholding || ""}
                      onChange={(e) => updateShareholder(index, "shareholding", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={shareholder.race || ""}
                      onChange={(e) => updateShareholder(index, "race", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    >
                      <option value="">Select</option>
                      {raceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={shareholder.gender || ""}
                      onChange={(e) => updateShareholder(index, "gender", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    >
                      <option value="">Select</option>
                      {genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <input
                      type="checkbox"
                      checked={shareholder.isYouth || false}
                      onChange={(e) => updateShareholder(index, "isYouth", e.target.checked)}
                      className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <input
                      type="checkbox"
                      checked={shareholder.isDisabled || false}
                      onChange={(e) => updateShareholder(index, "isDisabled", e.target.checked)}
                      className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      type="button"
                      onClick={() => removeShareholder(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-brown-700">Directors Table</h3>
          <button
            type="button"
            onClick={addDirector}
            className="flex items-center px-3 py-1 bg-brown-100 text-brown-700 rounded-md hover:bg-brown-200"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Director
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-brown-200 rounded-lg">
            <thead>
           <tr className="bg-brown-50">
  {[
    { label: "Name", style: { width: "25%", minWidth: "200px" } },
    { label: "ID", style: { width: "20%", minWidth: "180px" } },
    { label: "Position", style: { width: "18%", minWidth: "150px" } },
    { label: "Nationality", style: { width: "12%" } },
    { label: "Exec/Non-Exec", style: { width: "80px" } },
    { label: "Race", style: { width: "10%" } },
    { label: "Gender", style: { width: "80px" } },
    { label: "Is Youth?", style: { width: "60px" } },
    { label: "Is Disabled?", style: { width: "60px" } },
    { label: "Actions", style: { width: "60px" } },
  ].map((header, i) => (
    <th
      key={i}
      className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b"
      style={header.style}
    >
      {header.label}
    </th>
  ))}
</tr>
            </thead>
            <tbody>
              {formData.directors?.map((director, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-brown-50"}>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      value={director.name || ""}
                      onChange={(e) => updateDirector(index, "name", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="number"
                      value={director.id || ""}
                      onChange={(e) => updateDirector(index, "id", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      value={director.position || ""}
                      onChange={(e) => updateDirector(index, "position", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={director.nationality || ""}
                      onChange={(e) => updateDirector(index, "nationality", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    >
                      <option value="">Select</option>
                      {africanCountries.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={director.execType || ""}
                      onChange={(e) => updateDirector(index, "execType", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    >
                      <option value="">Select</option>
                      {execOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={director.race || ""}
                      onChange={(e) => updateDirector(index, "race", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    >
                      <option value="">Select</option>
                      {raceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={director.gender || ""}
                      onChange={(e) => updateDirector(index, "gender", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    >
                      <option value="">Select</option>
                      {genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <input
                      type="checkbox"
                      checked={director.isYouth || false}
                      onChange={(e) => updateDirector(index, "isYouth", e.target.checked)}
                      className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <input
                      type="checkbox"
                      checked={director.isDisabled || false}
                      onChange={(e) => updateDirector(index, "isDisabled", e.target.checked)}
                      className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      type="button"
                      onClick={() => removeDirector(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 border-t border-brown-200 pt-6">
        <h3 className="text-lg font-semibold text-brown-700 mb-4">Required Documents</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Certified IDs of Directors & Shareholders"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            multiple
            onChange={(files) => handleFileChange("certifiedIds", files)}
            value={formData.certifiedIds || []}
          />

          <FileUpload
            label="Share Register"
            accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls"
            required
            onChange={(files) => handleFileChange("shareRegister", files)}
            value={formData.shareRegister || []}
          />
        </div>
      </div>
    </div>
  )
}