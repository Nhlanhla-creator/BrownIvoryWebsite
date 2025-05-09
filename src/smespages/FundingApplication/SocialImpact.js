import FormField from "./FormField";
import FileUpload from "./FileUpload";
import "./FundingApplication.css" ;

export const renderSocialImpact = (data, updateFormData) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData("socialImpact", { [name]: value });
  };

  const handleFileChange = (name, files) => {
    updateFormData("socialImpact", { [name]: files });
  };

  return (
    <>
      <h2>Social Impact & Alignment</h2>

      <div className="grid-container">
        <div>
          <FormField label="Jobs to be Created (Next 12 months)" required>
            <input
              type="number"
              name="jobsToCreate"
              value={data.jobsToCreate || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="Number of jobs"
              required
            />
          </FormField>

          <FormField label="Youth Ownership %" required>
            <input
              type="number"
              name="youthOwnership"
              value={data.youthOwnership || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="%"
              min="0"
              max="100"
              required
            />
          </FormField>
        </div>

        <div>
          <FormField label="Women Ownership %" required>
            <input
              type="number"
              name="womenOwnership"
              value={data.womenOwnership || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="%"
              min="0"
              max="100"
              required
            />
          </FormField>

          <FormField label="Black Ownership %" required>
            <input
              type="number"
              name="blackOwnership"
              value={data.blackOwnership || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="%"
              min="0"
              max="100"
              required
            />
          </FormField>
        </div>
      </div>

      <div className="form-field">
        <FormField label="Environmental or Community Impact (if applicable)">
          <textarea
            name="environmentalImpact"
            value={data.environmentalImpact || ""}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Describe any environmental or community impact your project will have"
            rows={3}
          ></textarea>
        </FormField>
      </div>

      <div className="form-field">
        <FormField label="Alignment with SDGs or ESD priorities">
          <textarea
            name="sdgAlignment"
            value={data.sdgAlignment || ""}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Describe how your project aligns with Sustainable Development Goals or ESD priorities"
            rows={3}
          ></textarea>
        </FormField>
      </div>

      <div className="section-divider">
        <h3>Required Documents</h3>

        <FileUpload
          label="Optional Impact Statement (free-text or upload)"
          accept=".pdf,.doc,.docx"
          onChange={(files) => handleFileChange("impactStatement", files)}
          value={data.impactStatement || []}
        />
      </div>
    </>
  );
};