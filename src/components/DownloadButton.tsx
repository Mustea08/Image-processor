import { Button } from "@/components/ui/button";
import { toJpeg } from "html-to-image";
import { Download, Loader2 } from "lucide-react";
import React, { useState } from "react";

interface CanvasSize {
  height: number;
  width: number;
  label: string;
}

const CANVAS_SIZES: CanvasSize[] = [
  { width: 180, height: 220, label: "Small (180×220)" },
  { width: 545, height: 666, label: "Large (545×666)" },
];

interface DownloadButtonProps {
  previewRef: React.RefObject<HTMLDivElement>;
  originalFileName: string;
  disabled?: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  previewRef,
  originalFileName,
  disabled = false,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedSize, setSelectedSize] = useState<CanvasSize>(CANVAS_SIZES[0]);

  const handleDownload = async () => {
    if (!previewRef.current) return;

    setIsDownloading(true);

    try {
      const dataUrl = await toJpeg(previewRef.current, {
        quality: 1,
        pixelRatio: 1,
        canvasHeight: selectedSize.height,
        canvasWidth: selectedSize.width,
      });

      const link = document.createElement("a");
      link.download = `processed-product-${Date.now()}.jpeg`;
      link.href = dataUrl;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating download:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        {CANVAS_SIZES.map((size) => (
          <Button
            key={size.label}
            variant={selectedSize === size ? "default" : "outline"}
            onClick={() => setSelectedSize(size)}
            size="sm"
          >
            {size.label}
          </Button>
        ))}
      </div>
      <Button
        onClick={handleDownload}
        disabled={disabled || isDownloading}
        className="w-full max-w-md mx-auto"
        size="lg"
      >
        {isDownloading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Download...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Download Final Image
          </>
        )}
      </Button>
    </div>
  );
};
