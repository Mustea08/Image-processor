import { forwardRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface TransformedPreviewProps {
  processedImageUrl: string;
  originalFileName: string;
  // showFeature: { sugarFree: boolean; newProduct: boolean };
}

export const TransformedPreview = forwardRef<
  HTMLDivElement,
  TransformedPreviewProps
>(({ processedImageUrl, originalFileName }, ref) => {
  const [showFeature, setShowFeature] = useState({
    sugarFree: false,
    newProduct: false,
  });
  return (
    <>
      <div className="w-full max-w-md mx-auto">
        {/* display the buttons in a column  */}
        <div className="flex items-center m-4">
          <Button
            className="mr-2"
            onClick={() =>
              setShowFeature({
                sugarFree: false,
                newProduct: !showFeature.newProduct,
              })
            }
          >
            Add new
          </Button>
          <Button
            className=""
            onClick={() =>
              setShowFeature({
                sugarFree: !showFeature.sugarFree,
                newProduct: false,
              })
            }
          >
            Add sugar free indicator
          </Button>
        </div>
        <Card className="p-6 flex-1">
          <h3 className="font-medium text-gray-700 mb-4 text-center">
            Processed Result
          </h3>
          <div
            ref={ref}
            className="relative w-full aspect-square bg-white rounded-lg overflow-hidden border-2 border-gray-200 flex items-center justify-center"
            style={{ backgroundColor: "#ffffff" }}
          >
            {showFeature.sugarFree && (
              <img
                src="../../../public/images/leave.png"
                alt="sugar free indicator"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100px",
                  height: "100px",
                }}
              />
            )}
            {showFeature.newProduct && (
              <img
                src="../../../public/images/new.png"
                alt="sugar free indicator"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100px",
                  height: "100px",
                }}
              />
            )}
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
    </>
  );
});

TransformedPreview.displayName = "TransformedPreview";
