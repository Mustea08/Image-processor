import { Button } from "@/components/ui/button";
import { validateImageFile } from "@/lib/imageProcessor";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "./ui/card";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClearImage: () => void;
  isProcessing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  selectedImage,
  onClearImage,
  isProcessing,
}) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const validationError = validateImageFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }
        setError(null);
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
    disabled: isProcessing,
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validationError = validateImageFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      onImageSelect(file);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {!selectedImage ? (
        <Card className="p-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? "Drop your image here" : "Upload Product Image"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop an image, or click to select
            </p>
            <Button variant="outline" disabled={isProcessing}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Choose File
            </Button>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-input"
            disabled={isProcessing}
          />
        </Card>
      ) : (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-700">Selected Image</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearImage}
              disabled={isProcessing}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {selectedImage.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </Card>
      )}

      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};
