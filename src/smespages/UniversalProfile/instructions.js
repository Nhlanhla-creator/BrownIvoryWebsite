export default function Instructions() {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-brown-800 mb-6">Instructions</h2>
  
        <div className="bg-brown-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-brown-700 mb-4">How to complete the form</h3>
          <ul className="list-disc pl-5 space-y-2 text-brown-700">
            <li>Complete all required fields marked with an asterisk (*)</li>
            <li>Navigate through sections using the tracker at the top</li>
            <li>You can save your progress and return later</li>
            <li>Upload all required documents in the specified formats</li>
            <li>Review your information before final submission</li>
            <li>Click on each section in the tracker to view specific instructions</li>
          </ul>
        </div>
  
        <div className="bg-brown-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-brown-700 mb-4">Purpose of data collection</h3>
          <p className="text-brown-700 mb-4">The information collected in this Universal Profile will be used to:</p>
          <ul className="list-disc pl-5 space-y-2 text-brown-700">
            <li>Create your comprehensive business profile</li>
            <li>Match you with relevant opportunities, investors, and partners</li>
            <li>Verify your business legitimacy and compliance status</li>
            <li>Provide personalized recommendations and support</li>
            <li>Generate insights to help improve your business performance</li>
          </ul>
        </div>
  
        <div className="bg-brown-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-brown-700 mb-4">Terms & conditions</h3>
          <p className="text-brown-700 mb-4">
            By completing this profile, you agree to our platform's terms and conditions, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-brown-700">
            <li>Providing accurate and truthful information</li>
            <li>Keeping your profile information up to date</li>
            <li>Allowing us to verify the information provided</li>
            <li>Accepting that incomplete or false information may result in profile rejection</li>
            <li>Understanding that profile approval is subject to verification</li>
          </ul>
          <p className="text-brown-700 mt-4">
            For the complete terms and conditions, please refer to our{" "}
            <a href="#" className="text-brown-600 underline">
              Terms of Service
            </a>
            .
          </p>
        </div>
  
        <div className="bg-brown-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-brown-700 mb-4">Privacy disclaimer</h3>
          <p className="text-brown-700 mb-4">We take your privacy seriously. Here's how we handle your information:</p>
          <ul className="list-disc pl-5 space-y-2 text-brown-700">
            <li>Your data is stored securely and protected with industry-standard measures</li>
            <li>We only share your information with third parties with your explicit consent</li>
            <li>You can request access to, correction of, or deletion of your data at any time</li>
            <li>We retain your information only as long as necessary for the purposes described</li>
            <li>We comply with all applicable data protection regulations</li>
          </ul>
          <p className="text-brown-700 mt-4">
            For more details, please review our{" "}
            <a href="#" className="text-brown-600 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
  
        <div className="mt-8 text-center">
          <p className="text-brown-600 italic">
            Please proceed to the next section to begin completing your Universal Profile.
          </p>
        </div>
      </div>
    )
  }
  