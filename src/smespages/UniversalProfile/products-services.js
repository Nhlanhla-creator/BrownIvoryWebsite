"use client"
import { Plus, Trash2 } from "lucide-react"
import FormField from "./form-field"
import FileUpload from "./file-upload"
import './UniversalProfile.css';

// Options for multi-selectors
const fundTypes = [
  { value: "equity", label: "Equity" },
  { value: "debt", label: "Debt" },
  { value: "grant", label: "Grant" },
  { value: "convertible", label: "Convertible Note" },
  { value: "blended", label: "Blended Finance" },
  { value: "quasi", label: "Quasi-Equity" },
]

const investmentInstruments = [
  { value: "working_capital", label: "Working Capital Loans" },
  { value: "venture_capital", label: "Venture Capital" },
  { value: "invoice", label: "Invoice Discounting" },
  { value: "mezzanine", label: "Mezzanine Finance" },
]

const enterpriseStages = [
  { value: "startup", label: "Startup" },
  { value: "growth", label: "Growth" },
  { value: "maturity", label: "Maturity" },
  { value: "turnaround", label: "Turnaround" },
]

const sectorFocusOptions = [
  { value: "agriculture", label: "Agriculture" },
  { value: "ict", label: "ICT" },
  { value: "green_energy", label: "Green Energy" },
  { value: "mining", label: "Mining" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "services", label: "Services" },
  { value: "tourism", label: "Tourism" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
]

const supportOfferedOptions = [
  { value: "technical", label: "Technical Assistance" },
  { value: "mentorship", label: "Mentorship" },
  { value: "esg", label: "ESG Reporting Help" },
  { value: "networking", label: "Networking" },
  { value: "market_access", label: "Market Access" },
]

const programTypes = [
  { value: "incubator", label: "Incubator" },
  { value: "accelerator", label: "Accelerator" },
  { value: "esd", label: "ESD" },
  { value: "other", label: "Other" },
]

export default function ProductsServices({ data = {}, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleFileChange = (name, files) => {
    updateData({ [name]: files })
  }

  const handleMultiSelect = (name, value) => {
    const currentValues = data[name] || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    updateData({ [name]: newValues })
  }

  const addProductCategory = () => {
    const productCategories = data.productCategories || []
    updateData({ productCategories: [...productCategories, { name: "", products: [] }] })
  }

  const updateProductCategory = (index, field, value) => {
    const productCategories = [...(data.productCategories || [])]
    productCategories[index] = { ...productCategories[index], [field]: value }
    updateData({ productCategories })
  }

  const removeProductCategory = (index) => {
    const productCategories = [...(data.productCategories || [])]
    productCategories.splice(index, 1)
    updateData({ productCategories })
  }

  const addProduct = (categoryIndex) => {
    const productCategories = [...(data.productCategories || [])]
    const products = productCategories[categoryIndex].products || []
    productCategories[categoryIndex].products = [...products, { name: "", description: "" }]
    updateData({ productCategories })
  }

  const updateProduct = (categoryIndex, productIndex, field, value) => {
    const productCategories = [...(data.productCategories || [])]
    productCategories[categoryIndex].products[productIndex] = {
      ...productCategories[categoryIndex].products[productIndex],
      [field]: value,
    }
    updateData({ productCategories })
  }

  const removeProduct = (categoryIndex, productIndex) => {
    const productCategories = [...(data.productCategories || [])]
    productCategories[categoryIndex].products.splice(productIndex, 1)
    updateData({ productCategories })
  }

  const addServiceCategory = () => {
    const serviceCategories = data.serviceCategories || []
    updateData({ serviceCategories: [...serviceCategories, { name: "", services: [] }] })
  }

  const updateServiceCategory = (index, field, value) => {
    const serviceCategories = [...(data.serviceCategories || [])]
    serviceCategories[index] = { ...serviceCategories[index], [field]: value }
    updateData({ serviceCategories })
  }

  const removeServiceCategory = (index) => {
    const serviceCategories = [...(data.serviceCategories || [])]
    serviceCategories.splice(index, 1)
    updateData({ serviceCategories })
  }

  const addService = (categoryIndex) => {
    const serviceCategories = [...(data.serviceCategories || [])]
    const services = serviceCategories[categoryIndex].services || []
    serviceCategories[categoryIndex].services = [...services, { name: "", description: "" }]
    updateData({ serviceCategories })
  }

  const updateService = (categoryIndex, serviceIndex, field, value) => {
    const serviceCategories = [...(data.serviceCategories || [])]
    serviceCategories[categoryIndex].services[serviceIndex] = {
      ...serviceCategories[categoryIndex].services[serviceIndex],
      [field]: value,
    }
    updateData({ serviceCategories })
  }

  const removeService = (categoryIndex, serviceIndex) => {
    const serviceCategories = [...(data.serviceCategories || [])]
    serviceCategories[categoryIndex].services.splice(serviceIndex, 1)
    updateData({ serviceCategories })
  }

  const addClient = () => {
    const keyClients = data.keyClients || []
    updateData({ keyClients: [...keyClients, { name: "", industry: "" }] })
  }

  const updateClient = (index, field, value) => {
    const keyClients = [...(data.keyClients || [])]
    keyClients[index] = { ...keyClients[index], [field]: value }
    updateData({ keyClients })
  }

  const removeClient = (index) => {
    const keyClients = [...(data.keyClients || [])]
    keyClients.splice(index, 1)
    updateData({ keyClients })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-brown-800 mb-6">Products, Services & Offerings</h2>

      <div className="mb-6">
        <FormField label="Entity Type" required>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="entityType"
                value="smse"
                checked={data.entityType === "smse"}
                onChange={handleChange}
                className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300"
              />
              <span className="ml-2 text-sm text-brown-700">SMSE</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="entityType"
                value="investor"
                checked={data.entityType === "investor"}
                onChange={handleChange}
                className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300"
              />
              <span className="ml-2 text-sm text-brown-700">Investor</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="entityType"
                value="support"
                checked={data.entityType === "support"}
                onChange={handleChange}
                className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300"
              />
              <span className="ml-2 text-sm text-brown-700">Support Program</span>
            </label>
          </div>
        </FormField>
      </div>

      {/* SMSE Section */}
      {data.entityType === "smse" && (
        <div className="bg-brown-50 p-6 rounded-lg mb-8">
      

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-brown-700">Product Categories & Products</h4>
              <button
                type="button"
                onClick={addProductCategory}
                className="flex items-center px-3 py-1 bg-brown-100 text-brown-700 rounded-md hover:bg-brown-200"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Category
              </button>
            </div>

            {(data.productCategories || []).map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-4 p-4 bg-white rounded-md border border-brown-200">
                <div className="flex justify-between items-center mb-2">
                  <FormField label="Category Name" required className="flex-1 mr-4 mb-0">
                    <input
                      type="text"
                      value={category.name || ""}
                      onChange={(e) => updateProductCategory(categoryIndex, "name", e.target.value)}
                      className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                      required
                    />
                  </FormField>
                  <button
                    type="button"
                    onClick={() => removeProductCategory(categoryIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="ml-4 mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-sm font-medium text-brown-600">Products</h5>
                    <button
                      type="button"
                      onClick={() => addProduct(categoryIndex)}
                      className="flex items-center px-2 py-1 text-xs bg-brown-100 text-brown-700 rounded-md hover:bg-brown-200"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Product
                    </button>
                  </div>

                  {(category.products || []).map((product, productIndex) => (
                    <div key={productIndex} className="flex items-start mb-2">
                      <div className="flex-1 mr-2">
                        <input
                          type="text"
                          value={product.name || ""}
                          onChange={(e) => updateProduct(categoryIndex, productIndex, "name", e.target.value)}
                          placeholder="Product Name"
                          className="w-full px-3 py-2 text-sm border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                        />
                      </div>
                      <div className="flex-1 mr-2">
                        <input
                          type="text"
                          value={product.description || ""}
                          onChange={(e) => updateProduct(categoryIndex, productIndex, "description", e.target.value)}
                          placeholder="Brief Description"
                          className="w-full px-3 py-2 text-sm border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProduct(categoryIndex, productIndex)}
                        className="text-red-500 hover:text-red-700 mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-brown-700">Service Categories & Services</h4>
              <button
                type="button"
                onClick={addServiceCategory}
                className="flex items-center px-3 py-1 bg-brown-100 text-brown-700 rounded-md hover:bg-brown-200"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Category
              </button>
            </div>

            {(data.serviceCategories || []).map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-4 p-4 bg-white rounded-md border border-brown-200">
                <div className="flex justify-between items-center mb-2">
                  <FormField label="Category Name" required className="flex-1 mr-4 mb-0">
                    <input
                      type="text"
                      value={category.name || ""}
                      onChange={(e) => updateServiceCategory(categoryIndex, "name", e.target.value)}
                      className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                      required
                    />
                  </FormField>
                  <button
                    type="button"
                    onClick={() => removeServiceCategory(categoryIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="ml-4 mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-sm font-medium text-brown-600">Services</h5>
                    <button
                      type="button"
                      onClick={() => addService(categoryIndex)}
                      className="flex items-center px-2 py-1 text-xs bg-brown-100 text-brown-700 rounded-md hover:bg-brown-200"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Service
                    </button>
                  </div>

                  {(category.services || []).map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex items-start mb-2">
                      <div className="flex-1 mr-2">
                        <input
                          type="text"
                          value={service.name || ""}
                          onChange={(e) => updateService(categoryIndex, serviceIndex, "name", e.target.value)}
                          placeholder="Service Name"
                          className="w-full px-3 py-2 text-sm border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                        />
                      </div>
                      <div className="flex-1 mr-2">
                        <input
                          type="text"
                          value={service.description || ""}
                          onChange={(e) => updateService(categoryIndex, serviceIndex, "description", e.target.value)}
                          placeholder="Brief Description"
                          className="w-full px-3 py-2 text-sm border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeService(categoryIndex, serviceIndex)}
                        className="text-red-500 hover:text-red-700 mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-brown-700">Key Clients/Customers (optional)</h4>
              <button
                type="button"
                onClick={addClient}
                className="flex items-center px-3 py-1 bg-brown-100 text-brown-700 rounded-md hover:bg-brown-200"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Client
              </button>
            </div>

            {(data.keyClients || []).map((client, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="flex-1 mr-2">
                  <input
                    type="text"
                    value={client.name || ""}
                    onChange={(e) => updateClient(index, "name", e.target.value)}
                    placeholder="Client Name"
                    className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
                <div className="flex-1 mr-2">
                  <input
                    type="text"
                    value={client.industry || ""}
                    onChange={(e) => updateClient(index, "industry", e.target.value)}
                    placeholder="Industry"
                    className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
                <button type="button" onClick={() => removeClient(index)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-brown-200 pt-4">
            <h4 className="text-md font-medium text-brown-700 mb-4">Required Documents</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                label="Company Profile / Brochure (optional)"
                accept=".pdf,.doc,.docx"
                onChange={(files) => handleFileChange("companyProfile", files)}
                value={data.companyProfile || []}
              />

              <FileUpload
                label="Client References (optional)"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                multiple
                onChange={(files) => handleFileChange("clientReferences", files)}
                value={data.clientReferences || []}
              />
            </div>
          </div>
        </div>
      )}

      {/* Investors Section */}
      {data.entityType === "investor" && (
        <div className="bg-brown-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-brown-700 mb-4">For Investors</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Fund Name(s)" required>
              <input
                type="text"
                name="fundName"
                value={data.fundName || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              />
            </FormField>

            <FormField label="Fund Size" required>
              <input
                type="text"
                name="fundSize"
                value={data.fundSize || ""}
                onChange={handleChange}
                placeholder="e.g., R50M, $10M"
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              />
            </FormField>
          </div>

          <FormField label="Fund Type" required>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {fundTypes.map((type) => (
                <label key={type.value} className="flex items-center p-2 border border-brown-200 rounded-md bg-white">
                  <input
                    type="checkbox"
                    checked={(data.fundTypes || []).includes(type.value)}
                    onChange={() => handleMultiSelect("fundTypes", type.value)}
                    className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                  />
                  <span className="ml-2 text-sm text-brown-700">{type.label}</span>
                </label>
              ))}
            </div>
          </FormField>

          <FormField label="Investment Instruments" required>
            <div className="grid grid-cols-2 gap-2">
              {investmentInstruments.map((instrument) => (
                <label
                  key={instrument.value}
                  className="flex items-center p-2 border border-brown-200 rounded-md bg-white"
                >
                  <input
                    type="checkbox"
                    checked={(data.investmentInstruments || []).includes(instrument.value)}
                    onChange={() => handleMultiSelect("investmentInstruments", instrument.value)}
                    className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                  />
                  <span className="ml-2 text-sm text-brown-700">{instrument.label}</span>
                </label>
              ))}
            </div>
          </FormField>

          <FormField label="Target Enterprise Stage" required>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {enterpriseStages.map((stage) => (
                <label key={stage.value} className="flex items-center p-2 border border-brown-200 rounded-md bg-white">
                  <input
                    type="checkbox"
                    checked={(data.targetStages || []).includes(stage.value)}
                    onChange={() => handleMultiSelect("targetStages", stage.value)}
                    className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                  />
                  <span className="ml-2 text-sm text-brown-700">{stage.label}</span>
                </label>
              ))}
            </div>
          </FormField>

          <FormField label="Sector Focus" required>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sectorFocusOptions.map((sector) => (
                <label key={sector.value} className="flex items-center p-2 border border-brown-200 rounded-md bg-white">
                  <input
                    type="checkbox"
                    checked={(data.sectorFocus || []).includes(sector.value)}
                    onChange={() => handleMultiSelect("sectorFocus", sector.value)}
                    className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                  />
                  <span className="ml-2 text-sm text-brown-700">{sector.label}</span>
                </label>
              ))}
            </div>
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField label="Ticket Size Range" required>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <label className="block text-xs text-brown-600 mb-1">Min</label>
                  <input
                    type="text"
                    name="ticketSizeMin"
                    value={data.ticketSizeMin || ""}
                    onChange={handleChange}
                    placeholder="e.g., R100K"
                    className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-brown-600 mb-1">Max</label>
                  <input
                    type="text"
                    name="ticketSizeMax"
                    value={data.ticketSizeMax || ""}
                    onChange={handleChange}
                    placeholder="e.g., R5M"
                    className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                    required
                  />
                </div>
              </div>
            </FormField>

            <FormField label="Geographic Focus" required>
              <input
                type="text"
                name="geographicFocus"
                value={data.geographicFocus || ""}
                onChange={handleChange}
                placeholder="Provinces, countries, regions"
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField label="Return Expectations (Optional)">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-brown-600 mb-1">ROI %</label>
                  <input
                    type="text"
                    name="roi"
                    value={data.roi || ""}
                    onChange={handleChange}
                    placeholder="e.g., 15-20%"
                    className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-brown-600 mb-1">Exit Year</label>
                  <input
                    type="text"
                    name="exitYear"
                    value={data.exitYear || ""}
                    onChange={handleChange}
                    placeholder="e.g., 5-7 years"
                    className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
              </div>
            </FormField>

            <FormField label="Support Offered Beyond Capital">
              <div className="grid grid-cols-2 gap-2">
                {supportOfferedOptions.map((support) => (
                  <label key={support.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={(data.supportOffered || []).includes(support.value)}
                      onChange={() => handleMultiSelect("supportOffered", support.value)}
                      className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                    />
                    <span className="ml-2 text-sm text-brown-700">{support.label}</span>
                  </label>
                ))}
              </div>
            </FormField>
          </div>

          <div className="mt-6 border-t border-brown-200 pt-4">
            <h4 className="text-md font-medium text-brown-700 mb-4">Required Documents</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                label="Fund Mandate"
                accept=".pdf,.doc,.docx"
                required
                onChange={(files) => handleFileChange("fundMandate", files)}
                value={data.fundMandate || []}
              />

              <FileUpload
                label="Fund Prospectus (optional)"
                accept=".pdf,.doc,.docx"
                onChange={(files) => handleFileChange("fundProspectus", files)}
                value={data.fundProspectus || []}
              />

              <FileUpload
                label="FSP License or relevant registration (if applicable)"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(files) => handleFileChange("fspLicense", files)}
                value={data.fspLicense || []}
              />

              <FileUpload
                label="Case Studies or Portfolio Highlights (optional)"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                multiple
                onChange={(files) => handleFileChange("caseStudies", files)}
                value={data.caseStudies || []}
              />
            </div>
          </div>
        </div>
      )}

      {/* Support Programs Section */}
      {data.entityType === "support" && (
        <div className="bg-brown-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-brown-700 mb-4">For Support Programs</h3>

          <FormField label="Program Type" required>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {programTypes.map((type) => (
                <label key={type.value} className="flex items-center p-2 border border-brown-200 rounded-md bg-white">
                  <input
                    type="checkbox"
                    checked={(data.programTypes || []).includes(type.value)}
                    onChange={() => handleMultiSelect("programTypes", type.value)}
                    className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                  />
                  <span className="ml-2 text-sm text-brown-700">{type.label}</span>
                </label>
              ))}
            </div>
          </FormField>

          <FormField label="Sector Focus" required>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sectorFocusOptions.map((sector) => (
                <label key={sector.value} className="flex items-center p-2 border border-brown-200 rounded-md bg-white">
                  <input
                    type="checkbox"
                    checked={(data.sectorFocus || []).includes(sector.value)}
                    onChange={() => handleMultiSelect("sectorFocus", sector.value)}
                    className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                  />
                  <span className="ml-2 text-sm text-brown-700">{sector.label}</span>
                </label>
              ))}
            </div>
          </FormField>

          <FormField label="Target Enterprise Type" required>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {enterpriseStages.map((stage) => (
                <label key={stage.value} className="flex items-center p-2 border border-brown-200 rounded-md bg-white">
                  <input
                    type="checkbox"
                    checked={(data.targetEnterpriseTypes || []).includes(stage.value)}
                    onChange={() => handleMultiSelect("targetEnterpriseTypes", stage.value)}
                    className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                  />
                  <span className="ml-2 text-sm text-brown-700">{stage.label}</span>
                </label>
              ))}
            </div>
          </FormField>

          <FormField label="Support Offering" required>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {supportOfferedOptions.map((support) => (
                <label
                  key={support.value}
                  className="flex items-center p-2 border border-brown-200 rounded-md bg-white"
                >
                  <input
                    type="checkbox"
                    checked={(data.supportOfferings || []).includes(support.value)}
                    onChange={() => handleMultiSelect("supportOfferings", support.value)}
                    className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
                  />
                  <span className="ml-2 text-sm text-brown-700">{support.label}</span>
                </label>
              ))}
            </div>
          </FormField>

          <div className="mt-6 border-t border-brown-200 pt-4">
            <h4 className="text-md font-medium text-brown-700 mb-4">Required Documents</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                label="Program Overview / Brochure (optional)"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(files) => handleFileChange("programOverview", files)}
                value={data.programOverview || []}
              />

              <FileUpload
                label="Registration or Accreditation Proof"
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onChange={(files) => handleFileChange("registrationProof", files)}
                value={data.registrationProof || []}
              />
            </div>
          </div>
        </div>
      )}

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
