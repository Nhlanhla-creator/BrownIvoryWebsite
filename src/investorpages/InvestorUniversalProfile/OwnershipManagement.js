"use client"
import { Plus, Trash2 } from "lucide-react"
import styles from "./InvestorUniversalProfile.module.css"
import FileUpload from "./FileUpload"

const raceOptions = [
  { value: "black", label: "Black African" },
  { value: "coloured", label: "Coloured" },
  { value: "indian", label: "Indian/Asian" },
  { value: "white", label: "White" },
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
  // Add more countries as needed
]

const inputStyle = `${styles.input} w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500`
const buttonStyle = `${styles.button} flex items-center px-3 py-1 bg-brown-100 text-brown-700 rounded-md hover:bg-brown-200`

const columnStyles = {
  name: "min-w-[200px] w-[25%]", // Wider column for names
  id: "min-w-[180px] w-[20%]", // Wider column for IDs
  shareholding: "min-w-[120px] w-[15%]", // Wider column for shareholding percentage
  narrow: "w-[80px]", // Narrow column for Gender, Exec/Non-Exec
  medium: "w-[100px]", // Medium width for other columns
  checkbox: "w-[60px]", // Very narrow for checkboxes
  actions: "w-[60px]", // Very narrow for action buttons
}

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
      directors: [
        ...data.directors,
        {
          name: "",
          id: "",
          position: "",
          nationality: "",
          execType: "",
          race: "",
          gender: "",
          isYouth: false,
          isDisabled: false,
        },
      ],
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
                ? [
                    { label: "Name", style: { width: "28%", minWidth: "200px" } },
                    { label: "ID/Reg No.", style: { width: "22%", minWidth: "180px" } },
                    { label: "Country", style: { width: "12%" } },
                    { label: "% Shareholding", style: { width: "10%", minWidth: "90px" } },
                    { label: "Race", style: { width: "10%" } },
                    { label: "Gender", style: { width: "80px" } },
                    { label: "Youth", style: { width: "60px" } },
                    { label: "Disabled", style: { width: "60px" } },
                    { label: "Actions", style: { width: "60px" } },
                  ]
                : [
                    { label: "Name", style: { width: "25%", minWidth: "200px" } },
                    { label: "ID", style: { width: "20%", minWidth: "180px" } },
                    { label: "Position", style: { width: "18%", minWidth: "150px" } },
                    { label: "Nationality", style: { width: "12%" } },
                    { label: "Exec/Non-Exec", style: { width: "80px" } },
                    { label: "Race", style: { width: "10%" } },
                    { label: "Gender", style: { width: "80px" } },
                    { label: "Is Youth", style: { width: "60px" } },
                    { label: "Is Disabled", style: { width: "60px" } },
                    { label: "Actions", style: { width: "60px" } },
                  ]
              ).map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-2 border-b font-semibold uppercase text-sm text-brown-600"
                  style={header.style}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-brown-50"} hover:bg-brown-100`}>
                {isShareholder ? (
                  <>
                    <td className={`px-4 py-2 border-b`} style={{ width: "28%", minWidth: "200px" }}>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(index, "name", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className={`px-4 py-2 border-b`} style={{ width: "22%", minWidth: "180px" }}>
                      <input
                        type="text"
                        value={item.idRegNo}
                        onChange={(e) => updateItem(index, "idRegNo", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className={`px-4 py-2 border-b`} style={{ width: "12%" }}>
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
                    <td className={`px-4 py-2 border-b`} style={{ width: "10%", minWidth: "90px" }}>
                      <input
                        type="number"
                        value={item.shareholding}
                        onChange={(e) => updateItem(index, "shareholding", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className={`px-4 py-2 border-b`} style={{ width: "10%" }}>
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
                    <td className={`px-4 py-2 border-b`} style={{ width: "80px" }}>
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
                    <td className={`px-4 py-2 border-b`} style={{ width: "60px" }}>
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          checked={item.isYouth}
                          onChange={(e) => updateItem(index, "isYouth", e.target.checked)}
                        />
                      </div>
                    </td>
                    <td className={`px-4 py-2 border-b`} style={{ width: "60px" }}>
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
                    <td className={`px-4 py-2 border-b`} style={{ width: "25%", minWidth: "200px" }}>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(index, "name", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className={`px-4 py-2 border-b`} style={{ width: "20%", minWidth: "180px" }}>
                      <input
                        type="number"
                        value={item.id}
                        onChange={(e) => updateItem(index, "id", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className={`px-4 py-2 border-b`} style={{ width: "18%", minWidth: "150px" }}>
                      <input
                        type="text"
                        value={item.position}
                        onChange={(e) => updateItem(index, "position", e.target.value)}
                        className={inputStyle}
                      />
                    </td>
                    <td className={`px-4 py-2 border-b`} style={{ width: "12%" }}>
                      <select
                        value={item.nationality || ""}
                        onChange={(e) => updateItem(index, "nationality", e.target.value)}
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

                    <td className={`px-4 py-2 border-b`} style={{ width: "80px" }}>
                      <select
                        value={item.execType || ""}
                        onChange={(e) => updateItem(index, "execType", e.target.value)}
                        className={inputStyle}
                      >
                        <option value="">Select</option>
                        {execOptions.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className={`px-4 py-2 border-b`} style={{ width: "10%" }}>
                      <select
                        value={item.race || ""}
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
                    <td className={`px-4 py-2 border-b`} style={{ width: "80px" }}>
                      <select
                        value={item.gender || ""}
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
                    <td className={`px-4 py-2 border-b`} style={{ width: "60px" }}>
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          checked={item.isYouth || false}
                          onChange={(e) => updateItem(index, "isYouth", e.target.checked)}
                        />
                      </div>
                    </td>
                    <td className={`px-4 py-2 border-b`} style={{ width: "60px" }}>
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          checked={item.isDisabled || false}
                          onChange={(e) => updateItem(index, "isDisabled", e.target.checked)}
                        />
                      </div>
                    </td>
                  </>
                )}
                <td className={`px-4 py-2 border-b text-center ${columnStyles.actions}`}>
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
