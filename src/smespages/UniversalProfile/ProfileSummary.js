"use client"

import { CheckCircle } from "lucide-react"

export default function ProfileSummary({ data }) {
  return (
    <div className="profile-summary">
      <h2 className="text-2xl font-bold mb-6">Your Profile Summary</h2>
      
      <div className="summary-section">
        <h3 className="text-lg font-semibold mb-4">Entity Overview</h3>
        <p><strong>Business Name:</strong> {data.entityOverview?.businessName}</p>
        <p><strong>Registration Number:</strong> {data.entityOverview?.registrationNumber}</p>
        {/* Add more fields as needed */}
      </div>
      
      <div className="summary-section">
        <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
        <p><strong>Primary Contact:</strong> {data.contactDetails?.primaryContactName}</p>
        <p><strong>Email:</strong> {data.contactDetails?.email}</p>
        {/* Add more fields as needed */}
      </div>
      
      {/* Add more sections as needed */}
      
      <div className="mt-8 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center text-green-600">
          <CheckCircle className="mr-2" />
          <span>Your profile is complete and submitted</span>
        </div>
      </div>
    </div>
  )
}