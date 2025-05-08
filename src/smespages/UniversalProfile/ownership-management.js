"use client"
import { Plus, Trash2 } from "lucide-react"
import FormField from "./form-field"
import FileUpload from "./file-upload"
import './UniversalProfile.css';

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

const countryOptions = [
  { value: "za", label: "South Africa" },
  { value: "na", label: "Namibia" },
  { value: "bw", label: "Botswana" },
  { value: "zw", label: "Zimbabwe" },
  { value: "mz", label: "Mozambique" },
  { value: "other", label: "Other" },
]

export default function OwnershipManagement({ data = { shareholders: [], directors: [] }, updateData }) {
  const addShareholder = () => {
    const newShareholders = [
      ...data.shareholders,
      { name: "", idRegNo: "", country: "", shareholding: "", race: "", gender: "", isYouth: false, isDisabled: false },
    ]
    updateData({ shareholders: newShareholders })
  }

  const updateShareholder = (index, field, value) => {
    const newShareholders = [...data.shareholders]
    newShareholders[index] = { ...newShareholders[index], [field]: value }
    updateData({ shareholders: newShareholders })
  }

  const removeShareholder = (index) => {
    const newShareholders = [...data.shareholders]
    newShareholders.splice(index, 1)
    updateData({ shareholders: newShareholders })
  }

  const addDirector = () => {
    const newDirectors = [...data.directors, { name: "", id: "", position: "", nationality: "", isExec: false }]
    updateData({ directors: newDirectors })
  }

  const updateDirector = (index, field, value) => {
    const newDirectors = [...data.directors]
    newDirectors[index] = { ...newDirectors[index], [field]: value }
    updateData({ directors: newDirectors })
  }

  const removeDirector = (index) => {
    const newDirectors = [...data.directors]
    newDirectors.splice(index, 1)
    updateData({ directors: newDirectors })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleFileChange = (name, files) => {
    updateData({ [name]: files })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-brown-800 mb-6">Ownership & Management</h2>

      <div className="mb-8">
        <FormField label="Total Shares" required>
          <input
            type="number"
            name="totalShares"
            value={data.totalShares || ""}
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
              {data.shareholders.map((shareholder, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-brown-50"}>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      value={shareholder.name}
                      onChange={(e) => updateShareholder(index, "name", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      value={shareholder.idRegNo}
                      onChange={(e) => updateShareholder(index, "idRegNo", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={shareholder.country}
                      onChange={(e) => updateShareholder(index, "country", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    >
                      <option value="">Select</option>
                      {countryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="number"
                      value={shareholder.shareholding}
                      onChange={(e) => updateShareholder(index, "shareholding", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={shareholder.race}
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
                      value={shareholder.gender}
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
                      checked={shareholder.isYouth}
                      onChange={(e) => updateShareholder(index, "isYouth", e.target.checked)}
                      className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <input
                      type="checkbox"
                      checked={shareholder.isDisabled}
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
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Position
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Nationality
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Is Exec/Non-exec?
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-brown-700 uppercase tracking-wider border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.directors.map((director, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-brown-50"}>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      value={director.name}
                      onChange={(e) => updateDirector(index, "name", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      value={director.id}
                      onChange={(e) => updateDirector(index, "id", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      value={director.position}
                      onChange={(e) => updateDirector(index, "position", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      value={director.nationality}
                      onChange={(e) => updateDirector(index, "nationality", e.target.value)}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <select
                      value={director.isExec ? "exec" : "nonexec"}
                      onChange={(e) => updateDirector(index, "isExec", e.target.value === "exec")}
                      className="w-full px-2 py-1 border border-brown-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brown-500"
                    >
                      <option value="exec">Executive</option>
                      <option value="nonexec">Non-Executive</option>
                    </select>
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
            value={data.certifiedIds || []}
          />

          <FileUpload
            label="Share Register"
            accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls"
            required
            onChange={(files) => handleFileChange("shareRegister", files)}
            value={data.shareRegister || []}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="px-6 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2"
        >
          Save & Continue
        </button>
      </div>
    </div>
  )
}
