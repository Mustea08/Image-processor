import { removeBackground } from "@imgly/background-removal";

export interface ProcessingResult {
  processedImageUrl: string;
  error?: string;
}

export const processImage = async (file: File): Promise<ProcessingResult> => {
  try {
    // Remove background using @imgly/background-removal
    const blob = await removeBackground(file);

    // Enhance the resolution of the processed image
    const enhancedBlob = await enhanceImageResolution(blob);

    // Convert blob to data URL
    const processedImageUrl = URL.createObjectURL(enhancedBlob);

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

// Add a new function to enhance image resolution
const enhanceImageResolution = async (blob: Blob): Promise<Blob> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set higher resolution (2x original size)
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;

      // Use image smoothing techniques
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Draw the enlarged image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert back to Blob
        canvas.toBlob(
          (blob) => {
            resolve(blob!);
          },
          "image/png",
          1.0
        );
      }
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
