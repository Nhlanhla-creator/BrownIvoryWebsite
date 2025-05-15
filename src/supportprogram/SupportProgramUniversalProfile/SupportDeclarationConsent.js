"use client"
import FileUpload from "./FileUpload"
import styles from "./SupportUniversalProfile.module.css";

export default function DeclarationConsent({ data = {}, updateData }) {
  const handleChange = (e) => {
    const { name, checked } = e.target
    updateData({ [name]: checked })
  }

  const handleFileChange = (name, files) => {
    updateData({ [name]: files })
  }

  return (
    <div>
      <h2 className={`${styles.title} text-2xl font-bold mb-6`}>Declaration & Consent</h2>

      <div className="max-w-3xl mx-auto">
        <div className={`${styles.card} mb-8`}>
          <h3 className={`${styles.subtitle} text-lg font-semibold mb-4`}>Declaration of Accuracy</h3>
          <p className="text-brown-700 mb-4">
            I hereby declare that all information provided in this Universal Profile is true, accurate, and complete to
            the best of my knowledge. I understand that any false or misleading information may result in the rejection
            of my profile or termination of any agreements that may arise from this profile.
          </p>
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="accuracy"
                checked={data.accuracy || false}
                onChange={handleChange}
                className={`${styles.checkbox} h-4 w-4`}
                required
              />
              <span className="ml-2 text-brown-700">
                I confirm that all information provided is accurate and complete
              </span>
            </label>
          </div>
        </div>

        <div className={`${styles.card} mb-8`}>
          <h3 className={`${styles.subtitle} text-lg font-semibold mb-4`}>Consent for Data Processing</h3>
          <p className="text-brown-700 mb-4">
            I consent to the collection, processing, and storage of the personal and business information provided in
            this Universal Profile. I understand that this information will be used for the purposes of business
            verification, matching with relevant opportunities, and providing personalized recommendations and support.
          </p>
          <p className="text-brown-700 mb-4">
            I understand that my information may be shared with third parties for the purposes of verification and
            matching, but only with my explicit consent for each specific instance of sharing.
          </p>
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="dataProcessing"
                checked={data.dataProcessing || false}
                onChange={handleChange}
                className={`${styles.checkbox} h-4 w-4`}
                required
              />
              <span className="ml-2 text-brown-700">
                I consent to the collection and processing of my data as described
              </span>
            </label>
          </div>
        </div>

        <div className={`${styles.card} mb-8`}>
          <h3 className={`${styles.subtitle} text-lg font-semibold mb-4`}>Agreement to Platform Terms & Conditions</h3>
          <p className="text-brown-700 mb-4">
            I confirm that I have read, understood, and agree to the platform's{" "}
            <a href="#" className="text-brown-600 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-brown-600 underline">
              Privacy Policy
            </a>
            . I understand that my use of the platform is subject to these terms and conditions.
          </p>
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="termsConditions"
                checked={data.termsConditions || false}
                onChange={handleChange}
                className={`${styles.checkbox} h-4 w-4`}
                required
              />
              <span className="ml-2 text-brown-700">I agree to the platform's Terms & Conditions</span>
            </label>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className={`${styles.subtitle} text-lg font-semibold mb-4`}>Required Documents</h3>

          
        </div>

        <div className="mt-8 flex justify-between"></div>
      </div>
    </div>
  )
}
