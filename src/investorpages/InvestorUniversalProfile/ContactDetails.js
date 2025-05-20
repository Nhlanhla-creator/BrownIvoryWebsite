"use client"
import FormField from "./FormField";
import FileUpload from "./FileUpload";
import styles from "./InvestorUniversalProfile.module.css";

export default function ContactDetails({ data = {}, updateData }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    updateData({ [name]: type === "checkbox" ? checked : value })
  }

  const handleFileChange = (name, files) => {
    updateData({ [name]: files })
  }

  return (
    <div>
      <h2 className={`${styles.title} text-2xl font-bold mb-6`}>Contact Details</h2>

      <div className={`${styles.grid} grid grid-cols-1 md:grid-cols-2 gap-6`}>
        <div>
          <h3 className={`${styles.subtitle} text-lg font-semibold mb-4`}>Primary Contact Person</h3>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <FormField label="Title" required>
              <select
                name="contactTitle"
                value={data.contactTitle || ""}
                onChange={handleChange}
                className={styles.input}
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
                value={data.contactName || ""}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </FormField>
          </div>

          <FormField label="ID Number" required>
            <input
              type="number"
              name="contactId"
              value={data.contactId || ""}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </FormField>

          <FormField label="Business Phone" required>
            <input
              type="number"
              name="businessPhone"
              value={data.businessPhone || ""}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </FormField>

          <FormField label="Mobile" required>
            <input
              type="number"
              name="mobile"
              value={data.mobile || ""}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </FormField>

          <FormField label="Email" required>
            <input
              type="email"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </FormField>

          <FormField label="Website">
            <input
              type="url"
              name="website"
              value={data.website || ""}
              onChange={handleChange}
              placeholder="https://"
              className={styles.input}
            />
          </FormField>
        </div>

        <div>
          <h3 className={`${styles.subtitle} text-lg font-semibold mb-4`}>Address Information</h3>

          <FormField label="Physical Address" required>
            <textarea
              name="physicalAddress"
              value={data.physicalAddress || ""}
              onChange={handleChange}
              rows={3}
              className={styles.input}
              required
            ></textarea>
          </FormField>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sameAsPhysical"
                checked={data.sameAsPhysical || false}
                onChange={handleChange}
                className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
              />
              <span className="ml-2 text-sm text-brown-700">Postal address same as physical</span>
            </label>
          </div>

          {!data.sameAsPhysical && (
            <FormField label="Postal Address" required>
              <textarea
                name="postalAddress"
                value={data.postalAddress || ""}
                onChange={handleChange}
                rows={3}
                className={styles.input}
                required={!data.sameAsPhysical}
              ></textarea>
            </FormField>
          )}

          <h3 className={`${styles.subtitle} text-lg font-semibold mt-6 mb-4`}>Social Media Links</h3>

          <FormField label="LinkedIn">
            <input
              type="url"
              name="linkedin"
              value={data.linkedin || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/..."
              className={styles.input}
            />
          </FormField>

          <FormField label="Other Social Media">
            <input
              type="url"
              name="otherSocial"
              value={data.otherSocial || ""}
              onChange={handleChange}
              placeholder="https://..."
              className={styles.input}
            />
          </FormField>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className={`${styles.subtitle} text-lg font-semibold mb-4`}>Required Documents</h3>

        <FileUpload
          label="Proof of Address (Utility Bill, Lease Agreement)"
          accept=".pdf,.jpg,.jpeg,.png"
          required
          onChange={(files) => handleFileChange("proofOfAddress", files)}
          value={data.proofOfAddress || []}
        />
      </div>
    </div>
  )
}
