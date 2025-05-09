import FormField from "./form-field"
import FileUpload from "./file-upload"
import './UniversalProfile.css';
import { useEffect, useState } from 'react';
import { db, auth, storage } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ProfileView from "./LindelaniTestView"; // Adjust the import based on your file structure
const entityTypes = [
  { value: "ptyLtd", label: "Pty Ltd" },
  { value: "cc", label: "CC" },
  { value: "ngo", label: "NGO" },
  { value: "coop", label: "Co-op" },
  { value: "sole", label: "Sole Proprietor" },
  { value: "other", label: "Other" },
]

const entitySizes = [
  { value: "micro", label: "Micro (< R1M annual turnover)" },
  { value: "small", label: "Small (R1M - R10M annual turnover)" },
  { value: "medium", label: "Medium (R10M - R50M annual turnover)" },
  { value: "large", label: "Large (> R50M annual turnover)" },
]

const operationStages = [
  { value: "ideation", label: "Ideation" },
  { value: "startup", label: "Startup" },
  { value: "growth", label: "Growth" },
  { value: "mature", label: "Mature" },
  { value: "turnaround", label: "Turnaround" },
]

const economicSectors = [
  { value: "agriculture", label: "Agriculture" },
  { value: "mining", label: "Mining" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "energy", label: "Energy" },
  { value: "construction", label: "Construction" },
  { value: "retail", label: "Retail & Wholesale" },
  { value: "transport", label: "Transport & Logistics" },
  { value: "finance", label: "Finance & Insurance" },
  { value: "realestate", label: "Real Estate" },
  { value: "ict", label: "ICT" },
  { value: "tourism", label: "Tourism & Hospitality" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health & Social Services" },
  { value: "arts", label: "Arts & Entertainment" },
  { value: "other", label: "Other Services" },
]

const africanCountries = [
  { value: "algeria", label: "Algeria" },
  { value: "angola", label: "Angola" },
  { value: "benin", label: "Benin" },
  { value: "botswana", label: "Botswana" },
  { value: "burkina_faso", label: "Burkina Faso" },
  { value: "burundi", label: "Burundi" },
  { value: "cabo_verde", label: "Cabo Verde" },
  { value: "cameroon", label: "Cameroon" },
  { value: "central_african_republic", label: "Central African Republic" },
  { value: "chad", label: "Chad" },
  { value: "comoros", label: "Comoros" },
  { value: "congo", label: "Congo" },
  { value: "cote_d_ivoire", label: "Côte d'Ivoire" },
  { value: "djibouti", label: "Djibouti" },
  { value: "drc", label: "DR Congo" },
  { value: "egypt", label: "Egypt" },
  { value: "equatorial_guinea", label: "Equatorial Guinea" },
  { value: "eritrea", label: "Eritrea" },
  { value: "eswatini", label: "Eswatini" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "gabon", label: "Gabon" },
  { value: "gambia", label: "Gambia" },
  { value: "ghana", label: "Ghana" },
  { value: "guinea", label: "Guinea" },
  { value: "guinea_bissau", label: "Guinea-Bissau" },
  { value: "kenya", label: "Kenya" },
  { value: "lesotho", label: "Lesotho" },
  { value: "liberia", label: "Liberia" },
  { value: "libya", label: "Libya" },
  { value: "madagascar", label: "Madagascar" },
  { value: "malawi", label: "Malawi" },
  { value: "mali", label: "Mali" },
  { value: "mauritania", label: "Mauritania" },
  { value: "mauritius", label: "Mauritius" },
  { value: "morocco", label: "Morocco" },
  { value: "mozambique", label: "Mozambique" },
  { value: "namibia", label: "Namibia" },
  { value: "niger", label: "Niger" },
  { value: "nigeria", label: "Nigeria" },
  { value: "rwanda", label: "Rwanda" },
  { value: "sao_tome_and_principe", label: "São Tomé and Príncipe" },
  { value: "senegal", label: "Senegal" },
  { value: "seychelles", label: "Seychelles" },
  { value: "sierra_leone", label: "Sierra Leone" },
  { value: "somalia", label: "Somalia" },
  { value: "south_africa", label: "South Africa" },
  { value: "south_sudan", label: "South Sudan" },
  { value: "sudan", label: "Sudan" },
  { value: "tanzania", label: "Tanzania" },
  { value: "togo", label: "Togo" },
  { value: "tunisia", label: "Tunisia" },
  { value: "uganda", label: "Uganda" },
  { value: "zambia", label: "Zambia" },
  { value: "zimbabwe", label: "Zimbabwe" },
]

export default function EntityOverview({ data = {}, updateData, onSave }) {
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    updateData(updatedData);
  };

  const handleFileChange = (name, files) => {
    const updatedData = { ...formData, [name]: files };
    setFormData(updatedData);
    updateData(updatedData);
  };

  const saveEntityOverview = async () => {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }

    setIsSaving(true);
    try {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, `smes/${userId}/universalProfile/entityOverview`);

      const { companyLogo, registrationCertificate, proofOfAddress, ...firestoreData } = formData;

      await setDoc(docRef, firestoreData, { merge: true });

      const uploadPromises = [];

      if (companyLogo && companyLogo.length > 0) {
        const logoRef = ref(storage, `smes/${userId}/universalProfile/entityOverview/companyLogo/${companyLogo[0].name}`);
        uploadPromises.push(
          uploadBytes(logoRef, companyLogo[0]).then(() =>
            getDownloadURL(logoRef).then(url => ({
              field: 'companyLogoUrl',
              url
            }))
          )
        );
      }

      if (registrationCertificate && registrationCertificate.length > 0) {
        const certRef = ref(storage, `smes/${userId}/universalProfile/entityOverview/registrationCertificate/${registrationCertificate[0].name}`);
        uploadPromises.push(
          uploadBytes(certRef, registrationCertificate[0]).then(() =>
            getDownloadURL(certRef).then(url => ({
              field: 'registrationCertificateUrl',
              url
            }))
          )
        );
      }

      if (proofOfAddress && proofOfAddress.length > 0) {
        const addressRef = ref(storage, `smes/${userId}/universalProfile/entityOverview/proofOfAddress/${proofOfAddress[0].name}`);
        uploadPromises.push(
          uploadBytes(addressRef, proofOfAddress[0]).then(() =>
            getDownloadURL(addressRef).then(url => ({
              field: 'proofOfAddressUrl',
              url
            }))
          )
        );
      }

      const uploadResults = await Promise.all(uploadPromises);

      const urlUpdates = {};
      uploadResults.forEach(result => {
        urlUpdates[result.field] = result.url;
      });

      if (Object.keys(urlUpdates).length > 0) {
        await setDoc(docRef, urlUpdates, { merge: true });
      }

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const savedData = docSnap.data();
        setFormData(savedData);
        updateData(savedData);
      }

      return { success: true };
    } catch (error) {
      console.error("Error saving entity overview:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const loadEntityOverview = async (userId) => {
    try {
      const docRef = doc(db, `smes/${userId}/universalProfile/entityOverview`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData(data);
        updateData(data);
        return data;
      }
      return null;
    } catch (error) {
      console.error("Error loading entity overview:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (auth.currentUser) {
        await loadEntityOverview(auth.currentUser.uid);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (onSave) {
      onSave.current = saveEntityOverview;
    }
  }, [formData, onSave]);


  return (
    <div>
      <h2 className="text-2xl font-bold text-brown-800 mb-6">Entity Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormField label="Registered Name" required>
            <input
              type="text"
              name="registeredName"
              value={formData.registeredName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Trading Name (if different)">
            <input
              type="text"
              name="tradingName"
              value={formData.tradingName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>

          <FormField label="Registration Number" required>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Entity Type" required>
            <select
              name="entityType"
              value={formData.entityType || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            >
              <option value="">Select Entity Type</option>
              {entityTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Entity Size" required>
            <select
              name="entitySize"
              value={formData.entitySize || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            >
              <option value="">Select Entity Size</option>
              {entitySizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Financial Year End" required>
            <input
              type="month"
              name="financialYearEnd"
              value={formData.financialYearEnd || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="No. of Employees" required>
            <input
              type="number"
              name="employeeCount"
              value={formData.employeeCount || ""}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Years in Operation" required>
            <input
              type="number"
              name="yearsInOperation"
              value={formData.yearsInOperation || ""}
              onChange={handleChange}
              min="0"
              step="0.5"
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>
        </div>

        <div>
          <FormField label="Operation Stage" required>
            <select
              name="operationStage"
              value={formData.operationStage || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            >
              <option value="">Select Operation Stage</option>
              {operationStages.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Economic Sector" required>
            <select
              name="economicSector"
              value={formData.economicSector || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            >
              <option value="">Select Economic Sector</option>
              {economicSectors.map((sector) => (
                <option key={sector.value} value={sector.value}>
                  {sector.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Target Market">
            <input
              type="text"
              name="targetMarket"
              value={formData.targetMarket || ""}
              onChange={handleChange}
              placeholder="Describe your primary customers or market"
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>

          <FormField label="Location" required>
            <select
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            >
              <option value="">Select Country</option>
              {africanCountries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Brief Business Description" required>
            <textarea
              name="businessDescription"
              value={formData.businessDescription || ""}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            ></textarea>
          </FormField>

          <FormField label="Company Logo" tooltip="Recommended size: 300x300px, Max size: 2MB">
            <FileUpload
              label=""
              accept=".jpg,.jpeg,.png,.svg"
              onChange={(files) => handleFileChange("companyLogo", files)}
              value={formData.companyLogo || []}
            />
          </FormField>
        </div>
      </div>

      <div className="mt-8 border-t border-brown-200 pt-6">
        <h3 className="text-lg font-semibold text-brown-700 mb-4">Required Documents</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Company Registration Certificate"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            onChange={(files) => handleFileChange("registrationCertificate", files)}
            value={formData.registrationCertificate || []}
          />

          <FileUpload
            label="Proof of Operating Address"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            onChange={(files) => handleFileChange("proofOfAddress", files)}
            value={formData.proofOfAddress || []}
          />
        </div>
       <ProfileView/>
      </div>

      <div className="mt-8 flex justify-end">

      </div>
    </div>
  )
}
