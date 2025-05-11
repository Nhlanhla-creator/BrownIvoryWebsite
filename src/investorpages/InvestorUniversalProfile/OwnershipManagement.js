"use client"
import { Plus, Trash2 } from "lucide-react"
import styles from "./InvestorUniversalProfile.module.css"
import FileUpload from "./FileUpload"

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

const africanCountries = [
  { value: "algeria", label: "Algeria" },
  { value: "angola", label: "Angola" },
  { value: "benin", label: "Benin" },
  // Add more countries as needed
]

const inputStyle = `${styles.input} w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500`
const buttonStyle = `${styles.button} flex items-center px-3 py-1 bg-brown-100 text-brown-700 rounded-md hover:bg-brown-200`

export default function OwnershipManagement({ data = { shareholders: [], directors: [] }, updateData }) {
  const addShareholder = () => {
    updateData({
      shareholders: [
        ...data.shareholders,
        {
          name: "",
          idRegNo: "",
          country: "",
          shareholding: "",
          race: "",
          gender: "",
          isYouth: false,
          isDisabled: false,
        },
      ],
    })
  }

  const updateShareholder = (index, field, value) => {
    const updated = [...data.shareholders]
    updated[index] = { ...updated[index], [field]: value }
    updateData({ shareholders: updated })
  }

  const removeShareholder = (index) => {
    const updated = [...data.shareholders]
    updated.splice(index, 1)
    updateData({ shareholders: updated })
  }

  const addDirector = () => {
    updateData({
      directors: [...data.directors, { name: "", id: "", position: "", nationality: "", isExec: false }],
    })
  }

  const updateDirector = (index, field, value) => {
    const updated = [...data.directors]
    updated[index] = { ...updated[index], [field]: value }
    updateData({ directors: updated })
  }

  const removeDirector = (index) => {
    const updated = [...data.directors]
    updated.splice(index, 1)
    updateData({ directors: updated })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleFileChange = (name, files) => {
    updateData({ [name]: files })
  }

  return (
    <div className={`${styles.container} p-6`}>
      <h2 className={`${styles.title} text-2xl font-bold text-brown-800 mb-6`}>Ownership & Management</h2>

      <div className="mb-8">
        <label className="block font-medium text-brown-700 mb-2">Total Shares</label>
        <input
          type="number"
          name="totalShares"
          value={data.totalShares || ""}
          onChange={handleChange}
          className={inputStyle}
          required
        />
      </div>

      <Section
        title="Shareholder Table"
        addItem={addShareholder}
        dataList={data.shareholders}
        updateItem={updateShareholder}
        removeItem={removeShareholder}
        isShareholder
      />

      <Section
        title="Director Table"
        addItem={addDirector}
        dataList={data.directors}
        updateItem={updateDirector}
        removeItem={removeDirector}
      />

      <div className={styles.documentSection}>
        <h3 className={styles.sectionHeading}>Required Documents</h3>
        <div className={styles.documentGrid}>
          <FileUpload
            label="Certified IDs"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={(files) => handleFileChange("certifiedIDs", files)}
            value={data.certifiedIDs || []}
          />

          <FileUpload
            label="Share Register"
            accept=".pdf,.doc,.docx"
            onChange={(files) => handleFileChange("shareRegister", files)}
            value={data.shareRegister || []}
          />

          <FileUpload
            label="Company Registration Documents"
            accept=".pdf,.doc,.docx"
            onChange={(files) => handleFileChange("registrationDocs", files)}
            value={data.registrationDocs || []}
          />
        </div>
      </div>
    </div>
  )
}

function Section({ title, addItem, dataList, updateItem, removeItem, isShareholder }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-brown-700">{title}</h3>
        <button type="button" onClick={addItem} className={buttonStyle}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-brown-200 rounded-lg">
          <thead>
            <tr className="bg-brown-50">
              {(isShareholder
                ? ["Name", "ID/Reg No.", "Country", "% Shareholding", "Race", "Gender", "Youth", "Disabled", "Actions"]
                : ["Name", "ID", "Position", "Nationality", "Exec", "Actions"]
              ).map((header, i) => (
                <th key={i} className="px-4 py-2 border-b font-semibold uppercase text-sm text-brown-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-brown-50"} hover:bg-brown-100`}>
                {isShareholder ? (
                  <>
                    <td className="px-4 py-2 border-b">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(index, "name", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      <input
                        type="text"
                        value={item.idRegNo}
                        onChange={(e) => updateItem(index, "idRegNo", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      <select
                        value={item.country}
                        onChange={(e) => updateItem(index, "country", e.target.value)}
                        className={inputStyle}
                      >
                        <option value="">Select</option>
                        {africanCountries.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <input
                        type="number"
                        value={item.shareholding}
                        onChange={(e) => updateItem(index, "shareholding", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      <select
                        value={item.race}
                        onChange={(e) => updateItem(index, "race", e.target.value)}
                        className={inputStyle}
                      >
                        <option value="">Select</option>
                        {raceOptions.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <select
                        value={item.gender}
                        onChange={(e) => updateItem(index, "gender", e.target.value)}
                        className={inputStyle}
                      >
                        <option value="">Select</option>
                        {genderOptions.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          checked={item.isYouth}
                          onChange={(e) => updateItem(index, "isYouth", e.target.checked)}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          checked={item.isDisabled}
                          onChange={(e) => updateItem(index, "isDisabled", e.target.checked)}
                        />
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2 border-b">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(index, "name", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      <input
                        type="text"
                        value={item.id}
                        onChange={(e) => updateItem(index, "id", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      <input
                        type="text"
                        value={item.position}
                        onChange={(e) => updateItem(index, "position", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      <input
                        type="text"
                        value={item.nationality}
                        onChange={(e) => updateItem(index, "nationality", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          checked={item.isExec}
                          onChange={(e) => updateItem(index, "isExec", e.target.checked)}
                        />
                      </div>
                    </td>
                  </>
                )}
                <td className="px-4 py-2 border-b text-center">
                  <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
