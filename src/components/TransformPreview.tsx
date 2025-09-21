import { forwardRef } from "react";
import { Card } from "./ui/card";

interface TransformedPreviewProps {
  processedImageUrl: string;
  originalFileName: string;
}

export const TransformedPreview = forwardRef<
  HTMLDivElement,
  TransformedPreviewProps
>(({ processedImageUrl, originalFileName }, ref) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6">
        <h3 className="font-medium text-gray-700 mb-4 text-center">
          Processed Result
        </h3>
        <div
          ref={ref}
          className="relative w-full aspect-square bg-white rounded-lg overflow-hidden border-2 border-gray-200 flex items-center justify-center"
          style={{ backgroundColor: "#ffffff" }}
        >
          <img
            src={processedImageUrl}
            alt={`Processed ${originalFileName}`}
            className="max-w-full max-h-full object-contain"
            style={{
              width: "545px",
              height: "447px",
              transform: "translate(-30%, 20%) rotate(30deg) scale(1.2)",
            }}
          />
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Product with white background
        </p>
      </Card>
    </div>
  );
});

TransformedPreview.displayName = "TransformedPreview";
