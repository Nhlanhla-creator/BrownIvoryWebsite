"use client"
import FormField from "./form-field"
import FileUpload from "./file-upload"
import './UniversalProfile.css';

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
      <h2 className="text-2xl font-bold text-brown-800 mb-6">Contact Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-brown-700 mb-4">Primary Contact Person</h3>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <FormField label="Title" required>
              <select
                name="contactTitle"
                value={data.contactTitle || ""}
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
                value={data.contactName || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              />
            </FormField>
          </div>

          <FormField label="ID Number" required>
            <input
              type="text"
              name="contactId"
              value={data.contactId || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Business Phone" required>
            <input
              type="tel"
              name="businessPhone"
              value={data.businessPhone || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Mobile" required>
            <input
              type="tel"
              name="mobile"
              value={data.mobile || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Email" required>
            <input
              type="email"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
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
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-brown-700 mb-4">Address Information</h3>

          <FormField label="Physical Address" required>
            <textarea
              name="physicalAddress"
              value={data.physicalAddress || ""}
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
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required={!data.sameAsPhysical}
              ></textarea>
            </FormField>
          )}

          <h3 className="text-lg font-semibold text-brown-700 mt-6 mb-4">Social Media Links</h3>

          <FormField label="LinkedIn">
            <input
              type="url"
              name="linkedin"
              value={data.linkedin || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/..."
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>

          <FormField label="Other Social Media">
            <input
              type="url"
              name="otherSocial"
              value={data.otherSocial || ""}
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
          value={data.proofOfAddress || []}
        />
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
