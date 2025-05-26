"use client"
import { Plus, Trash2 } from 'lucide-react'
import FormField from "./form-field"
import FileUpload from "./file-upload"
import './UniversalProfile.css';

// Industry options for Key Clients/Customers
const industryOptions = [
  { value: "accounting_finance", label: "Accounting / Finance" },
  { value: "advertising_marketing_pr", label: "Advertising / Marketing / PR" },
  { value: "agriculture_forestry_fishing", label: "Agriculture / Forestry / Fishing" },
  { value: "automotive_motor_industry", label: "Automotive / Motor Industry" },
  { value: "banking_insurance_investments", label: "Banking / Insurance / Investments" },
  { value: "call_centre_customer_service", label: "Call Centre / Customer Service" },
  { value: "construction_building_civils", label: "Construction / Building / Civils" },
  { value: "consulting_business_services", label: "Consulting / Business Services" },
  { value: "education_training_teaching", label: "Education / Training / Teaching" },
  { value: "engineering", label: "Engineering (Civil, Mechanical, Electrical,)" },
  { value: "government_public_sector", label: "Government / Public Sector" },
  { value: "healthcare_nursing_medical", label: "Healthcare / Nursing / Medical" },
  { value: "hospitality_hotel_catering", label: "Hospitality / Hotel / Catering" },
  { value: "human_resources_recruitment", label: "Human Resources / Recruitment" },
  { value: "ict_information_technology", label: "ICT / Information Technology" },
  { value: "legal_law", label: "Legal / Law" },
  { value: "logistics_transport_supply_chain", label: "Logistics / Transport / Supply Chain" },
  { value: "manufacturing_production", label: "Manufacturing / Production" },
  { value: "media_journalism_publishing", label: "Media / Journalism / Publishing" },
  { value: "mining_energy_oil_gas", label: "Mining / Energy / Oil & Gas" },
  { value: "ngo_nonprofit_community", label: "NGO / Non-Profit / Community Services" },
  { value: "real_estate_property", label: "Real Estate / Property" },
  { value: "retail_wholesale_sales", label: "Retail / Wholesale / Sales" },
  { value: "science_research_development", label: "Science / Research / Development" },
  { value: "security_emergency_services", label: "Security / Emergency Services" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "tourism_travel_leisure", label: "Tourism / Travel / Leisure" },
  { value: "trades_artisans_technical", label: "Trades / Artisans / Technical" },
  { value: "utilities_water_electricity", label: "Utilities / Water / Electricity" },
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
                checked={true}
                onChange={handleChange}
                className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300"
              />
              <span className="ml-2 text-sm text-brown-700">SMSE</span>
            </label>
          </div>
        </FormField>
      </div>

      {/* SMSE Section - Always visible now */}
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
                <select
                  value={client.industry || ""}
                  onChange={(e) => updateClient(index, "industry", e.target.value)}
                  className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                >
                  <option value="">Select Industry</option>
                  {industryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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

      <div className="mt-8 flex justify-end">
     
      </div>
    </div>
  )
}
