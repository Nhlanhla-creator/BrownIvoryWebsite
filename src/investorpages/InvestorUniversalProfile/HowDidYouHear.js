"use client"

import FormField from "./FormField"
import styles from "./InvestorUniversalProfile.module.css"

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
      <h2 className={styles.sectionTitle}>How Did You Hear About Us?</h2>

      <div className={styles.formWrapper}>
        <FormField label="Source" required>
          <select
            name="source"
            value={data.source || ""}
            onChange={handleChange}
            className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
            />
          </FormField>
        )}

        <FormField label="Additional Comments">
          <textarea
            name="additionalComments"
            value={data.additionalComments || ""}
            onChange={handleChange}
            rows={4}
            className={styles.input}
          ></textarea>
        </FormField>
      </div>

      <div className={styles.actions}></div>
    </div>
  )
}
