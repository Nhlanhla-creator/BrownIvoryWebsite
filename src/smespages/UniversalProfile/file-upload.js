"use client"

import { useState } from "react"
import { Upload, X, FileText } from "lucide-react"

export default function FileUpload({
  label,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  multiple = false,
  required = false,
  onChange,
  value = [],
}) {
  const [files, setFiles] = useState(value)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || [])
    const newFiles = [...files, ...selectedFiles]
    setFiles(newFiles)
    if (onChange) onChange(newFiles)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    const newFiles = [...files, ...droppedFiles]
    setFiles(newFiles)
    if (onChange) onChange(newFiles)
  }

  const removeFile = (index) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    if (onChange) onChange(newFiles)
  }

  const styles = {
    container: {
      marginBottom: '1rem',
      maxWidth: '500px',
      width: '100%'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#8B4513',
      marginBottom: '0.5rem'
    },
    required: {
      color: '#EF4444'
    },
    dropZone: {
      border: `2px dashed ${isDragging ? '#8B4513' : '#D2B48C'}`,
      borderRadius: '8px',
      padding: '0.75rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: isDragging ? '#F5F5DC' : 'transparent',
      minHeight: '70px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    dropZoneHover: {
      borderColor: '#8B4513'
    },
    hiddenInput: {
      display: 'none'
    },
    uploadIcon: {
      width: '1.5rem',
      height: '1.5rem',
      color: '#A0522D',
      marginBottom: '0.25rem'
    },
    dragText: {
      marginTop: '0.25rem',
      fontSize: '0.75rem',
      color: '#8B4513',
      lineHeight: '1.2'
    },
    formatText: {
      fontSize: '0.625rem',
      color: '#A0522D',
      marginTop: '0.25rem'
    },
    filesContainer: {
      marginTop: '0.75rem'
    },
    filesLabel: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#8B4513',
      marginBottom: '0.5rem'
    },
    filesList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    fileItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#F5F5DC',
      padding: '0.5rem',
      borderRadius: '4px',
      fontSize: '0.75rem'
    },
    fileInfo: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0
    },
    fileIcon: {
      width: '1rem',
      height: '1rem',
      color: '#A0522D',
      marginRight: '0.5rem',
      flexShrink: 0
    },
    fileName: {
      color: '#8B4513',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '8rem'
    },
    removeButton: {
      color: '#A0522D',
      cursor: 'pointer',
      padding: '0.125rem',
      borderRadius: '2px',
      transition: 'color 0.2s ease',
      flexShrink: 0
    },
    removeIcon: {
      width: '1rem',
      height: '1rem'
    }
  }

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        {label} {required && <span style={styles.required}>*</span>}
      </label>

      <div
        style={{
          ...styles.dropZone,
          ...(isDragging ? {} : {}),
          ':hover': styles.dropZoneHover
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`file-upload-${label}`).click()}
        onMouseEnter={(e) => {
          if (!isDragging) {
            e.target.style.borderColor = '#8B4513'
          }
        }}
        onMouseLeave={(e) => {
          if (!isDragging) {
            e.target.style.borderColor = '#D2B48C'
          }
        }}
      >
        <input
          id={`file-upload-${label}`}
          type="file"
          style={styles.hiddenInput}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
        <Upload style={styles.uploadIcon} />
        <p style={styles.dragText}>Drag files or click to select</p>
        <p style={styles.formatText}>{accept.replace(/\./g, "").replace(/,/g, ", ")}</p>
      </div>

      {files.length > 0 && (
        <div style={styles.filesContainer}>
          <p style={styles.filesLabel}>Files ({files.length}):</p>
          <div style={styles.filesList}>
            {files.map((file, index) => (
              <div key={index} style={styles.fileItem}>
                <div style={styles.fileInfo}>
                  <FileText style={styles.fileIcon} />
                  <span style={styles.fileName}>{file.name || `File ${index + 1}`}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  style={styles.removeButton}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8B4513'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#A0522D'
                  }}
                >
                  <X style={styles.removeIcon} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}