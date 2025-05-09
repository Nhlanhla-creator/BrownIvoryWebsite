"use client"
import FormField from "./form-field"
import './UniversalProfile.css';

const sourceOptions = [
  { value: "referral", label: "Referral" },
  { value: "online_ad", label: "Online Advertisement" },
  { value: "partner_org", label: "Partner Organization" },
  { value: "event", label: "Event" },
  { value: "social_media", label: "Social Media" },
  { value: "search_engine", label: "Search Engine" },
  { value: "other", label: "Other" },
]

export default function HowDidYouHear({ data = {}, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-brown-800 mb-6">How Did You Hear About Us?</h2>

      <div className="max-w-xl mx-auto">
        <FormField label="Source" required>
          <select
            name="source"
            value={data.source || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
          >
            <option value="">Select Source</option>
            {sourceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        {data.source === "referral" && (
          <FormField label="Who referred you?">
            <input
              type="text"
              name="referralName"
              value={data.referralName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>
        )}

        {data.source === "partner_org" && (
          <FormField label="Partner Organization Name">
            <input
              type="text"
              name="partnerName"
              value={data.partnerName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>
        )}

        {data.source === "event" && (
          <FormField label="Event Name">
            <input
              type="text"
              name="eventName"
              value={data.eventName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>
        )}

        {data.source === "other" && (
          <FormField label="Please specify">
            <input
              type="text"
              name="otherSource"
              value={data.otherSource || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>
        )}

        <FormField label="Additional Comments">
          <textarea
            name="additionalComments"
            value={data.additionalComments || ""}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
          ></textarea>
        </FormField>
      </div>

      <div className="mt-8 flex justify-end">
      
      </div>
    </div>
  )
}
