import { DownloadButton } from "@/components/DownloadButton";
import { ImageUploader } from "@/components/ImageUploader";
import { TransformedPreview } from "@/components/TransformPreview";
import { Button } from "@/components/ui/button";
import { processImage } from "@/lib/imageProcessor";
import { Loader2, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";

export default function ProductImageProcessor() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFeature, setShowFeature] = useState({
    sugarFree: false,
    newProduct: false,
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleImageSelect = async (file: File) => {
    setSelectedImage(file);
    setError(null);
    setIsProcessing(true);

    try {
      const result = await processImage(file);

      if (result.error) {
        setError(result.error);
        setProcessedImageUrl("");
      } else {
        setProcessedImageUrl(result.processedImageUrl);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setProcessedImageUrl("");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setProcessedImageUrl("");
    setError(null);
    setIsProcessing(false);
  };

  const handleStartOver = () => {
    handleClearImage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Image Processor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your product image and we'll remove the background, apply a
            white backdrop, and transform it with a professional angled layout.
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1: Upload */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium mb-4">
              1
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Upload Your Product Image
            </h2>
            <ImageUploader
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onClearImage={handleClearImage}
              isProcessing={isProcessing}
            />
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-yellow-500 text-white rounded-full text-sm font-medium mb-4">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Processing Your Image
              </h2>
              <p className="text-gray-600">
                Removing background and applying transformations...
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="text-center py-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-red-700">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStartOver}
                  className="mt-2"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Preview */}
          {processedImageUrl && !isProcessing && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-medium mb-4">
                2
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Preview & Download
              </h2>
              <TransformedPreview
                ref={previewRef}
                processedImageUrl={processedImageUrl}
                originalFileName={selectedImage?.name || "product"}
                // showFeature={showFeature}
              />
            </div>
          )}

          {/* Step 3: Download */}
          {processedImageUrl && !isProcessing && (
            <div className="text-center space-y-4">
              <DownloadButton
                previewRef={previewRef}
                originalFileName={selectedImage?.name || "product"}
              />
              <Button
                variant="outline"
                onClick={handleStartOver}
                className="ml-4"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Process Another Image
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>
            Your images are processed locally in your browser for privacy and
            security.
          </p>
        </div>
      </div>
    </div>
  );
}
