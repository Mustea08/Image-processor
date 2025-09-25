import { forwardRef, useState } from "react";
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
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center mb-4">
        <button //shadow-lg hover:shadow-2xs
          className="flex items-center w-2xs justify-around py-2 px-8 rounded-md border-0.5 border-black  hover:bg-[#fefae0] "
          onClick={() =>
            setShowFeature({
              sugarFree: false,
              newProduct: !showFeature.newProduct,
            })
          }
          style={{
            backgroundColor: showFeature.newProduct ? "#fefae0" : "white",
            borderColor: showFeature.newProduct ? "#fefae0" : "black",
            boxShadow: "0px 0px 2px 0px black",
          }}
        >
          <img
            className="w-6 h-6 mr-2"
            src="../../images/new.png"
            alt="new image"
          />
          <p className="text-sm font-medium text-[#000]">
            {showFeature.newProduct ? "Remove" : "Add"} New Icon
          </p>
        </button>
      </div>
      <Card className="p-3 flex-1">
        <h3 className="font-medium text-gray-700 mb-4 text-center">
          Processed Result
        </h3>
        <div className="w-full aspect-square rounded-lg bg-white border-2 border-gray-200 overflow-hidden flex items-center justify-center">
          <div
            ref={ref}
            className="relative w-full aspect-square bg-white overflow-hidden "
            style={{
              backgroundColor: "#ffffff",
              width: "545px",
              height: "667px",
            }}
          >
            {showFeature.newProduct && (
              <img
                src="../../images/new.png"
                alt="sugar free indicator"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "120px",
                  height: "120px",
                  marginTop: "15px",
                  marginLeft: "15px",
                  transform: "rotate(-25deg)",
                }}
              />
            )}
            <img
              src={processedImageUrl}
              alt={`Processed ${originalFileName}`}
              className="max-w-full max-h-full object-contain"
              style={{
                width: "545px",
                height: "667px",
                transform: "translate(-25%, 25%) rotate(30deg) scale(1.2)",
              }}
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-2">
          Product with white background
        </p>
      </Card>
    </div>
  );
});

TransformedPreview.displayName = "TransformedPreview";
