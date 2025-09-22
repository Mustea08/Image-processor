import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { Download, Loader2 } from "lucide-react";
import React, { useState } from "react";

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

  const handleDownload = async () => {
    if (!previewRef.current) return;

    setIsDownloading(true);

    try {
      // Generate high-quality PNG from the preview component
      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 1, // Higher resolution
        backgroundColor: "#ffffff",
      });

      // Create download link
      const link = document.createElement("a");
      link.download = `processed-product-${Date.now()}.png`;
      link.href = dataUrl;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating download:", error);
      // You could add toast notification here for error handling
    } finally {
      setIsDownloading(false);
    }
  };

  return (
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
  );
};
