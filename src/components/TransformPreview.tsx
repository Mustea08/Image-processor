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

  // State for interactive controls
  const [imgWidth, setImgWidth] = useState<number>(700);
  const [imgHeight, setImgHeight] = useState<number>(1440);
  const [rotation, setRotation] = useState<number>(40);
  const [translateX, setTranslateX] = useState<number>(-120);
  const [translateY, setTranslateY] = useState<number>(-300);

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  const adjust = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    delta: number,
    min: number,
    max: number
  ) => setter((prev) => clamp(prev + delta, min, max));

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Main flex container: controls on left, preview on right */}
      <div className="flex flex-row gap-6 items-start">
        {/* Controls for width, height, rotation, translate X/Y */}
        <div className="flex-shrink-0 w-80 space-y-4 mt-14">
          {/* Width Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Width</label>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 text-sm border rounded"
                  onClick={() => adjust(setImgWidth, -10, 50, 2000)}
                  aria-label="Decrease width"
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-20 text-sm border rounded px-2 py-1"
                  value={imgWidth}
                  onChange={(e) =>
                    setImgWidth(
                      clamp(parseInt(e.target.value || "0", 10) || 0, 50, 2000)
                    )
                  }
                  min={50}
                  max={2000}
                />
                <span className="text-xs text-gray-500">px</span>
                <button
                  className="px-2 py-1 text-sm border rounded"
                  onClick={() => adjust(setImgWidth, 10, 50, 2000)}
                  aria-label="Increase width"
                >
                  +
                </button>
              </div>
            </div>
            <input
              type="range"
              className="w-full"
              min={50}
              max={2000}
              step={1}
              value={imgWidth}
              onChange={(e) => setImgWidth(e.target.valueAsNumber)}
            />
          </div>

          {/* Height Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Height
              </label>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 text-sm border rounded"
                  onClick={() => adjust(setImgHeight, -10, 50, 2000)}
                  aria-label="Decrease height"
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-20 text-sm border rounded px-2 py-1"
                  value={imgHeight}
                  onChange={(e) =>
                    setImgHeight(
                      clamp(parseInt(e.target.value || "0", 10) || 0, 50, 2000)
                    )
                  }
                  min={50}
                  max={2000}
                />
                <span className="text-xs text-gray-500">px</span>
                <button
                  className="px-2 py-1 text-sm border rounded"
                  onClick={() => adjust(setImgHeight, 10, 50, 2000)}
                  aria-label="Increase height"
                >
                  +
                </button>
              </div>
            </div>
            <input
              type="range"
              className="w-full"
              min={50}
              max={2000}
              step={1}
              value={imgHeight}
              onChange={(e) => setImgHeight(e.target.valueAsNumber)}
            />
          </div>

          {/* Rotation Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Rotation
              </label>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 text-sm border rounded"
                  onClick={() => adjust(setRotation, -5, -180, 180)}
                  aria-label="Rotate counter-clockwise"
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-20 text-sm border rounded px-2 py-1"
                  value={rotation}
                  onChange={(e) =>
                    setRotation(
                      clamp(parseInt(e.target.value || "0", 10) || 0, -180, 180)
                    )
                  }
                  min={-180}
                  max={180}
                />
                <span className="text-xs text-gray-500">deg</span>
                <button
                  className="px-2 py-1 text-sm border rounded"
                  onClick={() => adjust(setRotation, 5, -180, 180)}
                  aria-label="Rotate clockwise"
                >
                  +
                </button>
              </div>
            </div>
            <input
              type="range"
              className="w-full"
              min={-180}
              max={180}
              step={1}
              value={rotation}
              onChange={(e) => setRotation(e.target.valueAsNumber)}
            />
          </div>
          {/* Translate X Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Translate X
              </label>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 text-sm border rounded"
                  onClick={() => adjust(setTranslateX, -5, -1000, 1000)}
                  aria-label="Move left"
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-24 text-sm border rounded px-2 py-1"
                  value={translateX}
                  onChange={(e) =>
                    setTranslateX(
                      clamp(
                        parseInt(e.target.value || "0", 10) || 0,
                        -1000,
                        1000
                      )
                    )
                  }
                  min={-1000}
                  max={1000}
                />
                <span className="text-xs text-gray-500">px</span>
                <button
                  className="px-2 py-1 text-sm border rounded"
                  onClick={() => adjust(setTranslateX, 5, -1000, 1000)}
                  aria-label="Move right"
                >
                  +
                </button>
              </div>
            </div>
            <input
              type="range"
              className="w-full"
              min={-1000}
              max={1000}
              step={1}
              value={translateX}
              onChange={(e) => setTranslateX(e.target.valueAsNumber)}
            />
          </div>

          {/* Translate Y Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Translate Y
              </label>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 text-sm border rounded"
                  onClick={() => adjust(setTranslateY, -5, -1000, 1000)}
                  aria-label="Move up"
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-24 text-sm border rounded px-2 py-1"
                  value={translateY}
                  onChange={(e) =>
                    setTranslateY(
                      clamp(
                        parseInt(e.target.value || "0", 10) || 0,
                        -1000,
                        1000
                      )
                    )
                  }
                  min={-1000}
                  max={1000}
                />
                <span className="text-xs text-gray-500">px</span>
                <button
                  className="px-2 py-1 text-sm border rounded"
                  onClick={() => adjust(setTranslateY, 5, -1000, 1000)}
                  aria-label="Move down"
                >
                  +
                </button>
              </div>
            </div>
            <input
              type="range"
              className="w-full"
              min={-1000}
              max={1000}
              step={1}
              value={translateY}
              onChange={(e) => setTranslateY(e.target.valueAsNumber)}
            />
          </div>
        </div>

        {/* Card image */}
        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <button
              className="flex items-center w-2xs justify-around py-2 px-8 rounded-md border-0.5 border-black hover:bg-[#fefae0]"
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
                className="relative w-full aspect-square bg-white overflow-hidden"
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
                  className="max-w-none max-h-none object-contain"
                  style={{
                    width: `${imgWidth}px`,
                    height: `${imgHeight}px`,
                    transform: `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`,
                  }}
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-2">
              Product with white background
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
});

TransformedPreview.displayName = "TransformedPreview";
