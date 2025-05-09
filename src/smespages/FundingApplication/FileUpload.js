import { useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import "./FundingApplication.css" ;

const FileUpload = ({
  label,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  multiple = false,
  required = false,
  onChange,
  value = [],
}) => {
  const [files, setFiles] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const inputId = `file-upload-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    if (onChange) onChange(newFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = [...files, ...droppedFiles];
    setFiles(newFiles);
    if (onChange) onChange(newFiles);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (onChange) onChange(newFiles);
  };

  return (
    <div className="file-upload">
      <label className="file-upload-label">
        {label} {required && <span className="required">*</span>}
      </label>

      <div
        className={`file-upload-area ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(inputId).click()}
      >
        <input
          id={inputId}
          type="file"
          style={{ display: "none" }}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
        <Upload className="file-upload-icon" />
        <p className="file-upload-text">Drag and drop files here, or click to select files</p>
        <p className="file-upload-formats">Accepted formats: {accept.replace(/\./g, "").replace(/,/g, ", ")}</p>
      </div>

      {files.length > 0 && (
        <div className="file-upload-list">
          <p className="file-upload-list-title">Uploaded files:</p>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="file-upload-item">
                <div className="file-upload-item-name">
                  <FileText className="file-upload-item-icon" />
                  <span className="file-upload-item-text">{file.name || `File ${index + 1}`}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="file-upload-item-remove"
                >
                  <X className="file-upload-item-remove-icon" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;