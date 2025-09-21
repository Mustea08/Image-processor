import { removeBackground } from "@imgly/background-removal";

export interface ProcessingResult {
  processedImageUrl: string;
  error?: string;
}

export const processImage = async (file: File): Promise<ProcessingResult> => {
  try {
    // Remove background using @imgly/background-removal
    const blob = await removeBackground(file);

    // Optionally skip enhancement to avoid upscaling and large files
    // const enhancedBlob = await enhanceImageResolution(blob);
    // Use the original size for smaller output
    const enhancedBlob = blob;

    // Convert blob to webp format with lower quality
    const webpBlob = await convertToWebP(enhancedBlob);

    // Convert blob to data URL
    const processedImageUrl = URL.createObjectURL(webpBlob);

    return { processedImageUrl };
  } catch (error) {
    console.error("Error processing image:", error);
    return {
      processedImageUrl: "",
      error:
        "Failed to process image. Please try again with a different image.",
    };
  }
};

const convertToWebP = async (blob: Blob): Promise<Blob> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (webpBlob) => {
          resolve(webpBlob!);
        },
        "image/webp",
        0.6 // Lower quality for smaller file size
      );
    };
    img.src = URL.createObjectURL(blob);
  });
};

export const validateImageFile = (file: File): string | null => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    return "Please upload a valid image file (JPG, PNG, or WEBP).";
  }

  if (file.size > maxSize) {
    return "Image size must be less than 10MB.";
  }

  return null;
};
