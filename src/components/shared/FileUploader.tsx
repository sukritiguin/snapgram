import React, { useState, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

interface SingleFileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const SingleFileUploader: React.FC<SingleFileUploaderProps> = ({
  onFileSelect,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        setErrorMessage(
          "Unsupported file type. Please upload an image file (jpg, jpeg, png, svg)."
        );
        setSelectedFile(null);
        setPreview(null);
        onFileSelect(null);
        return;
      }

      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
      setErrorMessage(null);

      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    },
    [onFileSelect]
  );

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    onFileSelect(null);
    setErrorMessage(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Allow only a single file
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/svg+xml": [".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed p-6 rounded-lg transition-colors cursor-pointer ${
        isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="mx-auto my-4 max-h-64 object-contain"
          />
          <button
            type="button"
            onClick={handleRemoveFile}
            className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center focus:outline-none"
          >
            &times;
          </button>
        </div>
      ) : (
        <p className="text-center">
          Drag and drop a file here, or click to select a file
        </p>
      )}
      {errorMessage && (
        <p className="text-red-500 text-center mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default SingleFileUploader;
